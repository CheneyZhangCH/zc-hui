import React from 'react'

interface ISourceDataItem {
  text: string
  value: string
  children?: ISourceDataItem[]
}

interface ITreeProps {
  sourceData: ISourceDataItem[]
}

const renderItem = (item: ISourceDataItem) => {
  return (
    <div key={item.value}>
      <div>{item.text}</div>
      <div>
        {item.children?.map(child => renderItem(child))}
      </div>
    </div>
  )
}

const Tree: React.FC<ITreeProps> = (props) => {
  return (
    <div>
      {props.sourceData.map(item => {
        return renderItem(item)
      })}
    </div>
  )
}

export default Tree
