import React from "react";
import { Link } from "react-router-dom";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { format } from "timeago.js";
import { useTranslation } from "react-i18next";

const HoaxView = (props) => {
  const { hoax } = props;
  const { user, content, timestamp } = hoax;
  const { username, displayName, image } = user;
  const { i18n } = useTranslation();
  const formattedTime = format(timestamp, i18n.language);

  return (
    <div className="card p-1">
      <div className="d-flex">
        <ProfileImageWithDefault
          image={image}
          width="32"
          height="32"
          className="rounded-circle m-1"
        />
        <div className="flex-fill m-auto mb-0 pl-2">
          <Link to={`/user/${username}`} className="text-dark">
            <h6 className=" d-inline">
              {displayName} @{username}
            </h6>
          </Link>
          <span> - </span>
          <span className="text-gray text-solid">{formattedTime}</span>
        </div>
      </div>
      <hr className="m-0 p-0" />

      <div className="pl-5">{content}</div>
    </div>
  );
};

export default HoaxView;
