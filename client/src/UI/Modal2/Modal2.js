import React from "react";
import "./Modal2.css";
export default function Modal2({ children }) {
  return (
    <div className="modal-2">
      <div className="modal-content-2">
        {children}
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
}
