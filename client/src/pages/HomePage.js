import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import SearchBar from './SearchBar';

export default function HomePage() {
    const [recentProperties, setRecentProperties] = useState([]);
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [noPropertiesMessage, setNoPropertiesMessage] = useState('');

    useEffect(() => {
        // Fetch recently added properties
        axios.get('/properties?sort=date_added&limit=10').then(response => {
            setRecentProperties(response.data);
            setFilteredProperties(response.data);
        });

        // Fetch featured properties
        axios.get('/properties?featured=true').then(response => {
            setFeaturedProperties(response.data);
        });
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = recentProperties.filter(property => 
            property.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProperties(filtered);
        if (filtered.length === 0) {
            setNoPropertiesMessage("Sorry, we don't have any vacant properties in your selected location at the moment. Please try searching in a different area, or contact us for more information.");
        } else {
            setNoPropertiesMessage('');
        }
    };

    const handleCardClick = () => {
        alert('Please Login for further information and better experience :)');
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <h3 className="card_heading">Recently Added Properties</h3>
            {noPropertiesMessage && (
                <div className="w-full text-center text-red-500 text-lg font-semibold">
                    {noPropertiesMessage}
                </div>
            )}
            <div className="flex gap-5 w-full overflow-x-auto scrollbar-hide p-4 bg-gray-300">
                {filteredProperties.length > 0 && filteredProperties.map(property => (
                    <div
                        key={property._id}
                        className="min-w-[20rem] h-96 w-80 bg-white rounded-md flex-shrink-0 cursor-pointer"
                        onClick={handleCardClick}
                    >
                        <div className="p-1 w-full">
                            {property.image && (
                                <img src={`http://localhost:4000${property.image}`} alt="Property" className="h-72 w-full object-cover" />
                            )}
                        </div>
                        <div className="p-1 ml-1 mt-0 font-semibold">
                            {property.name}<br />
                            {property.address}<br />
                            ₹{property.price}/-
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h3 className="card_heading">Featured Owner Properties</h3>
                <div className="flex gap-5 w-full overflow-x-auto scrollbar-hide p-4 bg-gray-300">
                    {featuredProperties.length > 0 && featuredProperties.map(property => (
                        <div
                            key={property._id}
                            className="min-w-[20rem] h-96 w-80 bg-white rounded-md flex-shrink-0 cursor-pointer"
                            onClick={handleCardClick}
                        >
                            <div className="p-1 w-full">
                                {property.image && (
                                    <img src={`http://localhost:4000${property.image}`} alt="Property" className="h-72 w-full object-cover" />
                                )}
                            </div>
                            <div className="p-1 ml-1 mt-0 font-semibold">
                                {property.name}<br />
                                {property.address}<br />
                                ₹{property.price}/-
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


