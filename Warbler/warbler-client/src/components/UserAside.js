import React from "react";
import DefaultProfileImage from "../images/default-profile-image.jpg";

const UserAside = ({profileImageUrl, username}) => (
    <div className="col-sm-2">
        <div className="panel-body">
            <img 
                src={profileImageUrl || DefaultProfileImage} 
                alt={username}
                className="img-thumbnail"
            />
        </div>
    </div>
);

export default UserAside;