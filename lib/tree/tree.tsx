import React from 'react'
import { createScopedClasses } from '../helper/classes'
import './tree.scss'
import TreeItem, { ITreeProps } from './treeItem'

const sc = createScopedClasses('tree')

const Tree: React.FC<ITreeProps> = (
  props
) => {

  return (
    <div className={sc('')}>
      {props.sourceData.map((item, index) =>
        <TreeItem key={item.value} item={item} level={1} treeProps={props}/>
      )}
    </div>
  )
}

export default Tree
