import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import _ from "lodash";
import { db } from "../../libs/firebase";
import moment from "moment";

const HighScores = (props) => {
  const [scores, setScores] = useState(false);

  useEffect(() => {
    fetchScores().then((qs) => {
      let scoreDocs = [];
      qs.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        let score = doc.data();
        score.id = doc.id;
        scoreDocs.push(score);
      });
      setScores(scoreDocs);
    });
  }, []);

  if (!props.show) {
    return null;
  }

  let scoreItems =
    scores &&
    scores.map((score) => {
      return (
        <li className="row mb-2" key={score.id}>
          <span className="name col-9">{score.name}</span>
          <span className="score col-3 text-right">{score.score}s</span>
          <span className="date col-12">
            {moment(score.date.toDate()).format("MMMM Do YYYY, h:mma")}
          </span>
        </li>
      );
    });
  return (
    <Modal title="High Scores" {...props}>
      {scores.length == 0 ? (
        <p>No scores recorded yet. Be the first!</p>
      ) : (
        <ul className="high-score-list">{scoreItems}</ul>
      )}
    </Modal>
  );
};

const fetchScores = (setScores) => {
  return db.collection("highscores").orderBy("score", "desc").limit(5).get();
};

HighScores.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default HighScores;
