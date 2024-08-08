import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';

import * as sessionActions from '../../store/session';

import { FaRightFromBracket } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";

import './Profile.css';
import MenuItems from './MenuItems';

export default function Profile({ user, profilePic }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const handleClose = () => setShowMenu(false);
    const toggleShow = () => setShowMenu((s) => !s);

    const offcanvasOptions = {
        name: 'Enable backdrop (default)',
        scroll: false,
        backdrop: true,
        placement: 'end',
    }

    const handleLogOut = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(sessionActions.logout())
            .then(() => {
                handleClose();
            })
            .then(() => {
                navigate('/');
            })
    }

    return (
        <>
            <div className="profile-container" onClick={toggleShow}>
                <span>{`${user.firstName}`}</span>
                {
                    profilePic.url ?
                        <div onClick={toggleShow}>
                            <img src={profilePic.url} onClick={toggleShow} alt="Profile Picture" />
                        </div> :
                        <div className="fallback-profile" onClick={toggleShow}>{`${user.firstName[0]}${user.lastName[0]}`}</div>
                }
            </div>
            <Offcanvas data-bs-theme="dark" className='offcanvas-menu' show={showMenu} onHide={handleClose} {...offcanvasOptions}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <div className="profile-container-offcanvas">
                            <div className='left-div'>
                                {
                                    profilePic.url ?
                                        <img src={profilePic.url} alt="Profile Picture" /> :
                                        <div className="fallback-profile-offcanvas" >{`${user.firstName[0]}${user.lastName[0]}`}</div>
                                }
                            </div>
                            <div className='right-div'>
                                <span>{`${user.firstName}`}</span>
                                <span className='email'>{`${user.email}`}</span>
                            </div>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <>
                        <MenuItems flexDirection={"column"} alignItems={"start"} width={"100%"} />
                        <div className='divider-horizontal'></div>

                        <div className='bottom-buttons-container-container'>
                            <div className='edit-profile-container'>
                                <FaUserEdit />
                                Edit Profile
                            </div>
                            <div className='logout-container' onClick={(e) => { handleLogOut(e) }}>
                                <FaRightFromBracket />
                                Log Out
                            </div>
                        </div>
                    </>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}