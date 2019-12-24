import * as React from 'react'
import { HTMLAttributes, MouseEventHandler, useEffect, useRef, useState } from 'react'
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
  const [barTop, _setBarTop] = useState(0)

  const setBarTop = (number: number) => {
    if (number < 0) {return}
    const { current } = containerRef
    const scrollHeight = current!.scrollHeight
    const viewHeight = current!.getBoundingClientRect().height
    const maxBarTop = (scrollHeight - viewHeight) * viewHeight / scrollHeight
    if (number > maxBarTop) return
    _setBarTop(number)
  }
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
    setBarHeight(viewHeight * viewHeight / scrollHeight)
  }, [])
  const draggingRef = useRef(false)
  const firstYRef = useRef(0)
  const firstBarTopRef = useRef(0)
  const onBarMouseDown: MouseEventHandler = (e) => {
    draggingRef.current = true
    firstYRef.current = e.clientY
  }

  const onBarMouseMove = (e: MouseEvent) => {
    if (draggingRef.current) {
      const distance = e.clientY - firstYRef.current
      const newBarTop = firstBarTopRef.current + distance
      setBarTop(newBarTop)
      const scrollHeight = containerRef.current!.scrollHeight
      const viewHeight = containerRef.current!.getBoundingClientRect().height
      containerRef.current!.scrollTop = newBarTop * scrollHeight / viewHeight
    }
  }

  const onBarMouseUp = () => {
    draggingRef.current = false
  }
  const onSelect = (e: Event) => {
    if (draggingRef.current) e.preventDefault()
  }

  useEffect(() => {
    document.addEventListener('mouseup', onBarMouseUp)
    document.addEventListener('mousemove', onBarMouseMove)
    document.addEventListener('selectstart', onSelect)
    return () => {
      document.removeEventListener('mouseup', onBarMouseUp)
      document.removeEventListener('mousemove', onBarMouseMove)
      document.removeEventListener('selectstart', onSelect)
    }
  }, [])
  return (
    <div
      className={sc('')}
      onMouseMove={onBarMouseMove}
      onMouseUp={onBarMouseUp}
      {...rest}
    >
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
        >
        </div>
      </div>
    </div>
  )
}

export default Scroll
