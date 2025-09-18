import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storeStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'marketplace_stores',
        allowed_formats: ['jpeg', 'jpg', 'png'],
        public_id: (req, file) => `store-${req.user.id}-${Date.now()}`,
    },
});

const productStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'marketplace_products',
        allowed_formats: ['jpeg', 'jpg', 'png'],
        public_id: (req, file) => `product-${req.user.id}-${Date.now()}`,
    },
});

const userStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'user_avatars',
        allowed_formats: ['jpeg', 'jpg', 'png'],
        // Overwrite avatar with the same name for simplicity
        public_id: (req, file) => `user-avatar-${req.user.id}`,
    },
});


export const uploadStoreImage = multer({ storage: storeStorage }).single('image');

// For multiple product images
export const uploadProductImages = multer({ storage: productStorage }).array('images', 5);

// For a single user avatar
export const uploadUserAvatar = multer({ storage: userStorage }).single('avatar');