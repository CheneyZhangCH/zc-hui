import React, { useState } from 'react'
import Tree from './tree'
import { ISourceDataItem } from './tree'

const TreeExample: React.FC = () => {
  // @ts-ignore
  const [sourceData, setSourceData] = useState([
    {
      text: '1',
      value: '1',
      children: [
        {
          text: '1-1',
          value: '1-1',
          children: [
            {
              text: '1-1-1',
              value: '1-1-1',

            },
            {
              text: '1-1-2',
              value: '1-1-2',
            },
          ]
        }]
    },
    {
      text: '2',
      value: '2',
      children: [
        {
          text: '2-1',
          value: '2-1',
          children: [
            {
              text: '2-1-1',
              value: '2-1-1',

            }
          ]
        },
        {
          text: '2-2',
          value: '2-2',

          children: [
            {
              text: '2-2-1',
              value: '2-2-1',
            },
            {
              text: '2-2-2',
              value: '2-2-2',
            },
          ]
        }]
    }
  ])

  const [selectedValues, setSelectedValues] = useState(['1-1-1', '1-1-2'])
  const onChange = (item: ISourceDataItem, bool: boolean) => {
    console.log('change')
    if (bool) {
      setSelectedValues([...selectedValues, item.value])
    } else {
      setSelectedValues(selectedValues.filter(value => value !== item.value))
    }
  }

  return (
    <div>
      <h2>tree</h2>
      <div style={{ width: '200px' }}>
        <Tree sourceData={sourceData} selectedValues={selectedValues} onChange={onChange}/>
      </div>

    </div>
  )
}

export default TreeExample
