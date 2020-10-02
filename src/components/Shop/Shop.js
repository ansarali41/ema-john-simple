import React, { useState, useEffect } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://serene-sea-11369.herokuapp.com/products')
        .then( response => response.json())
        .then(data =>setProducts(data))
    },[])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://serene-sea-11369.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(response => response.json())
        .then(data => setCart(data))
    },[])
    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        // console.log(cart);
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        // console.log(product,"added key: ",toBeAddedKey, 'find same product: ',sameProduct);

        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others,sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product key={pd.key} handleAddProduct={handleAddProduct} product={pd} showAddToCart={true}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                    <button className="main-button">Review order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;