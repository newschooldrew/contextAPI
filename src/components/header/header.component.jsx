import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

import {auth} from '../../firebase/firebase.utils'
import { ReactComponent as Logo } from '../../assets/myLogo.svg';
import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selectors'

const Header = ({currentUser,hidden}) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                Shop
            </Link>
            <Link className='option' to='/contact'>
                Contact
            </Link>            
        {currentUser ?
        <div className='option' onClick={()=> auth.signOut()}>Sign out</div>   
        :(
        <Link 
        className='option'
        to='/signin'>Sign In</Link>
        )}
        <CartIcon />
    </div>
    {hidden ? null: (
        <CartDropdown />
    )
    }
</div>
)

const mapStateToProps = createStructuredSelector({
    //createStructuredSelector bundles up all of selectors
    // and it will automatically pass in state to each selector
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
    // we get the user from root-reducer.js
    // user: userReducer
    // and userReducer returns currentUser
    // we pass in currentUser in Header component
})

export default connect(mapStateToProps)(Header);