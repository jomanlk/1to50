import React, { useState, useRef, useEffect } from "react";

import PropTypes from "prop-types";
import _ from "lodash";
import { db } from "../../libs/firebase";

const GameWon = (props) => {
  let [showModal, setShowModal] = useState(props.show);
  let [scoreRecordId, setScoreRecordId] = useState(null);
  let [formValues, setFormValues] = useState({
    scoreName: "",
  });
  let score = _.round(props.gameWonTime / 10000, 1);

  useEffect(() => {
    saveScoreAnonymously({ score, setScoreRecordId });
  }, []);

  const handleFormUpdates = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const updateUserScore = (e) => {
    console.log(formValues.scoreName);
    if (!formValues.scoreName) {
      return false;
    }

    return db
      .collection("highscores")
      .doc(scoreRecordId)
      .update({
        name: formValues.scoreName,
      })
      .then(() => {
        alert("Score updated!");
      });
  };

  return (
    <>
      <p className="text-center">You've beaten the game, your score is :</p>
      <h2 className="text-center">
        {score}
        <small className="subtle-text"> secs</small>
      </h2>

      <hr />

      <p className="text-center">
        Your score has been saved anonymously. If you'd like to claim your
        score, give your name below.
      </p>

      <div className="text-center mt-2 mb-2">
        <div className="form-group">
          <input
            placeholder="Very cool name"
            type="text"
            name="scoreName"
            className="form-control offset-3 col-6"
            value={formValues.scoreName}
            onChange={handleFormUpdates}
          />
        </div>

        <button
          onClick={updateUserScore}
          type="button"
          className="btn btn-success"
        >
          Save
        </button>
      </div>
    </>
  );
};

const saveScoreAnonymously = ({ score, setScoreRecordId }) => {
  return db
    .collection("highscores")
    .add({
      name: "Anonymous",
      score: score,
      date: new Date(),
    })
    .then((doc) => {
      setScoreRecordId(doc.id);
    });
};

GameWon.propTypes = {
  gameWonTime: PropTypes.number,
};

export default GameWon;
