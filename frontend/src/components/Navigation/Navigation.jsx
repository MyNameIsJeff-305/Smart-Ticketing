import NavLogo from './NavLogo';
import MenuItems from './MenuItems';
import Profile from './Profile';
import './Navigation.css';

import { useSelector, useDispatch } from "react-redux";
import { getUserProfilePic } from "../../store/session";
import { useEffect } from 'react';

export default function Navigation() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const profilePic = useSelector(state => state.session.userImage);

    useEffect(() => {
        if (sessionUser) {
            dispatch(getUserProfilePic(sessionUser));
        }
    }, [dispatch, sessionUser]);

    if (!sessionUser || !profilePic) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="navigation">
            <section>
                <NavLogo />
            </section>
            <section>
                <MenuItems flexDirection={"rows"} alignItems={"center"} />
            </section>
            <section>
                <Profile user={sessionUser} profilePic={profilePic} />
            </section>
        </nav>
    );
}
