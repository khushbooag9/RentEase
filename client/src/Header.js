import {Link, useNavigate } from 'react-router-dom';
import logo from './Logo.png';
import './Header.css'

export default function Header() {

    const navigate = useNavigate();

    const handleChange = (event) => {
        const value = event.target.value;
        if (value === "tenant") {
            navigate('/TenantRegister');
        } else if (value === "landlord") {
            navigate('/LandlordRegister');
        }
    };
    return(
    <header>
        <div class="logo">
            <img src={logo} alt="logo" className='w-12 h-12' />
            <span class="heading">RentEase</span>
        </div>
        <div class='right'>
            <Link to={'/login'}>Login</Link>
            <span> | </span>
            <select defaultValue="" onChange={handleChange}>
                <option value="" disabled>Register</option>
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord</option>
            </select>
        </div>
    </header>
    );
}