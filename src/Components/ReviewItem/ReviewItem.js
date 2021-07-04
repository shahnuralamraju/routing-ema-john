import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const ReviewItem = (props) => {
    // console.log(props.product);
    
    const {name, quantity, price, img, key} = props.product;
    return (
       
        <div className="product-div">
            <div className="img-div">
                <img src={img} alt="" />
            </div>
            <div className="info-div">
                <h5>{name}</h5>
                <h6>$ {price}</h6>
                <p> Quantity: {quantity}</p>
                <button onClick={() => props.removeProduct(key)} className="main-button">
                   <FontAwesomeIcon icon={faTrash} /> Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;