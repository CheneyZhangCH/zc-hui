// 本文件用处
// import xxx from 'xxx' 时要求xxx必须有默认导出
// 否则需要如下声明，如下是给所有svg增加默认导出
// 如果需要默认导出，则必须加上如下配置
declare module '*.svg' {
  const content: any;
  export default content;
}

import 'styled-components';

// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string

    colors: {
      main: string
      secondary: string
    }
  }
}
