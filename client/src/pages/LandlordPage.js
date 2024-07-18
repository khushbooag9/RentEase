import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './Logo.png';
import Footer from '../Footer';
import L_ProfileMenu from './L_profileMenu';
import axios from 'axios';

const LandlordPage = ({ children }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(prevState => !prevState);
  };

  const handleCardClick = (propertyId) => {
    navigate(`/l_property/${propertyId}`);
};

  React.useEffect(() => {
    const fetchProperties = async () => {
        try {
            const response = await axios.get('/properties');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    fetchProperties();
}, []);

  const handleUpdateClick = (id) => {
    navigate(`/UpdateProperty/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/properties/${id}`);
      setProperties(properties.filter((property) => property._id !== id));
      alert('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Error deleting property. Please try again.');
    }
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <span className="heading">RentEase</span>
        </div>
        <div className="header-right">
          <button className='menu-button bg-inherit border-0 text-2xl text-white cursor-pointer mr-8 hover:font-semibold ' onClick={toggleProfileMenu}>☰ Menu</button>
          {isProfileMenuOpen && <L_ProfileMenu />}
        </div>
      </header>
      <main className="flex-grow p-4">
        {children}
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-6 ml-3 mb-2 rounded hover:bg-blue-600"
            onClick={() => navigate(`/AddProperty`)}
          >
            + Add new Property
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {properties.length === 0 ? (
            <p className="text-center col-span-full">No properties found.</p>
          ) : (
            properties.map(property => (
              <div key={property.id}  className="property-card bg-white shadow-md rounded-lg overflow-hidden">
                <img src={`http://localhost:4000${property.image}`} alt={property.name} className="property-image p-1 w-full h-72 object-cover" onClick={() => handleCardClick(property._id)}/>
                <div className="property-details p-3 pt-2 " onClick={() => handleCardClick(property._id)}>
                  <h3 className="property-name text-lg font-bold">{property.name}</h3>
                  <p className="property-location text-gray-600 font-semibold">{property.address}</p>
                  <p className="property-price text-gray-600 font-semibold">₹{property.price}/-</p>
                </div>
                <div className="flex justify-between px-3 pb-3">
                <button
                    onClick={() => handleUpdateClick(property._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteClick(property._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};


export default LandlordPage;

