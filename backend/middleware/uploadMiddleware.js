import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary with credentials from your .env file
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'marketplace_stores', // A folder name in your Cloudinary account
        allowed_formats: ['jpeg', 'jpg', 'png'],
        // A function to generate a unique public_id (filename) for each image
        public_id: (req, file) => `store-${req.user.id}-${Date.now()}`,
    },
});

// Initialize multer with the Cloudinary storage engine
export const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 }, // Optional: 2MB file size limit
}).single('image'); // 'image' is the field name from the frontend form