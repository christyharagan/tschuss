import * as s from 'typescript-schema'

export interface Unwired {
  injections: Injections,
  bindings: Bindings
}

export interface Wirings {
  [className:string]:Wiring[]
}

export interface Wiring {
  injection: Injection
  binding: Binding
}

export interface Injections {
  [className:string]: Injection[]
}

export interface Bindings {
  [className:string]: Binding
}

export interface Injection {
  parameters?: Parameters
  type: s.RawReference
  name: string
  index: number
}

export interface Binding {
  type: s.RawReference
  parameters?: Parameters
}

export interface Parameters {
  [parameter:string]: string|boolean|number|Parameters|(string|boolean|number|Parameters)[]
}
