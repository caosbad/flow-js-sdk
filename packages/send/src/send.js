import {
  isTransaction,
  isGetTransactionStatus,
  isScript,
  isGetAccount,
  isGetEvents,
  isGetLatestBlock,
  isGetBlockById,
  isGetBlockByHeight,
  isPing,
} from "@onflow/interaction"
import { sendTransaction } from "./send-transaction"
import { sendGetTransactionStatus } from "./send-get-transaction-status"
import { sendExecuteScript } from "./send-execute-script"
import { sendGetAccount } from "./send-get-account"
import { sendGetEvents } from "./send-get-events"
import { sendGetLatestBlock } from "./send-get-latest-block"
import { sendGetBlockById } from "./send-get-block-by-id"
import { sendGetBlockByHeight } from "./send-get-block-by-height"
import { sendPing } from "./send-ping"
import { config } from "@onflow/config"

export const send = async (ix, opts = {}) => {
  opts.node = opts.node || (await config().get("accessNode.api")) // 初始化自定义节点配置
  ix = await ix // 

  // 根据交易类型，决定返回具体的交易方法
  switch (true) {
    case isTransaction(ix):
      return sendTransaction(ix, opts)
    case isGetTransactionStatus(ix):
      return sendGetTransactionStatus(ix, opts)
    case isScript(ix):
      return sendExecuteScript(ix, opts)
    case isGetAccount(ix): // 路由到相对的查询
      return sendGetAccount(ix, opts)
    case isGetEvents(ix):
      return sendGetEvents(ix, opts)
    case isGetLatestBlock(ix):
      return sendGetLatestBlock(ix, opts)
    case isGetBlockById(ix):
      return sendGetBlockById(ix, opts)
    case isGetBlockByHeight(ix):
      return sendGetBlockByHeight(ix, opts)
    case isPing(ix):
      return sendPing(ix, opts)
    default:
      return ix
  }
}
