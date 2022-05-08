import React, {useState} from 'react'
import { urlFor, client } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({ product, products }) => {
    const [index, setIndex] = useState(0)
    const { image, details, name, price } = product
    const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext()

const handleBuyNow = () => {
    onAdd(product, qty)
    setShowCart(true)
}
    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img src={urlFor(image && image[index])} className='product-detail-image'/>
                    </div>

                    <div className='small-images-container'>
                        {
                            image?.map((item, i) => {
                                return <img key={i} src={urlFor(item)}
                                    className={i === index ? 'small-image selected-image' : 'small-image'}
                                    onMouseEnter={()=> setIndex(i)}
                                />
                            })
                        }
                    </div>
                </div>

                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>

                    <h4>Details : </h4>
                    <p>{details}</p>
                    <p className='price'>${price}</p>

                    <div className='quantity'>
                        <h3>Quantity : </h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={incQty}><AiOutlinePlus/></span>
                        </p>
                    </div>

                    <div className='buttons'>
                        <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to cart</button>
                        <button type='button' className='buy-now' onClick={() => handleBuyNow()}>Buy Now!</button>
                    </div>
                </div>
            </div>

            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>

                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {products.map(item => {
                            return <Product item={item} key={item._id}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const productsQuery = '*[_type == "product"]'

    const products = await client.fetch(productsQuery)

    // Get the paths we want to pre-render based on posts
    const paths = products.map((post) => {
        // console.log('params', post.slug.current)
        return {
            params: { slug: post.slug.current }
        }
    })

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: 'blocking' }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(productQuery)
    const products = await client.fetch(productsQuery)

    return {
        props: {
            product,
            products,
        }
    }
}

export default ProductDetails