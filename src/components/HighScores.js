import React, { useEffect } from "react";
import { useState } from "react";
import { useFirebase } from "./Firebase/FirebaseContext";
import { Link } from "react-router-dom";

export default function HighScores() {
  const firebase = useFirebase();
  //React Hook to keep track of the scores
  const [scores, setScores] = useState([]);
  //React Hook for Loading
  const [loading, setLoading] = useState(true);

  //Get all the highscores saved in firebase once the components are loaded
  // Snapshot is what firebase returns as data, we can then capture the value of the snapshot
  useEffect(() => {
    firebase.scores().once("value", (snapshot) => {
      const data = snapshot.val();
      //Operation to format the data from firebase using the function below
      const sortedScores = formatScoreData(data);
      setScores(sortedScores);
      setLoading(false);
    });
  }, [firebase]);

  const formatScoreData = (firebaseScores) => {
    const scores = [];
    //Takes the key from the firebase data and established key with the firebase key value as a object property then pushed to the scores array
    for (let key in firebaseScores) {
      const val = firebaseScores[key];
      val["key"] = key;
      scores.push(val);
    }
    //Here we sort the data by the size of the score with the highest score on top
    //We solice the scores aaray to only give out the first 10 values
    return scores
      .sort((score1, score2) => score2.score - score1.score)
      .slice(0, 10);
  };

  return (
    <>
      {loading && <div id="loader"></div>}
      {!loading && (
        <>
          <h1>High Scores</h1>
          <div className="highScoresList">
            {scores.map((record, index) => {
              return (
                <div key={index} className="choice-container">
                  <p className="scorer-name">{record.name}</p>
                  <p key={record.key} className="high-score">
                    {record.score}
                  </p>
                </div>
              );
            })}
          </div>
          <Link to="/" className="hsbtn">
            Go Home
          </Link>
        </>
      )}
    </>
  );
}
