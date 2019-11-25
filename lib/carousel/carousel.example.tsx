import React from 'react'
import Carousel from './carousel'

const CarouselExample: React.FunctionComponent = () => {

  const imgs = [
    {
      src: 'https://ahs-flhs.oss-cn-hangzhou.aliyuncs.com/uat/operators/63f32e0182924f549943581d40fe7521jpeg',
      name: '1',
    },
    {
      src: 'https://ahs-flhs.oss-cn-hangzhou.aliyuncs.com/uat/operators/9b39ce275e554e22ba25b4e281292195png',
      name: '2',
    },
    {
      src: 'https://ahs-flhs.oss-cn-hangzhou.aliyuncs.com/uat/operators/ec596572edf445659b6ae80ba6fc51bapng',
      name: '3',
    },
    {
      src: 'https://ahs-flhs.oss-cn-hangzhou.aliyuncs.com/uat/operators/49d275692aa3426799dd12efea7f47a5jpeg',
      name: '4',
    }
  ]

  return (
    <div style={{ height: '100%', width: '100%', border: '1px solid' }}>
      <div style={{ height: 400, width: 400, border: '1px solid' }}>
        <Carousel
          imgs={imgs}
          current={0}
        />
      </div>
    </div>

  )
}

export default CarouselExample
