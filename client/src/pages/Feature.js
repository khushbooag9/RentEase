// Features.js
import React from 'react';

const Features = () => {
    const features = [
        {
            title: "Search Rental Houses",
            description: "Easily search for rental houses based on your preferred location, price range, and amenities. Use our advanced filters to find the perfect home that meets all your needs.",
            icon: "🔍"
        },
        {
            title: "Book Your Rental House",
            description: "Once you find the perfect house, book it instantly through our secure online booking system. Choose your move-in date and make payments online to secure your rental quickly and easily.",
            icon: "📅"
        },
        {
            title: "Upload Your Property",
            description: "Are you a landlord or tenant with a property to rent? Upload your property details, photos, and set your rental price to reach thousands of potential renters. Manage your property listings effortlessly through our platform.",
            icon: "🏡"
        },
        {
            title: "Appointments for Visit",
            description: "If you are not sure after watching the house online, you can book an appointment and visit the house on your favorable date and time.",
            icon: "📆"
        },
        {
            title: "Personalized Choice Recommendations",
            description: "You would get recommendations according to your personalized choices and also get notifications if allowed.",
            icon: "✨"
        }
    ];

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Features of RentEase</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white shadow-md rounded-md p-6">
                        <div className="text-6xl mb-4 text-center">{feature.icon}</div>
                        <h2 className="text-2xl font-bold mb-2 text-center">{feature.title}</h2>
                        <p className="text-lg text-center">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
