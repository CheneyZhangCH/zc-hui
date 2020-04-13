import React, { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react'
import { createScopedClasses } from '../helper/classes'
import './tree.scss'
import { useUpdate } from '../hooks'

export type ISourceDataItem = {
  text: string
  value: string
  children?: ISourceDataItem[]
}

export type ITreeProps = {
  sourceData: ISourceDataItem[],
} & ({
  selected: string[], multiple: true, onChange: (selected: string[]) => void,
} | {
  selected: string, multiple?: false, onChange: (selected: string) => void,
})

interface ITreeItemProps {
  item: ISourceDataItem
  level: number
  treeProps: ITreeProps
}

const sc = createScopedClasses('tree')

const TreeItem: React.FC<ITreeItemProps> = (props) => {
  const { item, level, treeProps } = props
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation()
    if (treeProps.multiple) {
      if (e.target.checked) {
        treeProps.onChange([...treeProps.selected, item.value])
      } else {
        treeProps.onChange(treeProps.selected.filter(value => value !== item.value))
      }
    } else {
      debugger
      if (e.target.checked) {
        treeProps.onChange(item.value)
      } else {
        treeProps.onChange('')
      }
    }
  }

  const [collapsed, setCollapsed] = useState(true)
  const childRef = useRef<HTMLDivElement>(null)

  useUpdate(collapsed, () => {
    console.log(collapsed)
    if (collapsed) {
      console.log('关闭')
      if (!childRef.current) return
      const { height } = childRef.current.getBoundingClientRect()
      childRef.current.style.height = height + 'px'
      childRef.current.getBoundingClientRect()
      childRef.current.style.height = '0px'
    } else {
      console.log('打开')
      if (!childRef.current) return
      childRef.current.style.height = 'auto'
      const { height } = childRef.current.getBoundingClientRect()
      childRef.current.classList.remove('hui-tree-item-collapsed')
      childRef.current.style.height = '0px'
      childRef.current.getBoundingClientRect()
      childRef.current.style.height = height + 'px'
      childRef.current.style.height = 'auto'
    }
  })

  const toggleCollapsed: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    setCollapsed(!collapsed)
  }

  return (
    <div key={item.value} className={sc([`level-${level}`, 'item'])}>
      <div className={sc('item-text')}>
        <input
          type="checkbox"
          onChange={onChange}
          checked={treeProps.multiple ? treeProps.selected.includes(item.value) : treeProps.selected === item.value}
        />
        <span onClick={toggleCollapsed}>{item.text}</span>
      </div>

      <div ref={childRef} className={sc(['item-children', collapsed ? 'item-collapsed' : ''])}>
        {item.children?.map((child, index) =>
          <TreeItem key={child.value} item={child} level={level + 1} treeProps={treeProps}/>
        )}
      </div>
    </div>
  )
}

export default TreeItem
