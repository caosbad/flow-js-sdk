import {update} from "../interaction/interaction"

export function validator(cb) {
  return update("ix.validators", validators =>
    Array.isArray(validators) ? validators.push(cb) : [cb]
  )
}
