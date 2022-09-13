
import './NewPhotoPage.css'
import { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { postPhoto } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";

export default function NewPhotoPage() {
    const fileInput = useRef(null);
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [albums, setAlbums] = useState([]);
    const [errors, setErrors] = useState([]);


    const handleUpload = async (e) => {
        e.preventDefault();
        const photo = {
            image_url: imageUrl,
            title,
            description,
            album_ids: albums,
        }

        const data = await dispatch(postPhoto(photo));

        if (data) setErrors(data);
    }
    const handleSimulateClick = () => { fileInput.current.click() }
    return (
        <div className="upload-container">
            <div className="heading-container">
                <h3 className="upload-heading">You can upload photos by clicking here</h3>
            </div>
            <div className="upload-body">
                <div className="upload-icon-container"
                    onClick={handleSimulateClick}
                >
                    <i className="fa-solid fa-up-from-line"></i>
                </div>
                <h3 className="upload-heading">
                or
                </h3>
                <button
                    className="choose-file-btn"
                    onClick={handleSimulateClick}
                >
                    Choose photos to upload
                </button>
                <input
                    type='file'
                    onChange={handleUpload}
                    ref={fileInput}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    )
}
