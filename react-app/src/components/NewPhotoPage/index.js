
import './NewPhotoPage.css'
import { useState, useEffect, useRef} from "react";
import { Redirect} from "react-router-dom";
import { postPhoto } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";

const NewPhotoPage = () => {
    const fileInput = useRef(null);
    const dispatch = useDispatch();
    // const handleSimulateClick = () => { fileInput.current.click()

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

    return (
        <div className="upload-container">
            {/* <div className="heading-container">
                <h3 className="upload-heading">You can upload photos here.</h3>
            </div>
            <div className="upload-body">
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
            </div> */}
        </div>
    )
}


export default NewPhotoPage;
