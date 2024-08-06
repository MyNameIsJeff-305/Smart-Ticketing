
import './Profile.css';

export default function Profile({ user, profilePic }) {



    return (
        <div className="profile-container">
            <span>{`${user.firstName}`}</span>
            {
                profilePic.url ?
                    <img src={profilePic.url} alt="Profile Picture" /> :
                    <div className="fallback-profile">{`${user.firstName[0]}${user.lastName[0]}`}</div>
            }
        </div>
    )
}