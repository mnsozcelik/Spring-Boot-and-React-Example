import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { postHoax } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import ProfileImageWithDefault from "./ProfileImageWithDefault";

const HoaxSubmit = () => {
  const { image } = useSelector((store) => ({ image: store.image }));
  const [focused, setFocused] = useState(false);
  const { t } = useTranslation();
  const [hoax, setHoax] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!focused) {
      setHoax("");
      setErrors({});
    }
  }, [focused]);

  useEffect(() => {
    setErrors({});
  }, [hoax]);

  const pendingApiCall = useApiProgress("post", "/api/1.0/hoaxes");

  const onClickHoaxify = async () => {
    const body = {
      content: hoax,
    };
    try {
      await postHoax(body);
      setFocused(false);
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  let textAreaClass = "form-control";
  if (errors.content) {
    textAreaClass += " is-invalid";
  }
  return (
    <div className="card p-1 flex-row">
      <ProfileImageWithDefault
        image={image}
        width="50"
        height="50"
        className="rounded-circle m-1 mr-2 shadow border border-"
      />
      <div className="flex-fill">
        <textarea
          className={textAreaClass}
          rows={focused ? "3" : "1"}
          onFocus={() => setFocused(true)}
          onChange={(event) => setHoax(event.target.value)}
          value={hoax}
        />
        <div className="invalid-feedback">{errors.content}</div>
        {focused && (
          <div className="text-right mt-1 b btn-group float-right">
            <ButtonWithProgress
              className="btn btn-primary  d-inline-flex  waves-effect p-1 m-auto"
              onClick={onClickHoaxify}
              style={{ borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }}
              pendingApiCall={pendingApiCall}
              disabled={pendingApiCall}
              text="Hoaxify"
            />
            <button
              type="button"
              className="btn btn-danger  d-inline-flex  waves-effect p-1 m-auto"
              style={{
                borderBottomRightRadius: 20,
                borderTopRightRadius: 20,
              }}
              disabled={pendingApiCall}
              onClick={() => setFocused(false)}
            >
              <span className="material-icons m-0" aria-hidden="true">
                close
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoaxSubmit;
