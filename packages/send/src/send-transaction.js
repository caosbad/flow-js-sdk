import {AccessAPI, Transaction, SendTransactionRequest} from "@onflow/protobuf"
import {response} from "@onflow/response"
import {sansPrefix} from "@onflow/util-address"
import {unary} from "./unary"

const u8ToHex = u8 => Buffer.from(u8).toString("hex")
const paddedHexBuffer = (hex, pad) =>
  Buffer.from(hex.padStart(pad * 2, 0), "hex")
const scriptBuffer = script => Buffer.from(script, "utf8")
const hexBuffer = hex => Buffer.from(hex, "hex")
const addressBuffer = addr => paddedHexBuffer(addr, 8)
const argumentBuffer = arg => Buffer.from(JSON.stringify(arg), "utf8")

export async function sendTransaction(ix, opts = {}) {
  ix = await ix

  const tx = new Transaction()    // 初始化交易体，适配 gRPC 的数据类型
  tx.setScript(scriptBuffer(ix.message.cadence))  // 设置需要执行的 Cadence 脚本
  tx.setGasLimit(ix.message.computeLimit)   // 设置 gas 上限
  tx.setReferenceBlockId(         // 设置最新的区块信息
    ix.message.refBlock ? hexBuffer(ix.message.refBlock) : null
  )
  tx.setPayer(addressBuffer(sansPrefix(ix.accounts[ix.payer].addr)))  // 设置支付人
  ix.message.arguments.forEach(arg =>
    tx.addArguments(argumentBuffer(ix.arguments[arg].asArgument))   // 转换交易的参数
  )
  // 设置权限相关信息
  ix.authorizations 
    .map(tempId => ix.accounts[tempId].addr)
    .reduce((prev, current) => {
      return prev.find(item => item === current) ? prev : [...prev, current]
    }, [])
    .forEach(addr => tx.addAuthorizers(addressBuffer(sansPrefix(addr))))
  // 交易发起人
  const proposalKey = new Transaction.ProposalKey()
  proposalKey.setAddress(
    addressBuffer(sansPrefix(ix.accounts[ix.proposer].addr))
  )
  proposalKey.setKeyId(ix.accounts[ix.proposer].keyId)
  proposalKey.setSequenceNumber(ix.accounts[ix.proposer].sequenceNum)

  tx.setProposalKey(proposalKey)
  // 如果没有设置付款人，则默认使用交易签名人作为付款人
  // Apply Non Payer Signatures to Payload Signatures
  for (let acct of Object.values(ix.accounts)) {
    try {
      if (!acct.role.payer && acct.signature != null) {
        const sig = new Transaction.Signature()
        sig.setAddress(addressBuffer(sansPrefix(acct.addr)))
        sig.setKeyId(acct.keyId)
        sig.setSignature(hexBuffer(acct.signature))
        tx.addPayloadSignatures(sig)
      }
    } catch (error) {
      console.error("Trouble applying payload signature", {acct, ix})
      throw error
    }
  }

  // 如果没有设置签名人，则默认使用付款人作为签名人
  // Apply Payer Signatures to Envelope Signatures
  for (let acct of Object.values(ix.accounts)) {
    try {
      if (acct.role.payer && acct.signature != null) {
        const sig = new Transaction.Signature()
        sig.setAddress(addressBuffer(sansPrefix(acct.addr)))
        sig.setKeyId(acct.keyId)
        sig.setSignature(hexBuffer(acct.signature))
        tx.addEnvelopeSignatures(sig)
      }
    } catch (error) {
      console.error("Trouble applying envelope signature", {acct, ix})
      throw error
    }
  }

  // 初始化 gRPC 的请求体
  const req = new SendTransactionRequest()
  req.setTransaction(tx)
  // 时间记录
  var t1 = Date.now()
  const res = await unary(opts.node, AccessAPI.SendTransaction, req)  // 广播交易
  var t2 = Date.now()

  let ret = response()
  ret.tag = ix.tag
  ret.transactionId = u8ToHex(res.getId_asU8())     // trx id 赋值
  // 浏览器环境的事件广播
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("FLOW::TX", {
        detail: {txId: ret.transactionId, delta: t2 - t1},
      })
    )
  }

  return ret
}
