import React, { useState } from 'react';
function useimageuploader(){

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
  
    // Function to handle the file input change
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };
  
    // Function to upload the image to Cloudinary
    const handleUpload = async () => {
      if (!image) {
        alert('Please select an image first.');
        return;
      }
  
      setLoading(true);
      const formData = new FormData();
      formData.append('file', image);
      // Replace 'react-uploads' with your actual unsigned preset name
      formData.append('upload_preset', 'Elivate6'); 
  
      try {
        // Replace 'your_cloud_name' with your actual Cloudinary cloud name
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dpe043olh/image/upload', 
          {
            method: 'POST',
            body: formData,
          }
        );
  
        const data = await response.json();
        
        // The secure_url is the URL of the uploaded image
        setImageUrl(data.secure_url);
        alert('Image uploaded successfully');
        return data.secure_url
  
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image.');
      } finally {
        setLoading(false);
      }
    };
    return [image,imageUrl,loading,handleImageChange,handleUpload]
}


export default useimageuploader;