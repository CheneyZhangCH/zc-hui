import React, { useState } from 'react'
import Tree from './tree'

const TreeExample: React.FC = () => {
  // @ts-ignore
  const [sourceData] = useState([
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

  // const [selectedValues, setSelectedValues] = useState(['1-1-1', '1-1-2'])
  const [selected, setSelected] = useState(['1-1-1'])
  const onChange = (selected: string[]) => {
    console.log('change')
    setSelected(selected)
  }

  return (
    <div>
      <h2>tree</h2>
      <div style={{ width: '200px' }}>
        <Tree sourceData={sourceData} selected={selected} multiple onChange={onChange}/>
      </div>

    </div>
  )
}

export default TreeExample
