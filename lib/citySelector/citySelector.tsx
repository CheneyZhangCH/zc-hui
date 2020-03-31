import * as React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import { createScopedClasses } from '../helper/classes'

import { Icon } from '../index'

import './citySelector.scss'

const sc = createScopedClasses('citySelector')

interface CityList {
  [key: string]: string[]
}

interface ICitySelectorProps {
  onRefresh?: () => void
  cityList: CityList
}

const CitySelectorContext = React.createContext<CityList>({})

const CitySelector: React.FC<ICitySelectorProps> = (props) => {
  const [dialogVisible, setDialogVisible] = useState(true)

  const onClick = () => {
    setDialogVisible(true)
  }
  return (
    <CitySelectorContext.Provider value={props.cityList}>
      <div onClick={onClick}>{props.children}</div>
      {dialogVisible && <Dialog onClose={() => setDialogVisible(false)}/>}
    </CitySelectorContext.Provider>
  )

}
const Dialog: React.FC<{ onClose: () => void }> = (props) => {
  const cityList = React.useContext(CitySelectorContext)
  const indexList = Object.keys(cityList).sort()
  const cityKeys = Object.keys(cityList)
  console.log(cityList)
  return ReactDOM.createPortal(
    <div
      className={sc('dialog')}
      onClick={props.onClose}>
      <header>
        <Icon name='left' style={{
          position: 'absolute',
          left: 8
        }}/>
        <span>选择城市</span>
      </header>
      <div className={sc('pageContent')}>

        <CurrentCity/>
        <div className={sc('cityListWrapper')}>
          <h4>全部城市</h4>
          <div className={sc('charsIndex')}>
            <ol>
              {indexList.map((letter, index) => <li key={index}>{letter}</li>)}
            </ol>
          </div>
          {cityKeys.map(key => {
            return (
              <div className={sc('citySection')} key={key}>
                <h4>{key}</h4>
                {cityList[key].map(city => <div className={sc('cityName')} key={city}>{city}</div>)}
              </div>
            )
          })}
        </div>
      </div>
    </div>,
    document.body
  )
}

const CurrentCity: React.FC = () => {
  const [currentCity, setCurrentCity] = useState('加载中')
  useEffect(() => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'http://ip-api.com/json?lang=zh-CN')
    xhr.onload = () => {
      const result = JSON.parse(xhr.response)
      setCurrentCity(result.city)
    }
    xhr.onerror = () => {
      setCurrentCity('未知')
    }
    xhr.send()

  }, [])

  return (
    <div className={sc('currentCity')}>当前城市：{currentCity}</div>
  )
}

export default CitySelector
