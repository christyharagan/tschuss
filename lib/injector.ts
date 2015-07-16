import {Wirings} from './model'

/*export class Injector {
  private wirings:Wirings
  constructor(wirings:Wirings) {
    this.wirings = wirings
  }
  getInstance<T> (cls: ObjectConstructor): T {

  }
}
*/
export type Injector = (cls: Function, args:any[])=> any[]

let injectorSingleton:Injector

export function getInjector():Injector {
  return injectorSingleton
}

export function setInjector(injector:Injector) {
  injectorSingleton = injector
}

/*export function createStandardInjector(wirings:Wirings):Injector {
  return function(cls: Function, args:any[]): any[] {

  }
}*/
