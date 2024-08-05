import NavLogo from './NavLogo';
import MenuItems from './MenuItems';
import Search from './Search';
import Profile from './Profile';

import './Navigation.css';

import { useSelector } from 'react-redux';

export default function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className="navigation">
            <NavLogo />
            <MenuItems />
            <Search />
            <Profile />
        </nav>
    )
}