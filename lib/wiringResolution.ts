import {Unwired, Wirings, Wiring} from './model'

export function resolveWiring(unwired: Unwired): Wirings {
  let wirings:Wirings = {}

  Object.keys(unwired.injections).forEach(function(fqName){
    let wiringsForClass:Wiring[] = []
    wirings[fqName] = wiringsForClass

    unwired.injections[fqName].forEach(function(injection){
      let type = injection.type
      let fqName = type.module + '.' + type.name
      let binding = unwired.bindings[fqName]
      if (binding) {
        wiringsForClass.push({
          injection: injection,
          binding: binding
        })
      } else {
        // TODO Throw error
      }
    })
  })

  return wirings
}
