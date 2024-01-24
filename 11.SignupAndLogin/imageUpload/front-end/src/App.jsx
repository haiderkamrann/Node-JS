// ImageUploader.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images when the component mounts
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      await axios.post('http://localhost:3001/upload', formData); // Corrected URL
      console.log('Image uploaded successfully');
      // Fetch updated images after upload
      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error.message); // Log the error message
    }
  };
  

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>

      <div>
        <h2>Uploaded Images</h2>
        <div>
          {images.map((image) => (
            <img
              key={image._id}
              src={`http://localhost:3001/uploads/${image.filename}`}
              alt={image.filename}
              style={{ width: '150px', height: '150px', margin: '10px' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
