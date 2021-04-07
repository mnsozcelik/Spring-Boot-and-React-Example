import React from "react";

const ButtonWithProgress = (props) => {
  const { className, onClick, pendingApiCall, disabled, text } = props;
  return (
    <button
      className={className || "btn btn-primary"}
      onClick={onClick}
      disabled={disabled}
    >
      {pendingApiCall ? (
        <div
          className="spinner-grow spinner-grow-sm text-light"
          role="status"
        />
      ) : (
        text
      )}
    </button>
  );
};

export default ButtonWithProgress;
