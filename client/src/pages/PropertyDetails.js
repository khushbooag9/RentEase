import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PropertyDetails.css'

export default function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        axios.get(`/properties/${id}`).then(response => {
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

                <div className="mt-4 pt-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Book and Pay */}
                    <div className="bg-slate-100 rounded-md shadow-xl shadow-violet-300 p-4">
                        <p className="text-lg font-light">
                        Excited about this house? Secure it now before it's gone! Click 'Booking' below to reserve it. After booking, you can easily pay your first month's rent and finalize your move-in. Don't miss out on your dream home!
                        </p>
                        <div className="mt-3 flex justify-center">
                            <Link to="/Booking" className="bg-purple-500 text-white  w-24 px-4 py-2 rounded mr-2 hover:bg-purple-600 hover:text-green-950">
                                Booking
                            </Link>
                            <Link to="/Payment" className="bg-purple-500 text-white w-24 px-4 py-2 rounded hover:bg-purple-600 hover:text-green-950">
                                Payment
                            </Link>
                        </div>
                    </div>

                    {/* Card 2: Book Appointment */}
                    <div className="bg-slate-100 rounded-md shadow-xl shadow-violet-300 p-4">
                        <p className="text-lg font-light">
                        Still unsure or have questions? No problem! Schedule a convenient appointment to visit the house and clear all your doubts firsthand. The landlord will accept or delay your appointment asap!
                        </p>
                        <div className="mt-3 flex justify-center">
                            <Link to="/Appointment" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 hover:text-green-950">
                                Book an Appointment
                            </Link>
                        </div>
                    </div>

                    {/* Card 3: Give Feedback */}
                    <div className="bg-slate-100 rounded-md shadow-xl shadow-violet-300 p-4">
                        <p className="text-lg font-light">
                        Your feedback is invaluable! Share your experience and insights to assist fellow tenants in making informed decisions. Your review makes a difference – help us build a community of informed renters!
                        </p>
                        <div className="mt-3 flex justify-center">
                            <Link to="/Feedback" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 hover:text-green-950">
                                Give Your Feedback
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
