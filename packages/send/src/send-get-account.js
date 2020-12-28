import { GetAccountRequest, AccessAPI } from "@onflow/protobuf"
import { response } from "@onflow/response"
import { sansPrefix, withPrefix } from "@onflow/util-address"
import { unary } from "./unary"

const u8ToHex = u8 => Buffer.from(u8).toString("hex")
const paddedHexBuffer = (hex, pad) =>
  Buffer.from(hex.padStart(pad * 2, 0), "hex")

const addressBuffer = addr => paddedHexBuffer(addr, 8)

export async function sendGetAccount(ix, opts = {}) {
  ix = await ix // 获得具体的 ix 结构

  const req = new GetAccountRequest() // 定义 gRPC message 结构
  req.setAddress(addressBuffer(sansPrefix(ix.accountAddr))) // 设置请求参数

  const res = await unary(opts.node, AccessAPI.GetAccount, req)

  let ret = response() // 初始化响应数据
  ret.tag = ix.tag // 赋值请求类型

  const account = res.getAccount()
  ret.account = {
    address: withPrefix(u8ToHex(account.getAddress_asU8())), // 获得地址信息并添加前缀
    balance: account.getBalance(), // 获得余额
    code: account.getCode_asU8(), // 获得地址中部署的合约代码
    keys: account.getKeysList().map(publicKey => ({ // 遍历地址下绑定的 key 信息
      index: publicKey.getIndex(),
      publicKey: u8ToHex(publicKey.getPublicKey_asU8()),
      signAlgo: publicKey.getSignAlgo(),
      hashAlgo: publicKey.getHashAlgo(),
      weight: publicKey.getWeight(),
      sequenceNumber: publicKey.getSequenceNumber(),
    })),
  }

  return ret
}
