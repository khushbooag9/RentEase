import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PropertyDetails.css'

export default function L_PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    useEffect(() => {
        axios.get(`/l_properties/${id}`).then(response => {
            setProperty(response.data);
        });
    }, [id]);

    if (!property) return <div>Loading...</div>;


    return (
        <div className="p-10 pt-4">
            <div className="bg-white rounded-md shadow-2xl p-4 pt-1 max-w-7xl ml-52 mr-52">
                <h1 className="text-5xl font-bold mt-2 ml-2">{property.name}</h1>
                <p className="text-sm text-gray-500 ml-2 mt-2">Added on: {new Date(property.date_added).toLocaleDateString()}</p>
                {property.image && (
                    <img src={`http://localhost:4000${property.image}`} alt="Property" className="prop_img object-cover rounded-md mt-4" />
                )}

                <p className="text-lg mt-2 font-semibold">Location: {property.address}</p>
                <p className="text-lg font-semibold">Price: ₹{property.price}/-</p>

                <p className="mt-4 p-2 border-4 mr-60">{property.description}</p>

            </div>
        </div>
    );
}