import React, { useState } from 'react';
import axios from 'axios';
import './Appointment.css';

export default function Appointment() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneno: '',
        selhouse: '',
        date: '',
        time: '',
        additionalRequest: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/appointment', formData);
            alert('Your appointment request has been sent! The Landlord of this property will contact you shortly.');
            setFormData({
                name: '',
                email: '',
                phoneno: '',
                selhouse: '',
                date: '',
                time: '',
                additionalRequest: ''
            });
        } catch (error) {
            console.error('Error submitting appointment:', error);
            alert('There was an error sending your appointment request. Please try again.');
        }
    };

    return (
        <div className="app_container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <h2 className="title">BOOK AN APPOINTMENT</h2>
                        <div className="inputBox">
                            <span>User Name:</span>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Khushi" />
                        </div>
                        <div className="inputBox">
                            <span>Email:</span>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="abc@example.com" />
                        </div>
                        <div className="inputBox">
                            <span>Phone no:</span>
                            <input type="text" name="phoneno" value={formData.phoneno} onChange={handleChange} placeholder="1234567890" />
                        </div>
                        <div className="inputBox">
                            <span>Select House:</span>
                            <input type="text" name="selhouse" value={formData.selhouse} onChange={handleChange} />
                        </div>
                        <div className="inputBox">
                            <span>Visiting Date:</span>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} id="Visiting-date" />
                        </div>
                        <div className="inputBox">
                            <span>Visiting Time:</span>
                            <input type="time" name="time" value={formData.time} onChange={handleChange} id="Visiting-time" />
                        </div>
                        <div className="inputBox">
                            <span>Additional Request:</span>
                            <input type="text" name="additionalRequest" value={formData.additionalRequest} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="login_btn submit-btn">SUBMIT</button>
            </form>
        </div>
    );
}
