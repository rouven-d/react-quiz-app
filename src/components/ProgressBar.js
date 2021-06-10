import React from "react";

//This is the component defining the progress bar
//Takes in two values, max and current on which we will determine the width of the bar to show progress
//We will increment the width of the progressBarFull div in % according to the percentage of completed questions
export default function ProgressBar(max, current) {
  const width = (max.current / max.max) * 100;
  return (
    <div id="progressBar">
      <div
        id="progressBarFull"
        style={{
          width: `${width}%`,
        }}
      ></div>
    </div>
  );
}
