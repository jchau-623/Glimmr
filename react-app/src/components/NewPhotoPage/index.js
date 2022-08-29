
import './NewPhotoPage.css'
import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { postPhoto } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";

const NewPhotoPage = () => {
    return (
        <div>New Photo Page</div>
    )
}


export default NewPhotoPage;
