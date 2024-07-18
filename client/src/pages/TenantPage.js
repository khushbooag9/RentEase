import Footer from '../Footer';
import React from 'react';
import './TenantPage.css';
import SearchBar from './SearchBar';
import logo from './Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TenantPage() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [noPropertiesMessage, setNoPropertiesMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/properties').then(response => {
            setProperties(response.data);
            setFilteredProperties(response.data);
        });
    }, []);

    const handleCardClick = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    const handleSearch = (searchTerm) => {
        const filtered = properties.filter(property =>
            property.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProperties(filtered);
        if (filtered.length === 0) {
            setNoPropertiesMessage("Sorry, we don't have any vacant properties in your area at this moment. Please try searching in a different area, or contact us for more information");
        } else {
            setNoPropertiesMessage('');
        }
    };

    return (
        <div>
            <header className="flex justify-between items-center p-4 bg-gray-800">
                <div className="logo">
                    <img src={logo} alt="logo" className="w-12 h-12" />
                    <span className="heading">RentEase</span>
                </div>
                <div className="tenant_page_right">
                    <Link to={'/TenantPage'}>Home</Link>
                    <Link to={'/Feature'}>Features</Link>
                    <Link to={'/About'}>About</Link>
                    <Link to={'/Contact'}>Contact</Link>
                    <div
                        className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden mr-4 size-8 cursor-pointer"
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7.5 relative top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {isProfileMenuOpen && <ProfileMenu />}
                </div>
            </header>

            <SearchBar onSearch={handleSearch} />

            <div className="flex flex-wrap gap-4 w-full p-4 cursor-pointer">
                {noPropertiesMessage && (
                    <div className="w-full text-center text-red-500 text-lg font-semibold">
                        {noPropertiesMessage}
                    </div>
                )}
                {filteredProperties.length > 0 && filteredProperties.map(property => (
                    <div
                        key={property._id}
                        className="h-96 w-80 bg-white rounded-md mt-14 ml-8"
                        onClick={() => handleCardClick(property._id) }
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

            <Footer />
        </div>
    );
}
