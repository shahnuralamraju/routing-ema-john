import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
const Review = () => {
   const [cart, setCart] = useState([]);
  const [orderPlaced,setOrderPlaced] = useState(false);
  const handlePlaceOrder = () => {
    //   console.log('click');
      setCart([]);
      setOrderPlaced(true);
      processOrder();
      
  }
  
  
  
  
   const removeProduct = (productKey) =>{
    //    console.log('click', productKey);
       const newCart = cart.filter(pd=> pd.key !== productKey)
       setCart(newCart);
       removeFromDatabaseCart(productKey);
   }
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // console.log(savedCart)

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
            
        })
        // console.log(productKeys, counts)
        setCart(cartProducts);
        // console.log(cartProducts);
    }, [])

    let g;
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt="" />
        g =<h1>You Successfully Placed Your Order</h1>
    }
    return (
     
        <div className="shop-container">
            <div className="blank-div"></div>
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem product={pd} 
                        removeProduct ={removeProduct} key={pd.key}></ReviewItem>)

                }
                {[thankYou, g]}
                 
            </div>
            <div className="cart-div">
                <Cart cart={cart}>
                    <button style={{marginLeft:'70px'}} onClick={handlePlaceOrder} 
                    className='main-button'><FontAwesomeIcon icon={faCheckSquare}/> Place Order</button>
                </Cart>
            </div>

        </div>

    );
};

export default Review;