import React, { useState } from "react";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import _ from "lodash";

const GameWon = (props) => {
  let [showModal, setShowModal] = useState(props.show);

  // Render nothing if the "show" prop is false
  if (!props.show) {
    return null;
  }

  let modalClass = props.show ? "modal fade show" : "modal fade";
  return (
    <Modal {...props}>
      <div className={modalClass} tabIndex="-1" role=" ">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Congratulations!</h5>
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
            <div className="modal-body">
              <p className="text-center">
                You've beaten the game, your score is :
              </p>
              <h2 className="text-center">
                {_.round(props.gameWonTime / 10000, 1)}
                <small className="subtle-text">secs</small>
              </h2>
            </div>
            <div className="modal-footer">
              <button
                onClick={props.onClose}
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

GameWon.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default GameWon;
