import * as React from 'react'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { createScopedClasses } from '../helper/classes'

import './scroll.scss'

import scrollBarWidth from './../helper/scrollBarWidth'
import { UIEventHandler } from 'react'

const sc = createScopedClasses('scroll')

interface IScrollProps extends HTMLAttributes<HTMLDivElement> {

}

const Scroll: React.FunctionComponent = (props: IScrollProps) => {
  const { children, ...rest } = props

  const [barHeight, setBarHeight] = useState(0)
  const [barTop, setBarTop] = useState(0)

  const onScroll: UIEventHandler = (e) => {
    const { current } = containerRef
    const scrollHeight = current!.scrollHeight
    const scrollTop = current!.scrollTop
    const viewHeight = current!.getBoundingClientRect().height
    setBarTop(scrollTop * viewHeight / scrollHeight)
  }
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scrollHeight = containerRef.current!.scrollHeight
    const viewHeight = containerRef.current!.getBoundingClientRect().height
    console.log(scrollHeight)
    console.log(viewHeight)
    console.log(viewHeight * viewHeight / scrollHeight)
    setBarHeight(viewHeight * viewHeight / scrollHeight)
  }, [])
  const onBarMouseDown = () => {

  }

  const onBarMouseMove = () => {

  }

  const onBarMouseUp = () => {

  }

  return (
    <div className={sc('')} {...rest}>
      <div
        className={sc('inner')}
        style={{ right: -scrollBarWidth() }}
        ref={containerRef}
        onScroll={onScroll}>
        {children}
      </div>
      <div className={sc('track'}>
        <div
          className={sc('bar')}
          style={{ height: barHeight, transform: `translateY(${barTop}px)` }}
          onMouseDown={onBarMouseDown}
          onMouseMove={onBarMouseMove}
          onMouseUp={onBarMouseUp}

        >
        </div>
      </div>
    </div>
  )
}

export default Scroll
