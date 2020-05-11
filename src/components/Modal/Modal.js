import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = (props) => {
  const $mount = document.getElementById("modal-root");
  const $el = document.createElement("div");
  const $bg = document.createElement("div");
  $bg.classList.add("modal-backdrop", "fade", "show");

  useEffect(() => {
    $mount.appendChild($bg);
    $mount.appendChild($el);

    return () => {
      $mount.removeChild($el);
      $mount.removeChild($bg);
    };
  }, [$el, $mount]);

  // Render nothing if the "show" prop is false
  if (!props.show) {
    return null;
  }

  return createPortal(wrapChildren(props), $el);
};

const wrapChildren = (props) => {
  let modalClass = props.show ? "modal fade show" : "modal fade";
  return (
    <div className={modalClass} tabIndex="-1" role=" ">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
