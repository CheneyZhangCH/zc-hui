import React, { useState } from 'react'
import Tree from './tree'

const TreeExample: React.FC = () => {
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
        },
        {
          text: '1-2',
          value: '1-2',

          children: [
            {
              text: '1-2-1',
              value: '1-2-1',
            },
            {
              text: '1-2-2',
              value: '1-2-2',
            },
          ]
        }]
    }
  ])
  return (
    <div>
      <h2>
        tree
      </h2>

      <Tree
        sourceData={sourceData}

      />
    </div>
  )
}

export default TreeExample
