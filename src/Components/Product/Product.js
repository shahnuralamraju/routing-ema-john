import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    // console.log(props);
    const {img, name, seller, price, stock, key} = props.product;
    const handleProduct = props.handleProduct;
  
    return (
        <div className="product-div">
            {props.showAddToCart && <div className="img-div">
                <img src={img} alt="" />
            </div>}
            <div className="info-div">
                <h6><Link to={"/product/"+key}>{name}</Link></h6>
                <p>by: {seller}</p>
                <h6>$ {price}</h6>
                <p>Only {stock} left in Stock</p>
                {props.showAddToCart && <button  onClick={() =>
                     handleProduct(props.product)}  className="main-button">
                         <FontAwesomeIcon icon={faShoppingCart} />Add To Cart</button>}
            </div>
        </div>
    );
};

export default Product;