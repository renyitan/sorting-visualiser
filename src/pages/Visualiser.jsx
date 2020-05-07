import React, { useState, useEffect } from 'react';
import { generateRandomNumber } from '../utils/generators';

import { getBubbleSortProcedures } from '../algorithms/BubbleSort';
import {
  getQuickSortProcedures,
  partition,
  performQuickSort,
} from '../algorithms/QuickSort';

import './Visualiser.css';
import { Colors } from '../styles';

const ANIMATION_SPEED = 10;
const MIN_NUM_ARRAYS = 100;
const MAX_NUM_ARRAYS = 600;

const Visualiser = () => {
  const [visualArray, updateArray] = useState([]);
  const [sliderValue, updateSliderValue] = useState(
    (MAX_NUM_ARRAYS + MIN_NUM_ARRAYS) / 2
  );
  function resetArray() {
    const array = [];
    for (let i = 0; i < sliderValue; i++) {
      const num = generateRandomNumber(3, 500);
      array.push(num);
      updateArray(array);
    }
    // set the colors to default color
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let j = 0; j < arrayBars.length; j++) {
      arrayBars[j].style.backgroundColor = Colors.BAR_DEFAULT;
    }
  }

  // when the component first mounts, create a new random array
  useEffect(() => resetArray(), []);

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
          markComplete();
        }
      }, ANIMATION_SPEED);
    }
  }

  async function quickSort() {
    const procedures = getQuickSortProcedures(visualArray);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < procedures.length; i++) {
      setTimeout(() => {
        let [oldPosition, newPosition] = procedures[i];
        let oldBarStyle = arrayBars[oldPosition].style;
        let newBarStyle = arrayBars[newPosition].style;
        let pIndex;
        const dummyProcedures = [];
        if (visualArray.length > 1) {
          pIndex = partition(
            dummyProcedures,
            visualArray,
            0,
            visualArray.length - 1
          );
          performQuickSort(dummyProcedures, visualArray, 0, pIndex - 1);
          performQuickSort(
            dummyProcedures,
            visualArray,
            pIndex + 1,
            visualArray.length - 1
          );
        }
        oldBarStyle.height = `${visualArray[oldPosition]}px`;
        newBarStyle.height = `${visualArray[newPosition]}px`;
        oldBarStyle.backgroundColor = Colors.BAR_CURRENT;
        newBarStyle.backgroundColor = Colors.BAR_CURRENT;
        let currentPosition = oldPosition;
        for (let j = 0; j < currentPosition; j++) {
          var jBarStyle = arrayBars[j].style;
          jBarStyle.backgroundColor = Colors.BAR_PROCESSING;
        }
        if (i === procedures.length - 1) {
          markComplete();
        }
      }, ANIMATION_SPEED);
    }
  }

  function markComplete() {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = Colors.BAR_COMPLETED;
    }
  }

  return (
    <div className="visualiser-layout">
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
        <div className="btn'">
          <input
            type="range"
            min={MIN_NUM_ARRAYS}
            max={MAX_NUM_ARRAYS}
            value={sliderValue}
            onChange={(event) => {
              updateSliderValue(event.target.value);
              resetArray();
            }}
          />
          <span
            style={{
              color: 'white',
              fontWeight: 'bold',
              paddingLeft: 30,
              paddingRight: 30,
            }}
          >
            {sliderValue}
          </span>
        </div>
        <button className="btn" onClick={() => bubbleSort()}>
          Bubble Sort
        </button>
        <button className="btn" onClick={() => quickSort()}>
          Quick Sort
        </button>
        <button className="btn" onClick={() => resetArray()}>
          Reset Arrays
        </button>
      </div>
    </div>
  );
};

export default Visualiser;
