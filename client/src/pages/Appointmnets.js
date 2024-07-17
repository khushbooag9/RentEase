import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentCard from './AppointmentCard'; // Assuming you have a component for displaying each appointment card
import './Appointments.css'; // Assuming you have a CSS file for styling

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    
    useEffect(() => {
        // Fetch appointments for the current landlord's houses
        fetchAppointments();
    }, []); // Empty dependency array ensures this runs once on component mount
    
    const fetchAppointments = async () => {
        try {
            // Replace 'http://localhost:4000/appointments' with your backend endpoint
            const response = await axios.get('http://localhost:4000/appointments');
            setAppointments(response.data); // Assuming the response.data is an array of appointments
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };
    
    const handleAccept = async (appointmentId) => {
        try {
            // Example of updating appointment status to 'Accepted'
            await axios.put(`http://localhost:4000/appointments/${appointmentId}`, { status: 'Accepted' });
            fetchAppointments(); // Refresh appointments after update
        } catch (error) {
            console.error('Error accepting appointment:', error);
        }
    };
    
    const handleDelay = async (appointmentId, delayReason, postponeDate, postponeTime) => {
        try {
            // Example of updating appointment status to 'Delayed' and providing delay details
            await axios.put(`http://localhost:4000/appointments/${appointmentId}`, {
                status: 'Delayed',
                delayReason,
                postponeDate,
                postponeTime
            });
            fetchAppointments(); // Refresh appointments after update
        } catch (error) {
            console.error('Error delaying appointment:', error);
        }
    };

    return (
        <div className="appointments_container">
            <h2 className="appointments_title">Appointments for Your Properties</h2>
            {appointments.length === 0 ? (
                <p>No appointments scheduled for your properties.</p>
            ) : (
                appointments.map(appointment => (
                    <AppointmentCard
                        key={appointment._id} // Adjust this based on your appointment data structure
                        appointment={appointment}
                        onAccept={() => handleAccept(appointment._id)}
                        onDelay={(delayReason, postponeDate, postponeTime) =>
                            handleDelay(appointment._id, delayReason, postponeDate, postponeTime)
                        }
                    />
                ))
            )}
        </div>
    );
}
