import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './ProfileButton.css';

function ProfileButton() {
    // eslint-disable-next-line
    const sessionUser = useSelector((state) => state.session.user);
    const [showDropdown, setShowDropdown] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        setShowDropdown(!showDropdown);
        // this toggles it true/false. you only set it to true, which is why it never becomes false again
    };

    return (
        <div className='profile-div'>
            <div className='hamburger-icon'>
                <i className="fa-solid fa-bars"
                    onClick={handleClick}></i>
                <i className="fa-solid fa-user"
                    onClick={handleClick}></i>
            </div>
            {showDropdown &&
                <ul className='profile-dropdown'>Hello, {sessionUser.first_name} {sessionUser.last_name}!
                    <li className='prof-list-item'>
                        <LogoutButton />
                    </li>
                </ul>
            }
        </div>
    );
}

export default ProfileButton;
