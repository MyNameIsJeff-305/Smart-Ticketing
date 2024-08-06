import './Profile.css';

export default function Profile({ user, profilePic }) {
    
    

    return (
        <div className="profile-container">
            <span>{`${user.firstName}`}</span>
            <img src={profilePic.url} alt="Profile Picture" />
        </div>
    )
}