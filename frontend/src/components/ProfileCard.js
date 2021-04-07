import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


import ProfileImageWithDefault from './ProfileImageWithDefault';

const ProfileCard = (props) => {
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));
  const routeParams = useParams();
  const pathUsername = routeParams.username;
  const { user } = props;
  const { username, displayName, image } = user;
  return (
    <div className="card text-center">
      <div className="card-header ">
        <h3>{displayName}</h3>
      </div>
      <div className="card-body p-0 ">
        <div className="row p-0">
          <div className="col-sm-3 ml-3 ">
            <ProfileImageWithDefault
              className="rounded-circle shadow"
              width="200"
              height="200"
              alt={`${username} profile`}
              image={image}
            ></ProfileImageWithDefault>
          </div>
          <div className="col-sm-8 m-auto text-left ">
            <h4>@{username}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
