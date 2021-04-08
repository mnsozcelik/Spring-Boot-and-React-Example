import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ProfileImageWithDefault from "./ProfileImageWithDefault";
import Input from "./Input";
import { updateUser } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";

const ProfileCard = (props) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));
  const routeParams = useParams();
  const pathUsername = routeParams.username;
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);
  const [newImage, setNewImage] = useState();

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  useEffect(() => {
    setEditable(pathUsername === loggedInUsername);
  }, [pathUsername, loggedInUsername]);

  const { username, displayName, image } = user;
  const { t } = useTranslation();

  useEffect(() => {
    if (!inEditMode) {
      setUpdatedDisplayName(undefined);
      setNewImage(undefined);
    } else {
      setUpdatedDisplayName(displayName);
    }
  }, [inEditMode, displayName]);

  const onClickSave = async () => {
    let image;
    if(newImage){
      image = newImage.split(',')[1]
    }
    const body = {
      displayName: updatedDisplayName,
      image
    };
    try {
      const response = await updateUser(username, body);
      setInEditMode(false);
      setUser(response.data);
    } catch (error) {}
  };

  const onChangeFile = (event) => {
    if(event.target.files.length<1){
      return;
    }
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const pendingApiCall = useApiProgress("put", "/api/1.0/users/" + username);

  return (
    <div className="card text-center">
      <div className="card-header ">
        {!inEditMode && <h3>{displayName}</h3>}
        {inEditMode && (
          <div>
            <Input
              label={t("Change Display Name")}
              defaultValue={displayName}
              onChange={(event) => {
                setUpdatedDisplayName(event.target.value);
              }}
            />
          </div>
        )}
      </div>
      <div className="card-body pl-0">
        <div className="row ">
          <div className="col-sm-3 ml-3 ">
            <ProfileImageWithDefault
              className="rounded-circle shadow"
              width="200"
              height="200"
              alt={`${username} profile`}
              image={image}
              tempimage={newImage}
            ></ProfileImageWithDefault>
          </div>
          <div className="col-sm-8 m-auto text-center ">
            <h1>
              <span className="badge badge-sm rounded text-white bg-primary">
                @{username}
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="card-footer text-right">
        {editable && !inEditMode && (
          <button
            type="button"
            className="btn btn-info btn-rounded d-inline-flex rounded-pill waves-effect"
            onClick={() => setInEditMode(true)}
          >
            <span className="material-icons" aria-hidden="true">
              edit
            </span>
            {t("Edit")}
          </button>
        )}
        {inEditMode && (
          <div>
            <input type="file" onChange={onChangeFile} className="float-left" />
            <ButtonWithProgress
              className="btn btn-success btn-rounded d-inline-flex rounded-pill waves-effect"
              onClick={onClickSave}
              disabled={pendingApiCall}
              pendingApiCall={pendingApiCall}
              text={
                <>
                  <i className="material-icons">save</i>
                  {t("Save")}
                </>
              }
            />
            <button
              type="button"
              className="btn btn-danger btn-rounded d-inline-flex rounded-pill waves-effect ml-3"
              onClick={() => setInEditMode(false)}
              disabled={pendingApiCall}
            >
              <span className="material-icons" aria-hidden="true">
                cancel
              </span>
              {t("Cancel")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
