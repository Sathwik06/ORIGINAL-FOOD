import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';

export default function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [search, setSearch] = useState('');

    const loadFoodItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/foodData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setFoodItems(responseData[0] || []);
            setFoodCat(responseData[1] || []);
        } catch (error) {
            console.error("Error loading food data:", error);
        }
    }

    useEffect(() => {
        loadFoodItems();
    }, []);

    // Function to filter food items by category
    const filterByCategory = (category) => {
        return foodItems.filter(item => item.CategoryName === category);
    }

    return (
        <div>
            <Navbar />
            <Carousel />
            <div className='container'>
                {/* Display Pizza section */}
                <div className='row mb-3'>
                    <div className='col-12'>
                        <h2>Pizza</h2>
                        <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                    </div>
                    {filterByCategory("Pizza").map((pizzaItem) => (
                        <div key={pizzaItem.id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodName={pizzaItem.name} item={pizzaItem} options={pizzaItem.options[0]} ImgSrc={pizzaItem.img} />
                        </div>
                    ))}
                </div>

                {/* Display Biryani/Rice section */}
                <div className='row mb-3'>
                    <div className='col-12'>
                        <h2>Biryani/Rice</h2>
                        <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                    </div>
                    {filterByCategory("Biryani/Rice").map((biryaniItem) => (
                        <div key={biryaniItem.id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodName={biryaniItem.name} item={biryaniItem} options={biryaniItem.options[0]} ImgSrc={biryaniItem.img} />
                        </div>
                    ))}
                </div>

                {/* Display Starter section */}
                <div className='row mb-3'>
                    <div className='col-12'>
                        <h2>Starter</h2>
                        <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                    </div>
                    {filterByCategory("Starter").map((starterItem) => (
                        <div key={starterItem.id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodName={starterItem.name} item={starterItem} options={starterItem.options[0]} ImgSrc={starterItem.img} />
                        </div>
                    ))}
                </div>
                </div>

            
            
            
            <Footer />
        </div>
    );
}
