import React from 'react'
import { HeroBanner, FooterBanner, Product } from '../components'
import { client } from '../lib/client'

const Home = ({ products, banners }) => {
  return (
    <>
      {/* hero bannder */}
      <HeroBanner item={banners.length > 0 && banners[0]} />

      <div className={'products-heading'}>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className={'products-container'}>
        {products?.map(item => {
          return <Product key={item._id} item={item} />
        })}
      </div>

      {/* footer */}
      <FooterBanner item={banners && banners[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]'
  const bannerQuery = '*[_type == "banner"]'

  const products = await client.fetch(productQuery)
  const banners = await client.fetch(bannerQuery)

  return {
    props: {
      products,
      banners
    }
  }
}

export default Home