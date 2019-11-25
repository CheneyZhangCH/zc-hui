import React, { useEffect, useState } from 'react'
import { createScopedClasses } from '../helper/classes'
import { Icon } from '../index'
import './carousel.scss'

const sc = createScopedClasses('carousel')

export interface IImageItem {
  src: string

  [Key: string]: any
}

interface ICarouselProps {
  imgs: IImageItem[]
  current?: number
  onClickPrev?: (current?: number, images?: IImageItem[]) => void
  onClickNext?: (current?: number, images?: IImageItem[]) => void
  showDots?: boolean

}

const Carousel = (props: ICarouselProps) => {

  const [imgs, setImgs] = useState([] as IImageItem[])
  const [current, setCurrent] = useState(props.current || 0)

  useEffect(() => {
    if (Array.isArray(props.imgs)) {
      setImgs(props.imgs)
    }
  })

  const clickPrev = () => {
    props.onClickPrev && props.onClickPrev(current, imgs)
    if (current > 0) {
      setCurrent(current - 1)
    } else {
      setCurrent(props.imgs.length - 1)
    }
  }

  const clickNext = () => {
    props.onClickNext && props.onClickNext(current, imgs)
    if (current < props.imgs.length - 1) {
      setCurrent(current + 1)
    } else {
      setCurrent(0)
    }
  }

  return (
    <div className={sc('')}>
      <Icon name={'left'} className={sc('left')} fill={'blue'} onClick={clickPrev}/>

      <Icon name={'right'} className={sc('right')} fill={'blue'} onClick={clickNext}/>
      <div className={sc('main')}>
        {props.imgs.map((x: IImageItem, index: number) => {
          return (
            <img className={sc(['img', `${current === index ? 'img-active' : ''}`])} src={x.src} alt=""/>
          )
        })}
      </div>
      <div className={sc('dots')}>
        {props.imgs.map((x: IImageItem, index: number) => {
          return (
            <div className={sc(['dot', `${current === index ? 'dot-active' : ''}`])}/>
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
