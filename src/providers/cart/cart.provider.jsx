import React, {useContext,useState,useEffect} from 'react'

import {addItemToCart, removeItemFromCart, filterItemFromCart, getCartItemsCount} from './cart.utils'

export const CartContext = createContext({
    hidden:true,
    toggleHidden: ()=>{},
    cartItems:[],
    addItem: () =>{},
    removeItem: () =>{},
    clearItemFromCart:() =>{},
    clearItemsFromCart: 0
})

export const CartProvider = ({children}) => {
// children are going to be all of the components we are wrapping
        const [hidden, setHidden] = useState(true);
        const [cartItems, setCartItems] = useState([])
        const [cartItemsCount, setCartItemsCount] = useState(0)

        const addItem = item => setCartItems(addItemToCart(cartItems,item));
        const removeItem = item =>setCartItems(removeItemFromCart(cartItems,item))
        // calling set cart items on new array for all the new items we want to update to
        const toggleHidden = () => setHidden(!hidden);
        const clearItemFromCart = item => setCartItems(filterItemFromCart(cartItems,item))

        useEffect(() =>{
            setCartItemsCount(getCartItemsCount(cartItems))
        },[cartItems])
    return(
        <CartContext.CartProvider
            value={{
                toggleHidden,
                addItem,
                removeItem,
                clearItemFromCart,
                hidden,
                cartItems,
                cartItemsCount
            }}
        >
            {children}
        </CartContext.CartProvider>
    )
}

export default CartProvider;