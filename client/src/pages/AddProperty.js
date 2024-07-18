import React, { useState } from 'react';
import axios from 'axios';
const AddProperty = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [landl_name, setLandName] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rooms, setRooms] = useState('');
  const [area, setArea] = useState('');
  const [resources, setResources] = useState('');
  const [amenities, setAmenities] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById('image-preview').src = reader.result;
      document.getElementById('image-preview').style.display = 'block';
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const generateDescription = async (e) => {
    e.preventDefault();

    
    // const formData = new FormData();
    // formData.append('landl_name', landl_name);
    // formData.append('image', image);
    // formData.append('name', name);
    // formData.append('address', address);
    // formData.append('price', price);
    // formData.append('rooms', rooms);
    // formData.append('amenities', amenities);
    // formData.append('area', area);
    // formData.append('resources', resources);

    try {
      console.log(landl_name, name, address, price, rooms, amenities, area, resources);
      const description = await axios.post('http://localhost:4000/description', {
        address, rooms, area, amenities, resources, price
      })
      // console.log(await description.json());
      setDescription(description.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('landl_name', landl_name);
    formData.append('image', image);
    formData.append('name', name);
    formData.append('address', address);
    formData.append('price', price);
    formData.append('rooms', rooms);
    formData.append('amenities', amenities);
    formData.append('area', area);
    formData.append('resources', resources);
    formData.append('description', description);

    try {
      

      

      const response = await fetch('http://localhost:4000/properties/add', {
        method: 'POST',
        body: formData,
      });
      console.log(await response.json());

      if (!response.ok) {
        throw new Error('Failed to add property');
      }

      alert('Property added successfully');
      // setLandName('');
      // setAddress('');
      // setPrice('');
      // setRooms('');
      // setAmenities('');
      // setResources('');
      // setArea('');
      // setImage(null);
      document.getElementById('image-preview').style.display = 'none'; 

    } catch (error) {
      console.error('Error:', errorMessage);
      setErrorMessage('Error adding property');
    }
  };

  return (
    <div className="max-w-2xl mt-5 mb-8 mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
      <form encType="multipart/form-data" className="space-y-4">
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          <img id="image-preview" src="#" alt="Preview" style={{ display: 'none', maxWidth: '200px', marginTop: '10px' }} className="mt-2 rounded-md shadow-md" />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700"> Your Name:</label>
          <input type="text" id="landl_name" name="landl_name" value={landl_name} onChange={(e) => setLandName(e.target.value)} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Property Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
          <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
          <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">No. of Rooms:</label>
          <input type="number" id="rooms" name="rooms" value={rooms} onChange={(e) => setRooms(e.target.value)} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Amenities:</label>
          <input type="text" id="amenities" name="amenities" value={amenities} onChange={(e) => setAmenities(e.target.value)} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Area:</label>
          <input type="number" id="area" name="area" value={area} onChange={(e) => setArea(e.target.value)} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Resources available:</label>
          <input type="text" id="resources" name="resources" value={resources} onChange={(e) => setResources(e.target.value)} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className='flex gap-60'>
          
        <div>
          <button className=" bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-900 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={(e) => generateDescription(e)}>Generate Description</button>
        </div>
        <div>
          <button className=" bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-900 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={(e) => handleSubmit(e)}>Add Property</button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
