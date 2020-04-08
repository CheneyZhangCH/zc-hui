import React from 'react'
import { createScopedClasses } from '../helper/classes'
import './tree.scss'

export interface ISourceDataItem {
  text: string
  value: string
  children?: ISourceDataItem[]
}

interface ITreeProps {
  sourceData: ISourceDataItem[]
  selectedValues: string[]
  onChange: (item: ISourceDataItem, bool: boolean) => void
}

const sc = createScopedClasses('tree')

const Tree: React.FC<ITreeProps> = (props) => {
  const { selectedValues } = props
  const renderItem = (item: ISourceDataItem, level = 1) => {
    return (
      <div key={item.value} className={sc([`level-${level}`, 'item'])}>
        <div className={sc('item-text')}>
          <input type="checkbox"
                 onChange={(e) => props.onChange(item, e.target.checked)}
                 checked={selectedValues.includes(item.value)}
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
