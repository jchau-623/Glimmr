
import { React, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import "./NavBar.css";
import flickrLogo from '../../assets/flickrLogo.svg'
import ProfileButton from './ProfileButton';

const NavBar = () => {
    const sessionUser = useSelector(state => state?.session?.user);

    const [showAboutMe, setShowAboutMe] = useState(false)

    useEffect(() => {
        if (!showAboutMe) return
        const closeDropdown = (e) => {
            setShowAboutMe(false);
        }

        document.addEventListener('click', closeDropdown);

        return () => document.removeEventListener('click', closeDropdown);
    }, [showAboutMe]);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <NavLink
                    to="/"
                    className="nav-items"
                >
                    <div className='nav-home-btn'>
                        <img src={flickrLogo} className="flickr-dots" alt="" />
                        <h1 className="glimmr">glimmr</h1>
                    </div>
                </NavLink>
                {sessionUser && (
                    <>
                        <div className="nav-items">
                            <NavLink
                                to="/photostream"
                                exact={true}
                                activeClassName="active"
                            >
                                You
                            </NavLink>
                        </div>
                        <div className="nav-items">
                            <NavLink
                                to="/explore"
                                exact={true}
                                activeClassName="active"
                            >
                                Explore
                            </NavLink>
                        </div>
                    </>
                )}
                <div className='about-me-dropdown' onClick={setShowAboutMe}>About Me</div>
                {showAboutMe && (
                    <ul className="about-me-items">
                        <a href="https://github.com/jchau-623" target="_blank" rel="noreferrer">
                            <span className="about-me-icon">GitHub
                                <i className="fab fa-github"></i>
                            </span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/justin-chau-1123a9142/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span className="about-me-icon">LinkedIn
                                <i className="fab fa-linkedin"></i>
                            </span>
                        </a>
                        <a href="https://angel.co/u/justin-chau-3" target="_blank" rel="noreferrer">
                            <span className="about-me-icon">AngeList
                                <i className="fab fa-angellist"></i>
                            </span>
                        </a>
                        <a href="https://jchau-623.github.io/" target="_blank" rel="noreferrer">
                            <span className="github-icon">
                                <div>Portfolio</div>
                            </span>
                        </a>
                    </ul>
                )}
            </div>

            {sessionUser && <div></div>}

            <div className="navbar-right">
                {sessionUser ? (
                    <>
                        <div className="nav-items">
                            <NavLink to="/photos/new">
                                <span className="upload-button">
                                    <i className="fas fa-cloud-upload-alt"></i>
                                </span>
                            </NavLink>
                        </div>
                        <div>
                            <ProfileButton />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="nav-items">
                            <NavLink
                                to="/sign-up"
                                exact={true}
                                activeClassName="active"
                            >
                                Sign Up
                            </NavLink>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
