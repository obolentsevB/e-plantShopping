import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: 15 },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: 12 }
            ]
        },
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", image: "https://cdn.pixabay.com/photo/2014/07/27/20/29/landscape-403161_1280.jpg", cost: 20 },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", cost: 15 }
            ]
        },
        {
            category: "Low Maintenance",
            plants: [
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283036_1280.jpg", cost: 10 },
                { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/pothos-3816941_1280.jpg", cost: 18 }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const isAdded = (name) => cart.some(item => item.name === name);

    return (
        <div>
            <nav className="navbar">
                <div className="nav-logo" onClick={() => window.location.reload()}>Paradise Nursery</div>
                <div className="nav-links">
                    <span onClick={() => setShowCart(false)}>Plants</span>
                    <div className="cart-icon-container" onClick={() => setShowCart(true)}>
                        <i className="fa fa-shopping-cart"></i>
                        <span className="cart-count">{totalItems}</span>
                    </div>
                </div>
            </nav>

            {!showCart ? (
                <div className="product-listing">
                    {plantsArray.map(cat => (
                        <div key={cat.category}>
                            <h2 className="category-title">{cat.category}</h2>
                            <div className="plant-grid">
                                {cat.plants.map(plant => (
                                    <div className="plant-card" key={plant.name}>
                                        <img src={plant.image} alt={plant.name} className="plant-image" />
                                        <h3>{plant.name}</h3>
                                        <p>${plant.cost}</p>
                                        <button 
                                            className="add-to-cart-btn"
                                            disabled={isAdded(plant.name)}
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {isAdded(plant.name) ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
