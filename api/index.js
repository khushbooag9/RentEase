const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const tenant = require('./models/tenant');
const landlord = require('./models/Landlord');
const Property = require('./models/Property');
const multer = require('multer');
const path = require('path');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: true,
}));

mongoose.connect('mongodb://localhost:27017/HousingRentalDB');

app.get('/test', (req, res) => {
    res.json('test ok');
});

// Appointment model
const appointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneno: String,
    selhouse: String,
    date: String,
    time: String,
    additionalRequest: String
}, { collection: 'Appointments' });

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Appointment Route
app.post('/Appointment', async (req, res) => {
    const { name, email, phoneno, selhouse, date, time, additionalRequest } = req.body;

    try {
        const appointmentDoc = await Appointment.create({
            name,
            email,
            phoneno,
            selhouse,
            date,
            time,
            additionalRequest
        });
        res.json(appointmentDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

// Booking model
const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    property: String,
    checkIn: Date,
    checkOut: Date
}, { collection: 'Booking' });

const Booking = mongoose.model('Booking', bookingSchema);

// Booking Route
app.post('/booking', async (req, res) => {
    const { name, email, phone, property, checkIn, checkOut } = req.body;

    try {
        const bookingDoc = await Booking.create({
            name,
            email,
            phone,
            property,
            checkIn,
            checkOut
        });
        res.json(bookingDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

// Feedback model
const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    rating: Number,
    comments: String
}, { collection: 'Feedback' });

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Feedback Route
app.post('/feedback', async (req, res) => {
    const { name, email, rating, comments } = req.body;

    try {
        const feedbackDoc = await Feedback.create({
            name,
            email,
            rating,
            comments
        });
        res.json(feedbackDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

// Tenant Register Route
app.post('/TenantRegister', async (req, res) => {
    const { name, email, password, address, phone_no } = req.body;

    try {
        const tenantDoc = await tenant.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            address,
            phone_no,
        });
        res.json(tenantDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

// Landlord Register Route
app.post('/LandlordRegister', async (req, res) => {
    const { name, email, password, address, phone_no } = req.body;

    try {
        const landlordDoc = await landlord.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            address,
            phone_no,
        });
        res.json(landlordDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password, userType } = req.body;
    try {
        let user;
        if (userType === 'Tenant') {
            user = await tenant.findOne({ email });
        } else if (userType === 'Landlord') {
            user = await landlord.findOne({ email });
        }

        if (!user) {
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(422).send('Incorrect password');
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Login failed. Please try again later.');
    }
});

// Properties Route
app.get('/properties', async (req, res) => {
    try {
        const { sort, limit, featured } = req.query;

        let query = {};
        if (featured) {
            query.featured = featured === 'true';
        }

        let properties = await Property.find(query)
            .sort(sort ? { [sort]: -1 } : {})
            .limit(limit ? parseInt(limit) : 0)
            .lean();

        const safeProperties = properties.map(prop => ({
            image: prop.image,
            description: prop.description,
            address: prop.address,
            price: prop.price,
            name: prop.name,
            _id: prop._id.toString(),
            date_added: prop.date_added // Ensure date_added is included if you need it on the frontend
        }));

        res.json(safeProperties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).send('Server Error');
    }
});


// Fetch a single property by ID
app.get('/properties/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).lean();
        if (!property) {
            return res.status(404).send('Property not found');
        }
        const safeProperty = {
            image: property.image,
            description: property.description,
            address: property.address,
            price: property.price,
            name: property.name,
            date_added: property.date_added,
            _id: property._id.toString()
        };
        res.json(safeProperty);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).send('Server Error');
    }
});

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

// File filter function to accept only .png and .jpg files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Only .png, .jpg, or .jpeg files are allowed!'), false);
    }
};

const upload = multer({
    fileFilter: fileFilter,
    storage: storage
});

module.exports = upload;

// Add property route
app.post('/properties/add', upload.single('image'), async (req, res) => {
    try {
        const { name, description, address, price, landl_name } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const newProperty = new Property({
            image,
            name,
            description,
            address,
            price,
            landl_name,
            date_added: new Date(),
            featured: false
        });

        await newProperty.save();
        res.status(201).json({ message: 'Property added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


// Middleware to handle JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.put('/properties/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  console.log('Update request received for property ID:', id);
  console.log('Update data:', updateData);

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      console.log('Property not found');
      return res.status(404).send('Property not found');
    }

    console.log('Updated property:', updatedProperty);
    res.json(updatedProperty); // Respond with the updated property details
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).send('Server error');
  }
});

// Delete property by ID
app.delete('/properties/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Property.findByIdAndDelete(id);
        res.status(200).send('Property deleted successfully');
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

