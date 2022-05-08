import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'

const HeroBanner = ({item}) => {
  console.log('item', item)
  return (
    <div className='hero-banner-container'>
      <div>
        <p className="beats-solo">{item?.smallText}</p>
        <h3>{item?.midText}</h3>
        <h1>{item?.largeText1}</h1>
        <img src={urlFor(item?.image)} alt="headphones" className='hero-banner-image'/>

        <div>
          <Link href={`/product/${item?.product}`}>
            <button type='button'>{item?.buttonText}</button>
          </Link>

          <div className="desc">
            <h5>
              Description
            </h5>
            <p>{item?.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner