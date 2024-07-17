import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    name: '',
    address: '',
    price: '',
    description: '',
    image: null, // Add the image field here
  });

  useEffect(() => {
    console.log('Property ID:', id); // Log the ID to confirm it's being received
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageChange = (e) => {
    setProperty({ ...property, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', property.name);
    formData.append('address', property.address);
    formData.append('price', property.price);
    formData.append('description', property.description);
    if (property.image) {
      formData.append('image', property.image);
    }

    console.log('Form data being sent:', property);

    const requestUrl = `/properties/${id}`;

    try {
      const response = await axios.put(requestUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Property updated:', response.data);
      alert('Property updated successfully');
      navigate('/LandlordPage'); // Redirect to the landlord page or another appropriate page
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Error updating property. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mt-5 mb-8 mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Property Name:</label>
          <input type="text" id="name" name="name" value={property.name} onChange={handleInputChange} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea id="description" name="description" value={property.description} onChange={handleInputChange} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
          <input type="text" id="address" name="address" value={property.address} onChange={handleInputChange} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
          <input type="number" id="price" name="price" value={property.price} onChange={handleInputChange} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-900 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProperty;
