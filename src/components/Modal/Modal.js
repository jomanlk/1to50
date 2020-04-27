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

  return createPortal(props.children, $el);
};

export default Modal;
