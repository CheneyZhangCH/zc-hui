// 处理组件自身的className 和 用户传来的className 合并的问题
function classes(...names: (string | undefined)[]) {
  // return names.filter(v => v).join(' ') 和下面的方法等价
  return names.filter(Boolean).join(' ');
}

export default classes;

export function createScopedClasses(componentName: string,) {
  return function (postfix?: string | Array<string>, userClass?: string) {
    if (typeof postfix === "string") {
      if (userClass) return [['hui', componentName, postfix].filter(Boolean).join('-'), userClass].join(' ');
      return ['hui', componentName, postfix].filter(Boolean).join('-');
    }

    if (Array.isArray(postfix)) {
      postfix.map((item, index) =>
        postfix[index] = ['hui', componentName, item].filter(Boolean).join('-')
      );

      if (userClass) return [...postfix, userClass].join(' ');
      return [...postfix].join(' ');
    }

    return '';
  };
}
