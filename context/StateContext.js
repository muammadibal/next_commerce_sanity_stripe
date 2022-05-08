import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct, index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems?.find(item => item?._id === product?._id)

        setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
        setTotalQty(prevTotalQty => prevTotalQty + quantity)

        if (checkProductInCart) {
            const updateCartItems = cartItems?.map(product => {
                if (product._id === product._id)
                    return {
                        ...product,
                        quantity: product.quantity + quantity
                    }
            })

            setCartItems(updateCartItems)
        } else {
            product.quantity = quantity
            setCartItems([...cartItems, { ...product }])
        }
        toast.success(`${qty} ${product.name} added to cart.`)
    }

    const onRemove = (product) => {
        foundProduct = cartItems?.find(item => item._id === product._id)
        const newCartItems = cartItems?.filter(item => item._id !== product._id)
        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQty(prevTotalQty => prevTotalQty - foundProduct.quantity)
        setCartItems(newCartItems)
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems?.find(item => item._id === id)
        index = cartItems.findIndex(product => product._id === id)
        // const newCartItems = cartItems.splice(index, 1) // it means remove item at index or remove start at index only one item

        const newCartItems = cartItems?.filter(item => item._id !== id)

        if (value === 'inc') {
            setCartItems([
                ...newCartItems,
                {
                    ...foundProduct,
                    quantity: foundProduct.quantity + 1
                }
            ])
            setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
            setTotalQty(prevTotalQty => prevTotalQty + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([
                    ...newCartItems,
                    {
                        ...foundProduct,
                        quantity: foundProduct.quantity - 1
                    }
                ])
                setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
                setTotalQty(prevTotalQty => prevTotalQty - 1)
            }
        }
    }

    const incQty = () => {
        setQty(prevQty => prevQty + 1)
    }

    const decQty = () => {
        setQty(prevQty => {
            if (prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }

    return <Context.Provider
        value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQty,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            setTotalPrice,
            setCartItems,
            setTotalQty
        }}>
        {children}
    </Context.Provider>
}

export const useStateContext = () => useContext(Context)