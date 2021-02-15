import {mailbox as createMailbox} from "./mailbox"
import queueMicrotask from "queue-microtask"

export const INIT = "INIT"
export const SUBSCRIBE = "SUBSCRIBE"
export const UNSUBSCRIBE = "UNSUBSCRIBE"
export const UPDATED = "UPDATED"
export const SNAPSHOT = "SNAPSHOT"
export const EXIT = "EXIT"
export const TERMINATE = "TERMINATE"

const root =
  (typeof self === "object" && self.self === self && self) ||
  (typeof global === "object" && global.global === global && global) ||
  (typeof window === "object" && window.window === window && window)

// 全局对象
root.FCL_REGISTRY = root.FCL_REGISTRY == null ? {} : root.FCL_REGISTRY
var pid = 0b0

const DEFAULT_TIMEOUT = 5000
const DEFAULT_TAG = "---"
// 发送消息
export const send = (addr, tag, data, opts = {}) =>
  new Promise((reply, reject) => {
    const expectReply = opts.expectReply || false
    const timeout = opts.timeout != null ? opts.timeout : DEFAULT_TIMEOUT

    if (expectReply && timeout) {
      setTimeout(
        () =>
          reject(new Error(`Timeout: ${timeout}ms passed without a response.`)),
        timeout
      )
    }

    const payload = {
      to: addr,
      from: opts.from,
      tag,
      data,
      timeout,
      reply,
      reject,
    }

    try {
      root.FCL_REGISTRY[addr].mailbox.deliver(payload)
      if (!expectReply) reply(true)
    } catch (error) {
      console.error("FCL.Actor -- Could Not Deliver Message", payload, error)
    }
  })

export const kill = addr => {
  delete root.FCL_REGISTRY[addr]
}
// 将定义的处理函数进行封装，并注册监听
const fromHandlers = (handlers = {}) => async ctx => {
  if (typeof handlers[INIT] === "function") await handlers[INIT](ctx)
  __loop: while (1) {
    const letter = await ctx.receive() // 接收订阅的 send 消息
    try {
      if (letter.tag === EXIT) {
        // 退出处理函数
        if (typeof handlers[TERMINATE] === "function") {
          await handlers[TERMINATE](ctx, letter, letter.data || {})
        }
        break __loop
      }
      await handlers[letter.tag](ctx, letter, letter.data || {}) // 根据接受的消息做不同的函数处理
    } catch (error) {
      console.error(`${ctx.self()} Error`, letter, error)
    } finally {
      continue __loop
    }
  }
}

// 构造用户信息与响应上下文
export const spawn = (fn, addr = null) => {
  if (addr == null) addr = ++pid
  // 判断是否已经有全局的对象
  if (root.FCL_REGISTRY[addr] != null) return addr
  // 定义全局对象，设置所需要的变量
  root.FCL_REGISTRY[addr] = {
    addr, // 服务标志
    mailbox: createMailbox(), // 通信组件
    subs: new Set(), // 订阅对象
    kvs: {}, // 用户数据
  }
  // 定义上下文
  const ctx = {
    self: () => addr,
    receive: () => root.FCL_REGISTRY[addr].mailbox.receive(),
    send: (to, tag, data, opts = {}) => {
      opts.from = addr
      return send(to, tag, data, opts)
    },
    sendSelf: (tag, data, opts) => {
      if (root.FCL_REGISTRY[addr]) send(addr, tag, data, opts)
    },
    broadcast: (tag, data, opts = {}) => {
      opts.from = addr
      for (let to of root.FCL_REGISTRY[addr].subs) send(to, tag, data, opts)
    },
    subscribe: sub => sub != null && root.FCL_REGISTRY[addr].subs.add(sub),
    unsubscribe: sub => sub != null && root.FCL_REGISTRY[addr].subs.delete(sub),
    subscriberCount: () => root.FCL_REGISTRY[addr].subs.size,
    hasSubs: () => !!root.FCL_REGISTRY[addr].subs.size,
    put: (key, value) => {
      if (key != null) root.FCL_REGISTRY[addr].kvs[key] = value
    },
    get: (key, fallback) => {
      const value = root.FCL_REGISTRY[addr].kvs[key]
      return value == null ? fallback : value
    },
    delete: key => {
      delete root.FCL_REGISTRY[addr].kvs[key]
    },
    update: (key, fn) => {
      if (key != null)
        root.FCL_REGISTRY[addr].kvs[key] = fn(root.FCL_REGISTRY[addr].kvs[key])
    },
    keys: () => {
      return Object.keys(root.FCL_REGISTRY[addr].kvs)
    },
    all: () => {
      // 返回存储的所有的用户数据
      return root.FCL_REGISTRY[addr].kvs
    },
    where: pattern => {
      return Object.keys(root.FCL_REGISTRY[addr].kvs).reduce((acc, key) => {
        return pattern.test(key)
          ? {...acc, [key]: root.FCL_REGISTRY[addr].kvs[key]}
          : acc
      }, {})
    },
    merge: (data = {}) => {
      // 合并用户信息
      Object.keys(data).forEach(
        key => (root.FCL_REGISTRY[addr].kvs[key] = data[key])
      )
    },
  }
  // 封装在 current-user 中定义的 handlers
  if (typeof fn === "object") fn = fromHandlers(fn)

  queueMicrotask(async () => {
    await fn(ctx)
    kill(addr)
  })

  return addr
}

// Returns an unsubscribe function
// A SUBSCRIBE handler will need to be created to handle the subscription event
//
//  [SUBSCRIBE]: (ctx, letter) => {
//    ctx.subscribe(letter.from)
//    ctx.send(letter.from, UPDATED, ctx.all())
//  }
//
export function subscriber(address, spawnFn, callback) {
  spawnFn(address)
  const EXIT = "@EXIT"
  const self = spawn(async ctx => {
    ctx.send(address, SUBSCRIBE)
    while (1) {
      const letter = await ctx.receive()
      if (letter.tag === EXIT) {
        ctx.send(address, UNSUBSCRIBE)
        return
      }
      callback(letter.data)
    }
  })
  return () => send(self, EXIT)
}

// Returns a promise that returns a result
// A SNAPSHOT handler will need to be created to handle the snapshot event
//
//  [SNAPSHOT]: (ctx, letter) => {
//    letter.reply(ctx.all())
//  }
//
export function snapshoter(address, spawnFn) {
  spawnFn(address)
  return send(address, SNAPSHOT, null, {expectReply: true, timeout: 0})
}
