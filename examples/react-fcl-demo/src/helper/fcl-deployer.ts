import * as fcl from "@onflow/fcl"
import { template as setCode } from "@onflow/six-set-code"

export async function Send(code: string) {
    const response = await fcl.send([
        setCode({
            proposer: fcl.currentUser().authorization,  // 交易发起人
            authorization: fcl.currentUser().authorization,     // 授权人
            payer: fcl.currentUser().authorization,             // 费用支付人
            code: code,
        })
    ])

    try {
      return await fcl.tx(response).onceExecuted()
    } catch (error) {
      return error;
    }
}