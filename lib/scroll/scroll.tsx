import * as React from 'react'
import { HTMLAttributes, MouseEventHandler, TouchEventHandler, useEffect, useRef, useState } from 'react'
import { createScopedClasses } from '../helper/classes'
import { Icon } from '../index'

import './scroll.scss'

import scrollBarWidth from './../helper/scrollBarWidth'
import { UIEventHandler } from 'react'

const sc = createScopedClasses('scroll')

interface IScrollProps extends HTMLAttributes<HTMLDivElement> {
  onRefresh?: () => void
}

const Scroll: React.FunctionComponent<IScrollProps> = (props) => {
  const { children, onRefresh, ...rest } = props

  const [barHeight, setBarHeight] = useState(0)
  const [barTop, _setBarTop] = useState(0)
  const [barVisible, setBarVisible] = useState(false)

  const timerRef = useRef<number | null>(null)
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
    setBarVisible(true)
    const { current } = containerRef
    const scrollHeight = current!.scrollHeight
    const scrollTop = current!.scrollTop
    const viewHeight = current!.getBoundingClientRect().height
    setBarTop(scrollTop * viewHeight / scrollHeight)
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
    }
    timerRef.current = window.setTimeout(() => {
      setBarVisible(false)
    }, 300)
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

  const [translateY, _setTranslateY] = useState(0)
  const setTranslateY = (y: number) => {
    if (y < 0) {
      y = 0
    } else if (y > 100) {
      y = 100
    }

    _setTranslateY(y)
  }

  const touchLastYRef = useRef(0)
  const moveCountRef = useRef(0)
  const pullingRef = useRef(false)

  const onTouchStart: TouchEventHandler = (e) => {
    const scrollTop = containerRef.current!.scrollTop
    if (scrollTop !== 0) return

    touchLastYRef.current = e.touches[0].clientY
    moveCountRef.current = 0
    pullingRef.current = true
  }

  const onTouchMove: TouchEventHandler = (e) => {
    moveCountRef.current += 1
    const distanceY = e.touches[0].clientY - touchLastYRef.current
    console.log(distanceY)
    if (moveCountRef.current === 1 && distanceY < 0) {
      pullingRef.current = false
      return
    }
    if (!pullingRef.current) {
      return
    }
    setTranslateY(translateY + distanceY)
    touchLastYRef.current = e.touches[0].clientY
  }

  const onTouchEnd = () => {
    if (translateY === 100 && pullingRef.current) {
      props.onRefresh && props.onRefresh()
      pullingRef.current = false
    }
    setTranslateY(0)
  }

  return (
    <div
      className={sc('')}
      {...rest}
    >
      <div
        className={sc('inner')}
        style={{
          right: -scrollBarWidth(),
          transform: `translateY(${translateY}px)`,
        }}
        ref={containerRef}
        onScroll={onScroll}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </div>
      {barVisible && (
        <div className={sc('track')}>
          <div
            className={sc('bar')}
            style={{ height: barHeight, transform: `translateY(${barTop}px)` }}
            onMouseDown={onBarMouseDown}
          >
          </div>
        </div>
      )}
      <div className={sc('pulling')} style={{ height: translateY }}>
        {
          translateY === 100 ? (
            <span>释放刷新</span>
          ) : (
            <Icon name={'down'}/>
          )
        }
      </div>
    </div>
  )
}

export default Scroll
