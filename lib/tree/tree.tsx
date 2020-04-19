import React from 'react'
import { createScopedClasses } from '../helper/classes'
import './tree.scss'
import TreeItem, { ITreeProps } from './treeItem'

const sc = createScopedClasses('tree')

const Tree: React.FC<ITreeProps> = (
  props
) => {

  const onItemChange = (values: string[] | string) => {
    console.log('final value', values)
    if (props.multiple) {
      props.onChange(values as string[])
    } else {
      props.onChange(values as string)
    }
  }

  return (
    <div className={sc('')}>
      {props.sourceData.map((item, index) =>
        <TreeItem key={item.value} item={item} onItemChange={onItemChange} level={1} treeProps={props}/>
      )}
    </div>
  )
}

export default Tree
