import { NavLink } from "react-router-dom"

import { FaHome, FaCalendarAlt, FaClipboardCheck, FaTools } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

import './MenuItems.css'

export default function MenuItems({ flexDirection, alignItems, width }) {
    return (
        <nav className="nav-links" style={{ flexDirection: flexDirection, alignItems: alignItems }}>

            <NavLink to="/dashboard" className="menu-item" style={{ width: width }}>
                <FaHome className='menu-item-icon' />
                <span>Dashboard</span>
            </NavLink>
            <NavLink to="/Calendar" className="menu-item" style={{ width: width }} >
                <FaCalendarAlt className='menu-item-icon' />
                <span>Calendar</span>
            </NavLink>
            <NavLink to="/tickets" className="menu-item" style={{ width: width }}>
                <FaClipboardCheck className='menu-item-icon' />
                <span>Tickets</span>
            </NavLink>
            <NavLink to="/parts" className="menu-item" style={{ width: width }}>
                <FaTools className='menu-item-icon' />
                <span>Parts</span>
            </NavLink>
            <NavLink to="/Customers" className="menu-item" style={{ width: width }}>
                <FaCircleUser className='menu-item-icon' />
                <span>Customers</span>
            </NavLink>
        </nav>
    )
}