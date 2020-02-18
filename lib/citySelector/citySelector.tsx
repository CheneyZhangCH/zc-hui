import * as React from 'react'
import ReactDOM from 'react-dom'
import { HTMLAttributes, useState } from 'react'
import { createScopedClasses } from '../helper/classes'

import { Icon } from '../index'

import './citySelector.scss'

const sc = createScopedClasses('citySelector')

interface ICitySelectProps extends HTMLAttributes<HTMLDivElement> {
  onRefresh?: () => void
}

const CitySelector: React.FC = (props: ICitySelectProps) => {
  const [dialogVisible, setDialogVisible] = useState(true)

  const onClick = () => {
    setDialogVisible(true)
  }
  return (
    <>
      <div onClick={onClick}>{props.children}</div>
      {dialogVisible && <Dialog onClose={() => setDialogVisible(false)}/>}
    </>
  )

}
const Dialog: React.FC<{ onClose: () => void }> = (props) => {
  return ReactDOM.createPortal(
    <div
      className={sc('dialog')}
      onClick={props.onClose}>
      <header>
        <Icon  name='left' style={{
          position: 'absolute',
          left: 8
        }}/>
        <span>选择城市</span>
      </header>
      <div className={sc('currentCity')}>上海</div>
      <h2>城市</h2>
      <div className={sc('cityIndex')}>ABCD</div>
      <div className={sc('cityList')}>所有城市</div>
    </div>,
    document.body
  )
}

export default CitySelector
