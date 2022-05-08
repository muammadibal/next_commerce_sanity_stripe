import Link from 'next/link'
import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'
import Cart from './Cart'

const Navbar = () => {
  const { showCart, setShowCart, totalQty } = useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'>

        <Link href='/'>JSM Headphones</Link>
      </p>

      <button className="cart-icon" type='button' onClick={() => setShowCart(!showCart)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQty}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar