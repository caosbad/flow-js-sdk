import { pipe, makeGetAccount, Ok } from "@onflow/interaction"
import { sansPrefix } from "@onflow/util-address"

export function getAccount(addr) {
  return pipe([
    makeGetAccount, // 构造具体查询交易
    ix => {
      ix.accountAddr = sansPrefix(addr) // 截取地址前缀
      return Ok(ix) // 返回状态
    }
  ])
}
