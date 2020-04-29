import React, { ChangeEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react'
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
  onItemChange: (values: string[]) => void
}

const sc = createScopedClasses('tree')

const TreeItem: React.FC<ITreeItemProps> = (props) => {
  const [collapsed, setCollapsed] = useState(true)
  const childRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { item, level, treeProps } = props

  const collectChildrenValues = (item: ISourceDataItem): any => {
    return item.children?.map(child => [child.value, collectChildrenValues(child)])
  }
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation()
    const childrenValues = collectChildrenValues(item)?.flat(Infinity).filter(Boolean) || []
    if (treeProps.multiple) {
      if (e.target.checked) {
        props.onItemChange(Array.from(new Set([...treeProps.selected, item.value, ...childrenValues])))
      } else {
        props.onItemChange(treeProps.selected.filter(value =>
          value !== item.value && childrenValues.indexOf(value) === -1
        ))
      }
    } else {
      if (e.target.checked) {
        treeProps.onChange(item.value)
      } else {
        treeProps.onChange('')
      }
    }
  }

  const intersect = <T, K>(array1: T[], array2: T[]): T[] => {
    const result: T[] = []
    for (let i = 0; i < array1.length; i++) {
      if (array2.includes(array1[i])) {
        result.push(array1[i])
      }
    }
    return Array.from(new Set(result))
  }

  const onItemChange = (values: string[]) => {
    const childrenValues = Array.from(new Set(collectChildrenValues(item).flat(Infinity).filter(Boolean))) || []
    const common = intersect(values, childrenValues)
    if (common.length !== 0) {
      props.onItemChange(values.concat(item.value))
      inputRef.current!.indeterminate = common.length !== childrenValues.length
    } else {
      props.onItemChange(values.filter(value => value !== item.value))
      inputRef.current!.indeterminate = false
    }
  }

  useUpdate(collapsed, () => {
    if (!childRef.current) return

    if (collapsed) {
      const { height } = childRef.current.getBoundingClientRect()
      childRef.current.style.height = height + 'px'
      childRef.current.getBoundingClientRect()
      childRef.current.style.height = '0px'
      const x = () => {
        if (!childRef.current) return
        // childRef.current.style.height = ''
        childRef.current.style.height = '0px'
        childRef.current.classList.add('hui-tree-item-collapsed')
        childRef.current.classList.remove('hui-tree-item-expended')
        childRef.current.removeEventListener('transitionend', x)
      }
      childRef.current.addEventListener('transitionend', x)

    } else {
      childRef.current.style.height = 'auto'
      const { height } = childRef.current.getBoundingClientRect()
      childRef.current.classList.add('hui-tree-item-expended')
      childRef.current.classList.remove('hui-tree-item-collapsed')
      childRef.current.style.height = '0px'
      childRef.current.getBoundingClientRect()
      childRef.current.style.height = height + 'px'
      const y = () => {
        if (!childRef.current) return
        childRef.current.style.height = 'auto'
        childRef.current.classList.remove('hui-tree-item-collapsed')
        childRef.current.classList.add('hui-tree-item-expended')
        childRef.current.removeEventListener('transitionend', y)
      }
      childRef.current.addEventListener('transitionend', y)
    }
  })

  useEffect(() => {
    if (!childRef.current) return
    childRef.current.style.height = '0px'
  }, [])

  const toggleCollapsed: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    setCollapsed(!collapsed)
  }

  return (
    <div key={item.value} className={sc([`level-${level}`, 'item'])}>
      <div className={sc('item-text')}>
        <input
          ref={inputRef}
          type="checkbox"
          onChange={onChange}
          checked={treeProps.multiple ? treeProps.selected.includes(item.value) : treeProps.selected === item.value}
        />
        <span onClick={toggleCollapsed}>{item.text}</span>
      </div>

      <div ref={childRef} className={sc(['item-children', collapsed ? 'item-collapsed' : 'item-expended'])}>
        {Array.isArray(item.children) && item.children.length > 0 && item.children.map((child) =>
          <TreeItem
            key={child.value}
            item={child}
            level={level + 1}
            onItemChange={onItemChange}
            treeProps={treeProps}
          />
        )}
      </div>

    </div>
  )
}

export default TreeItem
