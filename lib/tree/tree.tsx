import React, { ChangeEventHandler } from 'react'
import { createScopedClasses } from '../helper/classes'
import './tree.scss'

export interface ISourceDataItem {
  text: string
  value: string
  children?: ISourceDataItem[]
}

type ITreeProps = {
  sourceData: ISourceDataItem[],
} & ({
  selected: string[], multiple: true, onChange: (selected: string[]) => void,
} | {
  selected: string, multiple?: false, onChange: (selected: string) => void,
})

const sc = createScopedClasses('tree')

const Tree: React.FC<ITreeProps> = (
  props
) => {

  const renderItem = (item: ISourceDataItem, level = 1) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (props.multiple) {
        if (e.target.checked) {
          props.onChange([...props.selected, item.value])
          // setSelectedValues([...selectedValues, item.value])
        } else {
          props.onChange(props.selected.filter(value => value !== item.value))
          // setSelectedValues(selectedValues.filter(value => value !== item.value))
        }
      } else {
        props.onChange(item.value)
      }
    }
    return (
      <div key={item.value} className={sc([`level-${level}`, 'item'])}>
        <div className={sc('item-text')}>
          <input
            type="checkbox"
            onChange={onChange}
            checked={props.multiple ? props.selected.includes(item.value) : props.selected === item.value}
          />
          {item.text}
        </div>

        {item.children?.map(child => renderItem(child, level + 1))}
      </div>
    )
  }

  return (
    <div className={sc('')}>
      {props.sourceData.map(item => {
        return renderItem(item)
      })}
    </div>
  )
}

export default Tree
