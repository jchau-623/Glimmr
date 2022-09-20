
import './NewPhotoPage.css'
import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { postPhoto } from "../../store/photo";
import { getAlbums } from "../../store/album";
import { useDispatch, useSelector } from "react-redux";

export default function NewPhotoPage() {
    const history = useHistory();
    // const fileInput = useRef(null);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const photo = {
            image_url: imageUrl,
            title,
            description,
        }

        const data = await dispatch(postPhoto(photo));

        if (data) setErrors(data);
        if (!data) history.push("/photostream");
    }

    const formatError = error => {
        const startIndex = error.indexOf(":") + 1;
        return error.slice(startIndex);
    };

    if (!sessionUser) return <Redirect to="/login" />;

    // const handleSimulateClick = () => { fileInput.current.click() }
    return (
        <div className='upload-page'
        >
            <div className="upload-container">
                <div className="heading-container">
                    <h3 className="upload-heading-1">You can upload photos by completing the form below</h3>
                </div>
                <div className="upload-body">
                    <form onSubmit={onSubmit} className="photo-form">
                        <ul className="create-form-errors">
                            {errors.map(error => (
                                <li key={error}>{formatError(error)}</li>
                            ))}
                        </ul>
                        <div className="form-label-input">
                            <label className='image-url' htmlFor="imageUrl">Image URL</label>
                            <input
                                className="signup-login-fields"
                                type="text"
                                name="imageUrl"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                            />
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="title">Photo Title</label>
                            <input
                                className="signup-login-fields"
                                type="text"
                                name="title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="description">
                                Description (Optional)
                            </label>
                            <textarea
                                className="signup-login-fields"
                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows="20"
                                cols="80"
                            />
                        </div>
                        <div className="create-form-buttons-container">
                            <div
                                onClick={onSubmit}
                                className="create-form-login-button"
                            >
                                Create
                            </div>
                            <div
                                className="create-form-login-button"
                                onClick={() => history.push("/photostream")}
                            >
                                Cancel
                            </div>
                        </div>
                    </form>
                    {/* <div className="upload-icon-container"
                    onClick={handleSimulateClick}
                >
                    <i className="fa-solid fa-up-from-line"></i>
                </div>
                <h3 className="upload-heading-2">
                or
                </h3> */}
                    {/* <button
                    className="choose-file-btn"
                    onClick={handleSimulateClick}
                >
                    Choose photos to upload
                </button>
                <input
                    type='file'
                    onChange={onSubmit}
                    ref={fileInput}
                    style={{ display: 'none' }}
                /> */}
                </div>
            </div>
        </div>
    )
    
}
