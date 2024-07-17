import './Booking.css';
import { useState } from 'react';

export default function Booking() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        property: '',
        checkIn: '',
        checkOut: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/Booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Booking done successfully!');

            } else {
                alert('Failed to send booking request.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="booking-form">
            <h2>Book Your Stay</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="full-name">Full Name</label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    id="full-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    placeholder="Enter your Email address"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="phone">Phone Number</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="property">Select Property</label>
                <input
                    type="text"
                    id="property"
                    name="property"
                    value={formData.property}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="check-in">Check-in Date</label>
                <input
                    type="date"
                    id="check-in"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="check-out">Check-out Date</label>
                <input
                    type="date"
                    id="check-out"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className='submit-btn book-btn login_btn'>Submit Booking</button>
            </form>
        </div>
    );
}
