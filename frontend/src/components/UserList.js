import React, { useEffect, useState } from "react";
import { getUsers } from "../api/apiCalls";
import { useTranslation } from "react-i18next";
import UserListItem from "./UserListItem";
import { useApiProgress } from "../shared/ApiProgress";

const UserList = () => {
  const [page, setPage] = useState({
    content: [],
    size: 3,
    number: 0,
  });

  const [loadFailure, setLoadFaliure] = useState(false);
  const pendingApiCall = useApiProgress("/api/1.0/users?page");

  useEffect(() => {
    loadUsers();
  }, []);

  const onClickPrevious = () => {
    const previousPage = page.number - 1;
    loadUsers(previousPage);
  };
  const onClickNext = () => {
    const nextPage = page.number + 1;
    loadUsers(nextPage);
  };

  const loadUsers = async (page) => {
    setLoadFaliure(false);
    try{
      const response = await getUsers(page);
      setPage(response.data);
    }catch(error){
      setLoadFaliure(true);

    }
  };

  const { t } = useTranslation();
  const { content: users, last, first } = page;
  let actionDiv = (
    <div className="card-footer">
      {first === false ? (
        <button
          className="btn btn-sm bg-secondary text-white font-weight-bold rounded-pill shadow-sm"
          onClick={onClickPrevious}
        >
          {t("Previous")}
        </button>
      ) : (
        <button
          className="btn btn-sm bg-secondary text-white font-weight-bold rounded-pill shadow-sm"
          onClick={onClickPrevious}
          disabled="true"
        >
          {t("Previous")}
        </button>
      )}
      {last === false ? (
        <button
          className="btn btn-sm bg-secondary text-white font-weight-bold rounded-pill shadow-sm float-right "
          onClick={onClickNext}
        >
          {t("Next")}
        </button>
      ) : (
        <button
          className="btn btn-sm bg-secondary text-white font-weight-bold rounded-pill shadow-sm float-right "
          onClick={onClickNext}
          disabled="false"
        >
          {t("Next")}
        </button>
      )}
    </div>
  );

  if (pendingApiCall) {
    actionDiv = (
      <div class="text-center">
        <div class="spinner-border text-primary" role="status" />
      </div>
    );
  }
  return (
    <div className="card">
      <h3 className="card-header text-center">{t("Users")}</h3>
      <div className="list-group-flush">
        {users.map((user) => (
          <UserListItem key={user.username} user={user} />
        ))}
      </div>
      {actionDiv}
      {loadFailure && (
        <div className="alert alert-danger text-center ">{t("Load Failure")}</div>
      )}
    </div>
  );
};

export default UserList;
