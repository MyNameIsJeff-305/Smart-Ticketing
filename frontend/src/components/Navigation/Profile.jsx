import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Profile.css';

export default function Profile({ user, profilePic }) {

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const navigate = useNavigate();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current.contains(e.target)) return;
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);

    }, [showMenu]);

    const ulClassName = 'profile-dropdown' + (showMenu ? ' show' : ' hidden');

    return (
        <div className="profile-container" onClick={toggleMenu}>
            <span>{`${user.firstName}`}</span>
            {
                profilePic.url ?
                    <img src={profilePic.url} alt="Profile Picture" /> :
                    <div className="fallback-profile">{`${user.firstName[0]}${user.lastName[0]}`}</div>
            }
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>Hello, {user.firstName}</li>
                        <li>{user.email}</li>
                        <div className='divider-horizontal'></div>
                        <li>{user.email}</li>
                    </>
                ) : (
                    <>
                    </>
                )}
            </ul>
        </div>
    )
}