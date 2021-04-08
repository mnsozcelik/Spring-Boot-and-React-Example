import React from "react";
import defaultPicture from "../assets/user512.png";

const ProfileImageWithDefault = (props) => {
  const { image, tempimage } = props;

  let imageSource = defaultPicture;
  if (image) {
    imageSource = "images/" + image;
  }

  return (
    <img
      alt={"Profile"}
      className="rounded-circle"
      src={tempimage || imageSource}
      {...props}
      onError={(event) => {
        event.target.src = defaultPicture;
      }}
    ></img>
  );
};

export default ProfileImageWithDefault;
