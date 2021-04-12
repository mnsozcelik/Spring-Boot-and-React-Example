import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import ProfileImageWithDefault from "./ProfileImageWithDefault";
import Input from "./Input";
import { deleteUser, updateUser } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import { logoutSuccess, updateSuccess } from "../redux/authActions";
import Modal from "./Modal";

const ProfileCard = (props) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));
  const routeParams = useParams();
  const dispatch = useDispatch();
  const pathUsername = routeParams.username;
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);
  const [newImage, setNewImage] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory(); 

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  useEffect(() => {
    setEditable(pathUsername === loggedInUsername);
  }, [pathUsername, loggedInUsername]);

  useEffect(() => {
    setValidationErrors((previousValidationErrors) => ({
      ...previousValidationErrors,
      displayName: undefined,
    }));
  }, [updatedDisplayName]);

  useEffect(() => {
    setValidationErrors((previousValidationErrors) => ({
      ...previousValidationErrors,
      image: undefined,
    }));
  }, [newImage]);

  const { username, displayName, image } = user;

  const pendingApiCallDeleteUser = useApiProgress(
    "delete",
    `/api/1.0/users/${username}`,
    true
  );

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
    if (newImage) {
      image = newImage.split(",")[1];
    }
    const body = {
      displayName: updatedDisplayName,
      image,
    };
    try {
      const response = await updateUser(username, body);
      setInEditMode(false);
      setUser(response.data);
      dispatch(updateSuccess(response.data));
    } catch (error) {
      setValidationErrors(error.response.data.validationErrors);
    }
  };

  const onChangeFile = (event) => {
    if (event.target.files.length < 1) {
      return;
    }
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const onClickCancel = () => {
    setModalVisible(false);
  };

  const onClickDeleteUser = async () => {
    await deleteUser(username);
    setModalVisible(false);
    dispatch(logoutSuccess());
    history.push('/');
  };

  const pendingApiCall = useApiProgress("put", "/api/1.0/users/" + username);

  const { displayName: displayNameError, image: imageError } = validationErrors;

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
              error={displayNameError}
            />
          </div>
        )}
      </div>
      <div className="card-body pl-0">
        <div className="row d-flex justify-content-center">
          <ProfileImageWithDefault
            className="rounded-circle shadow"
            width="200"
            height="200"
            alt={`${username} profile`}
            image={image}
            tempimage={newImage}
          ></ProfileImageWithDefault>
        </div>
        {inEditMode && (
          <Input
            type="file"
            onChange={onChangeFile}
            error={imageError}
            className="m-auto float-right"
          />
        )}
        <div className="row m-0 p-0 text-center">
          <h1 className="col mt-3 m-0 p-0 text-center">
            <span className=" m-0 p-0 rounded text-white bg-primary">
              @{username}
            </span>
          </h1>
        </div>
      </div>
      <div className="card-footer text-center">
        {editable && !inEditMode && (
          <>
            <button
              className="btn btn-info btn-rounded d-inline-flex rounded-pill waves-effect "
              onClick={() => setInEditMode(true)}
            >
              <span className="material-icons" aria-hidden="true">
                edit
              </span>
              {t("Edit")}
            </button>
            <div className="pt-2">
              <button
                className="btn btn-danger btn-rounded d-inline-flex rounded-pill waves-effect "
                onClick={() => setModalVisible(true)}
              >
                <span className="material-icons" aria-hidden="true">
                  directions_run
                </span>
                {t("Delete My Account")}
              </button>
            </div>
          </>
        )}
        {inEditMode && (
          <div className="text-right mt-1 b btn-group float-right">
            <ButtonWithProgress
              className="btn btn-success  d-inline-flex "
              onClick={onClickSave}
              disabled={pendingApiCall}
              pendingApiCall={pendingApiCall}
              style={{
                borderBottomLeftRadius: 20,
                borderTopLeftRadius: 20,
              }}
              text={
                <>
                  <i className="material-icons">save</i>
                  {t("Save")}
                </>
              }
            />
            <button
              type="button"
              className="btn btn-danger d-inline-flex "
              onClick={() => setInEditMode(false)}
              disabled={pendingApiCall}
              style={{
                borderBottomRightRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <span className="material-icons m-0 p-0" aria-hidden="true">
                close
              </span>
            </button>
          </div>
        )}
      </div>
      <Modal
        visible={modalVisible}
        title={t("Delete My Account")}
        okButton={t("Delete My Account")}
        onClickCancel={onClickCancel}
        onClickOk={onClickDeleteUser}
        message={t("Are you sure to delete your account.")}
        pendingApiCall={pendingApiCallDeleteUser}
      />
    </div>
  );
};

export default ProfileCard;
