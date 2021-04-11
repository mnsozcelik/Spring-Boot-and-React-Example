import React from "react";

const ButtonWithProgress = (props) => {
  const { className, onClick, pendingApiCall, disabled, text ,style} = props;
  return (
    <button
      className={className || "btn btn-primary"}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {pendingApiCall ? (
        <div
          className="spinner-grow spinner-grow-sm text-light m-auto"
          role="status"
        />
      ) : (
        text
      )}
    </button>
  );
};

export default ButtonWithProgress;
