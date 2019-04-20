// 处理组件自身的className 和 用户传来的className 合并的问题
function classes (...names: (string | undefined)[]) {
  // return names.filter(v => v).join(' ') 和下面的方法等价
  return names.filter(Boolean).join(' ')
}
export default classes;

export function createScopedClasses(componentName: string){
  return function createClasses(postfix?:string) {
    return ['hui', componentName, postfix].filter(Boolean).join('-')
  }
}

const sc = createScopedClasses('dialog');

console.log(sc('header'))
console.log(sc('main'))
console.log(sc('footer'))