import "../default-config"
import {account} from "@onflow/sdk-account"
import {config} from "@onflow/config"
import {spawn, send, INIT, SUBSCRIBE, UNSUBSCRIBE} from "@onflow/util-actor"
import {sansPrefix} from "@onflow/util-address"
import {account as fetchAccount} from "@onflow/sdk-account"
import {renderAuthnFrame} from "./render-authn-frame"
import {buildUser} from "./build-user"
import {fetchServices} from "./fetch-services"
import {mergeServices} from "./merge-services"
import {serviceOfType} from "./service-of-type"
import {validateCompositeSignature} from "./validate-composite-signature"
import {execService} from "./exec-service"

const NAME = "CURRENT_USER"
const UPDATED = "CURRENT_USER/UPDATED"
const SNAPSHOT = "SNAPSHOT"
const SET_CURRENT_USER = "SET_CURRENT_USER"
const DEL_CURRENT_USER = "DEL_CURRENT_USER"

// Backwards Compatibility
const CANCEL_EVENT = "FCL::CANCEL"
const CHALLENGE_RESPONSE_EVENT = "FCL::CHALLENGE::RESPONSE"
const CHALLENGE_CANCEL_EVENT = "FCL::CHALLENGE::CANCEL"

const DATA = `{
  "f_type": "User",
  "f_vsn": "1.0.0",
  "addr":null,
  "cid":null,
  "loggedIn":null,
  "expiresAt":null,
  "services":[]
}`

// 支持 sessionStorage 存储
const coldStorage = {
  get: async () => {
    const fallback = JSON.parse(DATA)
    const stored = JSON.parse(sessionStorage.getItem(NAME))
    if (stored != null && fallback["f_vsn"] !== stored["f_vsn"]) {
      sessionStorage.removeItem(NAME)
      return fallback
    }
    return stored || fallback
  },
  put: async data => {
    sessionStorage.setItem(NAME, JSON.stringify(data))
    return data
  },
}
// 获取是否支持硬件钱包的配置，默认 true
const canColdStorage = () => {
  return config().get("persistSession", true)
}
// 操作接口
const HANDLERS = {
  [INIT]: async ctx => {
    ctx.merge(JSON.parse(DATA)) // 初始化用户信息数据结构
    if (await canColdStorage()) { // 如果支持 sessionStorage，则加载信息
      const user = await coldStorage.get()
      if (notExpired(user)) ctx.merge(user)
    }
  },
  [SUBSCRIBE]: (ctx, letter) => {
    ctx.subscribe(letter.from)
    ctx.send(letter.from, UPDATED, {...ctx.all()})
  },
  [UNSUBSCRIBE]: (ctx, letter) => {
    ctx.unsubscribe(letter.from)
  },
  [SNAPSHOT]: async (ctx, letter) => {
    letter.reply({...ctx.all()})
  },
  [SET_CURRENT_USER]: async (ctx, letter, data) => {
    ctx.merge(data)
    if (await canColdStorage()) coldStorage.put(ctx.all())
    ctx.broadcast(UPDATED, {...ctx.all()})
  },
  [DEL_CURRENT_USER]: async (ctx, letter) => {
    ctx.merge(JSON.parse(DATA))
    if (await canColdStorage()) coldStorage.put(ctx.all())
    ctx.broadcast(UPDATED, {...ctx.all()})
  },
}

const identity = v => v
const spawnCurrentUser = () => spawn(HANDLERS, NAME)

function notExpired(user) {
  return (
    user.expiresAt == null ||
    user.expiresAt === 0 ||
    user.expiresAt > Date.now()
  )
}

