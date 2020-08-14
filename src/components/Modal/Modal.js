import React from "react";

export default function Modal({ children, showModal, closeModal }) {
  return (
    <div
      className={showModal ? "modal show" : "modal hide"}
      onClick={closeModal}
    >
      <div className="content">
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
