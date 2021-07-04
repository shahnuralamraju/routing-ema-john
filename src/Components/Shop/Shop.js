import React from 'react';
import './../Review/Review.css'
import { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const [products, setProduts] = useState([]);
    // useEffect(() => {
    //     const fakeDatas = fakeData.slice(0, 10)
    //     setProduts(fakeDatas);
    // }, [])

    const [cart, setCart] = useState([])

    useEffect(() => {
        const fakeDatas = fakeData.slice(0, 10)
        setProduts(fakeDatas);


        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        // console.log(productKeys)
        setCart(previousCart);
    }, [])
    const handleProduct = (product) => {
        // const newCart = [...cart, product]
        // setCart(newCart);
        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;
        // addToDatabaseCart(product.key, count);
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }


    return (
        <div className="shop-container">
            <div className="blank-div"></div>
            <div className="product-container">
                {
                    products.map(pd => <Product
                        product={pd}
                        handleProduct={handleProduct}
                        showAddToCart={true}
                        key={pd.key}>
                    </Product>)

                }
            </div>
            <div className="cart-div">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className='main-button review mt-2'>Order Review</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;