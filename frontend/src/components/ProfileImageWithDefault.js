import React from "react";
import defaultPicture from "../assets/user512.png";

const ProfileImageWithDefault = (props) => {
  const { image, alt } = props;

  let imageSource = defaultPicture;
  if (image) {
    imageSource = image;
  }

  return (
    <img
      alt={alt}
      className="rounded-circle"
      src={imageSource}
      {...props}
    ></img>
  );
};

export default ProfileImageWithDefault;