async function authenticate() {
  return new Promise(async resolve => {
    spawnCurrentUser()
    // 获取当前用户的快照信息
    const user = await snapshot()
    // 如果用户有登录的信息则直接返回
    if (user.loggedIn && notExpired(user)) return resolve(user)
    // 通过 iframe 的方式呼出授权界面
    const [$frame, unrender] = renderAuthnFrame({
      handshake: await config().get("challenge.handshake"), // 在 fcl 配置中配置的第三方授权服务地址，localhost 是依赖 dev-wallet 测试网依赖 blocto
      l6n: window.location.origin,  // 当前页面的 url
    })

    // 定义响应函数
    const replyFn = async ({data}) => {
      if (data.type === CHALLENGE_CANCEL_EVENT || data.type === CANCEL_EVENT) { // 取消授权，关闭窗口，取消事件监听
        unrender()
        window.removeEventListener("message", replyFn)
        return
      }
      if (data.type !== CHALLENGE_RESPONSE_EVENT) return // 非登录响应的数据都返回
      // 正常的数据响应流程
      unrender()
      window.removeEventListener("message", replyFn)

      send(NAME, SET_CURRENT_USER, await buildUser(data)) // 根据返回的数据初始化用户信息，并设置给 ctx
      resolve(await snapshot()) // 返回用户信息
    }

    window.addEventListener("message", replyFn) // 添加消息的响应函数
  })
}

function unauthenticate() {
  spawnCurrentUser()
  send(NAME, DEL_CURRENT_USER)
}

const mmmh = authz => ({
  f_type: "PreAuthzResponse",
  f_vsn: "1.0.0",
  proposer: (authz || {}).proposer,
  payer: (authz || {}).payer || [],
  authorization: (authz || {}).authorization || [],
})

function rawr(authz) {
  console.log("rawr(authz)[A]", {authz})
  const resp = mmmh(authz)
  const axs = []

  if (resp.proposer != null) axs.push(["PROPOSER", resp.proposer])
  for (let az of resp.payer || []) axs.push(["PAYER", az])
  for (let az of resp.authorization || []) axs.push(["AUTHORIZER", az])

  console.log("rawr(authz)[B]", {authz, axs, resp})

  var result = axs.map(([role, az]) => ({
    tempId: [az.identity.address, az.identity.keyId].join("|"),
    addr: az.identity.address,
    keyId: az.identity.keyId,
    signingFunction(signable) {
      return execService(az, signable)
    },
    role: {
      proposer: role === "PROPOSER",
      payer: role === "PAYER",
      authorizer: role === "AUTHORIZER",
    },
  }))
  console.log("rawr(authz)[x]", {authz, result})
  return result
}

// 签名函数
async function authorization(account) {
  spawnCurrentUser()
  const user = await authenticate() // 获得当前登录用户信息
  const authz = serviceOfType(user.services, "authz") // 遍历匹配 authz 签名相关信息

  const preAuthz = serviceOfType(user.services, "pre-authz") // 适配预签名
  if (preAuthz) {
    return {
      ...account,
      tempId: "CURRENT_USER",
      async resolve(account, preSignable) {
        return rawr(await execService(preAuthz, preSignable))
      },
    }
  }
  // 返回用户信息和签名授权函数
  return {
    ...account,
    tempId: "CURRENT_USER",
    resolve: null,
    addr: sansPrefix(authz.identity.address),
    keyId: authz.identity.keyId,
    sequenceNum: null,
    signature: null,
    async signingFunction(signable) { // 签名授权函数 signable 为交易体
      return execService(authz, signable) // 返回签名后的数据
    },
  }
}

function subscribe(callback) {
  spawnCurrentUser()  // 初始化
  const EXIT = "@EXIT" // 定义退出条件
  const self = spawn(async ctx => {  // 初始化一个新的上下文
    ctx.send(NAME, SUBSCRIBE) // 发送订阅消息
    while (1) { // 定义监听循环
      const letter = await ctx.receive()
      if (letter.tag === EXIT) {
        ctx.send(NAME, UNSUBSCRIBE)
        return
      }
      callback(letter.data)
    }
  })
  return () => send(self, EXIT) // 结束监听，
}

function snapshot() {
  spawnCurrentUser() // 初始化上下文
  return send(NAME, SNAPSHOT, null, {expectReply: true, timeout: 0})
}

async function info() {
  spawnCurrentUser()
  const {addr} = await snapshot()
  if (addr == null) throw new Error("No Flow Address for Current User")
  return account(addr)
}

export const currentUser = () => {
  return {
    authenticate,  // 授权，登录函数
    unauthenticate, // 取消授权
    authorization,  // 用户交易签名认证
    subscribe,  // 事件监听
    snapshot,  // 账户信息快照
  }
}
