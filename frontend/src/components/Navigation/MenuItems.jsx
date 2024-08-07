import { NavLink } from "react-router-dom"

import { FaHome, FaCalendarAlt, FaClipboardCheck, FaTools } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

import './MenuItems.css'

export default function MenuItems({ flexDirection, alignItems, width }) {
    console.log(flexDirection);
    return (
        flexDirection === 'column' ?
            <nav className="nav-links-column" style={{ flexDirection: flexDirection, alignItems: alignItems }}>
                <NavLink to="/dashboard" className="menu-item-column" style={{ width: width }}>
                    <FaHome className='menu-item-icon-column' />
                    <span className="column-span" >Dashboard</span>
                </NavLink>
                <NavLink to="/calendar" className="menu-item-column" style={{ width: width }} >
                    <FaCalendarAlt className='menu-item-icon-column' />
                    <span className="column-span">Calendar</span>
                </NavLink>
                <NavLink to="/tickets" className="menu-item-column" style={{ width: width }}>
                    <FaClipboardCheck className='menu-item-icon-column' />
                    <span className="column-span">Tickets</span>
                </NavLink>
                <NavLink to="/parts" className="menu-item-column" style={{ width: width }}>
                    <FaTools className='menu-item-icon-column' />
                    <span className="column-span">Parts</span>
                </NavLink>
                <NavLink to="/customers" className="menu-item-column" style={{ width: width }}>
                    <FaCircleUser className='menu-item-icon-column' />
                    <span className="column-span">Customers</span>
                </NavLink>
            </nav> :
            <nav className="nav-links" style={{ flexDirection: flexDirection, alignItems: alignItems }}>

                <NavLink to="/dashboard" className="menu-item" style={{ width: width }}>
                    <FaHome className='menu-item-icon' />
                    <span className="row-span">Dashboard</span>
                </NavLink>
                <NavLink to="/Calendar" className="menu-item" style={{ width: width }} >
                    <FaCalendarAlt className='menu-item-icon' />
                    <span className="row-span">Calendar</span>
                </NavLink>
                <NavLink to="/tickets" className="menu-item" style={{ width: width }}>
                    <FaClipboardCheck className='menu-item-icon' />
                    <span className="row-span">Tickets</span>
                </NavLink>
                <NavLink to="/parts" className="menu-item" style={{ width: width }}>
                    <FaTools className='menu-item-icon' />
                    <span className="row-span">Parts</span>
                </NavLink>
                <NavLink to="/Customers" className="menu-item" style={{ width: width }}>
                    <FaCircleUser className='menu-item-icon' />
                    <span className="row-span">Customers</span>
                </NavLink>
            </nav>
    )
}