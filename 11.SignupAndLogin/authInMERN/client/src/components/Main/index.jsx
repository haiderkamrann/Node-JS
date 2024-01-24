import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
	const [file, setFile] = useState(null);
	const [images, setImages] = useState([]);
	const [toggle, setToggle] = useState()
	useEffect(() => {
		// Fetch images when the component mounts
		fetchImages();
		if (images.length !== 1) {
			setToggle(true)
		} else if (images.length >= 1) {
			setToggle(false)
		}
	}, [images.length]);
	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};
	const handleUpload = async () => {
		const formData = new FormData();
		formData.append('image', file);
		try {
			await axios.post('http://localhost:5713/api/users/upload',formData);
			console.log('Image uploaded successfully');
			// Fetch updated images after upload
			fetchImages();
			if (!images) {
				setToggle(true)
			}
			else {
				setToggle(false)
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	};
	const fetchImages = async () => {
		try {
			const response = await axios.get('http://localhost:5713/api/users/images');
			setImages(response.data);
		} catch (error) {
			console.error('Error fetching images:', error.message);
		}
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	return (
		<>
			<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<h1>Hello new User!</h1>
					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>
				</nav>
			</div>
			<div className={styles.uploaded_images}>
				{toggle && <div>
					<input type="file" onChange={handleFileChange} />
					<button className={styles.black_btn} onClick={handleUpload}>Upload Image</button>
				</div>}
				<div>
					<h2>Uploaded Images</h2>
					<div>
						{console.log(images)}
						{images.map((image) => (
							// Add a conditional check for image.filename
							image.filename ? (
								<img
									key={image._id}
									src={`http://localhost:5713/uploads/${image.filename}`}
									alt={image.filename}
									style={{ width: '150px', height: '150px', margin: '10px' }}
								/>
							) : null
						))}
					</div>
				</div>
			</div>
		</>
	);
};
export default Main;