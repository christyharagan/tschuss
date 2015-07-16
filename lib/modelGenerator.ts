// TODO: Support generics
// TODO: Support inject/binding parameters
// TODO: Throw errors/warnings on incorrect annotation

import * as s from 'typescript-schema'
import * as m from './model'

function toRawRef(cls:s.Class|s.Interface|s.RawReference) {
  return {
    typeKind: null,
    module: (<s.RawReference>cls).module || (<s.Class>cls).container.name,
    name: cls.name
  }
}

export function generateWiring(schema:s.Schema) : m.Unwired {
  let unwired:m.Unwired = {
    injections: {},
    bindings:{}
  }

  s.schemaVisitor(schema, {
    onClass: function(classSchema) {
      if (classSchema.decorators) {
        let bindingDec = classSchema.decorators.filter(function(decorator){
          return decorator.decorator === 'bind'
        })[0]
        if (bindingDec) {
          let type:s.RawReference
          if (classSchema.extends) {
            type = toRawRef(<s.Class>classSchema.extends)
          } else if (classSchema.implements.length === 1) {
            type = toRawRef(<s.Interface>classSchema.implements[0])
          } else {
            // Invalid binding
            // TODO: Throw error
          }
          let binding:m.Binding = {
            type: toRawRef(classSchema)
          }
          unwired.bindings[type.module + '.' + type.name] = binding
        }
      }
      if (classSchema.constructorSchema) {
        let cs = classSchema.constructorSchema
        cs.parameters.forEach(function(parameter, index){
          if (parameter.decorators) {
            let injectDec = parameter.decorators.filter(function(decorator){
              return decorator.decorator === 'inject'
            })[0]
            if (injectDec) {
              let type: s.RawReference
              if (parameter.type.typeKind === s.TypeKind.CLASS) {
                type = toRawRef(<s.Class> parameter.type)
              } else if (parameter.type.typeKind === s.TypeKind.INTERFACE) {
                type = toRawRef(<s.Interface> parameter.type)
              } else {
                type = toRawRef(<s.RawReference> parameter.type)
              }
              let injection:m.Injection = {
                type: type,
                index: index,
                name: parameter.name
              }
              unwired.injections[classSchema.container.name + '.' + classSchema.name] = [injection]
            }
          }
        })
      }
    }
    /*onClassMember: function(classMember){
      if (classMember.decorators) {
        let injectDec = classMember.decorators.filter(function(decorator){
          return decorator.decorator === 'inject'
        })[0]
        if (injectDec) {
          let type: s.RawReference
          if (classMember.type.typeKind === s.TypeKind.CLASS) {
            type = toRawRef(<s.Class> classMember.type)
          } else if (classMember.type.typeKind === s.TypeKind.INTERFACE) {
            type = toRawRef(<s.Interface> classMember.type)
          } else {
            // TODO: Throw error
          }
          let injection:m.PropertyInjection = {
            kind: m.Kind.PARAMETER,
            type: type,
            name: classMember.name
          }
          let fqName = classMember.parent.container + '.' + classMember.parent.name
          let injections = unwired.injections[fqName]
          if (!injections) {
            injections = []
            unwired.injections[fqName] = injections
          }
          injections.push(injection)
        }
      }*/
    //}
  })

  return unwired
}
