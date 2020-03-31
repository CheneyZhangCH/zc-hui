import * as React from 'react'
import CitySelector from './citySelector'
import cityList from './data.json'

console.log(cityList)
const CitySelectorExample: React.FunctionComponent = () => {

  return (
    <div>
      <div>
        <h2>示例1</h2>
        <CitySelector cityList={cityList}>点击选择城市</CitySelector>
      </div>
    </div>
  )
}

export default CitySelectorExample
