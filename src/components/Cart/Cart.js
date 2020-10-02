import React from 'react';

const cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    // const total = cart.reduce((total, prd) => total + prd.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        // console.log(product.price, product.quantity);
        total = total + product.price * product.quantity || 1;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }

    const tax = (total / 1.5).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    return (
        <div>
            <h4 className="text-success">Order Summery: </h4>
            <h5>Product Price:{total.toFixed(2)}</h5>
            <p>Items ordered: {cart.length}</p>
            <p> <small>Shipping Cost: {shipping}$</small></p>
            <p><small>Tax+VAT:{tax}</small></p>
            <p>Total Price: ${grandTotal}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default cart;