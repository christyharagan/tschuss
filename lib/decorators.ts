import {getInjector} from './injector'

export function inject(...props:any[]) {
  return function(target: Function, propertyKey: string, index:number) : void {
    /*return function(...args: any[]) {
      args = getInjector()(target, args)
      target.apply(this, args)
    }*/
  }
}

export function bind(...props:any[]) {
  return function<TFunction extends Function>(target: TFunction): TFunction {
    return target
  }
}

export function wired(dirname:string) {
  return function<TFunction extends Function>(target: TFunction): TFunction {
    return target
  }
}
