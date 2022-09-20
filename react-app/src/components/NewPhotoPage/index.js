
import './NewPhotoPage.css'
import { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { postPhoto } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import Dropzone from 'react-dropzone';

export default function NewPhotoPage() {
    const fileInput = useRef(null);
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [albums, setAlbums] = useState([]);
    const [errors, setErrors] = useState([]);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [fileError, setFileError] = useState(false);
    const [showTextForm, setShowTextForm] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);

    const location = useLocation()


    const handleSubmit = async (e) => {
        if (disableSubmit) return
        setDisableSubmit(true);

        const photo = {
            image_url: imageUrl,
            title,
            description,
            album_ids: albums
        }
        await dispatch(postPhoto(photo))
            .then((res) => location.pathname.includes(sessionUser.username))
        closeModal()
    };
    }

    return (
        <div className='upload-page'>
            <div className="upload-container">
                <div className="heading-container">
                    <h3 className="upload-heading-1">You can upload photos by clicking below</h3>
                </div>
                <div className="upload-body">
                    {/* <div className="upload-icon-container"
                    onClick={handleSimulateClick}
                >
                    <i className="fa-solid fa-up-from-line"></i>
                </div>
                <h3 className="upload-heading-2">
                or
                </h3> */}
                    <button
                        className="choose-file-btn"
                        onClick={handleSimulateClick}
                    >
                        Choose photos to upload
                    </button>
                    <input
                        type='file'
                        onChange={handleSubmit}
                        ref={fileInput}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
        </div>
    )
}
