import React, { useState, useEffect } from 'react';
import { generateRandomNumber } from '../utils/generators';

import { getBubbleSortProcedures } from '../algorithms/BubbleSort';

import './Visualiser.css';
import { Colors } from '../styles';

const ANIMATION_SPEED = 0.1;
const TOTAL_NUM_ARRAYS = 300;

const Visualiser = () => {
  const [visualArray, updateArray] = useState([]);

  // when the component first mounts, create a new random array
  useEffect(() => resetArray(), []);

  function resetArray() {
    const array = [];
    for (let i = 0; i < TOTAL_NUM_ARRAYS; i++) {
      const num = generateRandomNumber(3, 1000);
      array.push(num);
      updateArray(array);
    }
    // set the colors to default color
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let j = 0; j < arrayBars.length; j++) {
      arrayBars[j].style.backgroundColor = Colors.BAR_DEFAULT;
    }
  }

  function bubbleSort() {
    const procedures = getBubbleSortProcedures(visualArray);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < procedures.length; i++) {
      setTimeout(() => {
        let [oldPosition, newPosition] = procedures[i];

        let oldBarStyle = arrayBars[oldPosition].style;
        let newBarStyle = arrayBars[newPosition].style;

        // here we make the swap visually
        let temp = visualArray[oldPosition];
        visualArray[oldPosition] = visualArray[newPosition];
        visualArray[newPosition] = temp;
        oldBarStyle.height = `${visualArray[oldPosition]}px`;
        newBarStyle.height = `${visualArray[newPosition]}px`;

        let currentPosition = oldPosition;
        for (let j = 0; j < currentPosition; j++) {
          arrayBars[j].style.backgroundColor = Colors.BAR_PROCESSING;
        }

        if (i === procedures.length - 1) {
          makeAllBarsGreen();
        }
      }, ANIMATION_SPEED);
    }
  }

  function makeAllBarsGreen() {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let j = 0; j < arrayBars.length; j++) {
      arrayBars[j].style.backgroundColor = Colors.BAR_COMPLETED;
    }
  }

  return (
    <div className="visualiser-layout">
      Sorting Visualiser
      <div className="visualiser-container">
        {visualArray.map((i, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: i, backgroundColor: Colors.BAR_DEFAULT }}
          />
        ))}
      </div>
      <div className="controls-container">
        <button onClick={() => bubbleSort()}>Bubble Sort</button>
        <button onClick={() => resetArray()}>Reset Arrays</button>
      </div>
    </div>
  );
};

export default Visualiser;
