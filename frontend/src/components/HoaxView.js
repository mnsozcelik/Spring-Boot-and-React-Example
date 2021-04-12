import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { format } from "timeago.js";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { deleteHoax } from "../api/apiCalls";
import Modal from "./Modal";
import { useApiProgress } from "../shared/ApiProgress";

const HoaxView = (props) => {
  const loggedInUser = useSelector((store) => store.username);
  const { hoax, onDeleteHoax } = props;
  const { user, content, timestamp, fileAttachment, id } = hoax;
  const { username, displayName, image } = user;
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const pendingApiCall = useApiProgress('delete', `/api/1.0/hoaxes/${id}`, true);
  

  const onClickDelete = async () => {
    await deleteHoax(id);
    onDeleteHoax(id);
  };

  const onClickCancel = () => {
    setModalVisible(false);
  };

  const formattedTime = format(timestamp, i18n.language);

  const ownedByLoggedInUser = loggedInUser === username;

  return (
    <>
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

        <div className="pl-5">
          {content}
          {ownedByLoggedInUser && (
            <button className="btn float-right btn-delete-link p-0 m-0" onClick={() => setModalVisible(true)}>
              <span className="material-icons" >
                <span className="material-icons">delete_outline</span>
              </span>
            </button>
          )}
        </div>

        {fileAttachment && (
          <div className="pl-5">
            {fileAttachment.fileType.startsWith("image") && (
              <img
                className="img-fluid"
                src={"images/attachments/" + fileAttachment.name}
                alt={content}
              />
            )}
            {!fileAttachment.fileType.startsWith("image") && (
              <strong>Hoax has unkown attachment.</strong>
            )}
          </div>
        )}
      </div>
      <Modal
        visible={modalVisible}
        onClickCancel={onClickCancel}
        onClickOk={onClickDelete}
        title={t("Delete Hoax")}
        okButton={t("Delete Hoax")}
        message={
          <div>
            <div>
              <strong>{t("Are you sure to delete Hoax.")}</strong>
            </div>
            <div className="card">
            <span>{content}</span>
            </div>
          </div>
        }
        pendingApiCall={pendingApiCall}
      />
    </>
  );
};

export default HoaxView;
