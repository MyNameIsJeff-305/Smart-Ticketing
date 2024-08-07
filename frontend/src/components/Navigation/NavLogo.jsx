import { useNavigate } from 'react-router-dom';

import './NavLogo.css';

export default function NavLogo() {
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/dashboard');
    }

    return (
        <div className='nav-logo-container' onClick={(e) => handleNavigate(e)}>
            <img src="/assets/horizontal-logo-white.png" className='logo-main' alt='logo'></img>
            <img src="/assets/logo-only.png" className='logo-mobile' alt='logo'></img>
        </div>
    );
}