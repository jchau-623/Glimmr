import { useDispatch, useSelector } from "react-redux";

const PhotostreamPage = () => {
    const allPhotosObj = useSelector(store => store?.photo?.photos);
    let sessionUserPhotos;
    if (allPhotosObj) {
        const allPhotosArr = Object?.values(allPhotosObj);
        sessionUserPhotos = allPhotosArr?.filter(
            photo => photo?.user_id === props?.sessionUser?.id
        );
    }
    return (
        <h1>Photostream Page</h1>
    )
}


export default PhotostreamPage;
