
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from "react-redux";
import "./NavBar.css";
import flickrLogo from '../../assets/flickrLogo.svg'

const NavBar = () => {
  const sessionUser = useSelector(state => state?.session?.user);
  return (
    <nav className="navbar">
        <div className="navbar-left">
            <NavLink
                to="/photostream"
                className="nav-items"
            >
              <div className='nav-home-btn'>
                <img src={flickrLogo} className="flickr-dots" alt=""/>
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
        </div>

        <div className="navbar-center">
            <div className="nav-items">
                <a href="https://jchau-623.github.io/" target="_blank" rel="noreferrer">
                    <span className="github-icon">
                        <div>Portfolio</div>
                    </span>
                </a>
            </div>
            <div className="nav-items">
                <a href="https://github.com/jchau-623" target="_blank" rel="noreferrer">
                    <span className="github-icon">
                        <i className="fab fa-github"></i>
                    </span>
                </a>
            </div>
            <div className="nav-items">
                <a
                    href="https://www.linkedin.com/in/justin-chau-1123a9142/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="linkedin-icon">
                        <i className="fab fa-linkedin"></i>
                    </span>
                </a>
            </div>
            <div className="nav-items">
                <a href="https://https://angel.co/u/justin-chau-3" target="_blank" rel="noreferrer">
                    <span className="linkedin-icon">
                        <i className="fab fa-angellist"></i>
                    </span>
                </a>
            </div>
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

                    <div className="nav-items">
                        <LogoutButton sessionUser={sessionUser} />
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
