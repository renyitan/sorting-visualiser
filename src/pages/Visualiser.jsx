import React, { useState, useEffect } from 'react';
import { generateRandomNumber } from '../utils/generators';

import { getBubbleSortProcedures } from '../algorithms/BubbleSort';
import {
  getQuickSortRightPivotProcedures,
  partitionWithRightPivot,
  performQuickSortWithRightPivot,
} from '../algorithms/QuickSortRightPivot';

import './Visualiser.css';
import { Colors } from '../styles';

const ANIMATION_SPEED = 1;
const MIN_NUM_ARRAYS = 200;
const MAX_NUM_ARRAYS = 500;

const Visualiser = () => {
  const [visualArray, updateArray] = useState(() => []);
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

  async function quickSortWithRightPivot() {
    const procedures = getQuickSortRightPivotProcedures(visualArray);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < procedures.length; i++) {
      const [a, b] = procedures[i].between;

      await doer(procedures[i]);

      arrayBars[a].style.backgroundColor = Colors.BAR_DEFAULT;
      arrayBars[b].style.backgroundColor = Colors.BAR_DEFAULT;

      if (i === procedures.length - 1) {
        markComplete();
      }
    }
  }

  function markComplete() {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = Colors.BAR_COMPLETED;
    }
  }

  async function doer(procedure) {
    return new Promise((resolve) => {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [a, b] = procedure.between;
      // setTimeout(() => {
      if (procedure.type === 'pivot') {
        arrayBars[a].style.backgroundColor = Colors.PIVOT;
      }
      if (procedure.type === 'compare') {
        arrayBars[a].style.backgroundColor = Colors.COMPARE;
        arrayBars[b].style.backgroundColor = Colors.COMPARE;
      }
      if (procedure.type === 'swap') {
        arrayBars[a].style.backgroundColor = Colors.SWAP;
        arrayBars[b].style.backgroundColor = Colors.SWAP;
        swapBars(visualArray, a, b);
      }
      // });
      return setTimeout(resolve, ANIMATION_SPEED);
    });
  }

  function swapBars(actualArr, a, b) {
    const arrayBars = document.getElementsByClassName('array-bar');
    // visual
    const temp = arrayBars[a].style.height;
    arrayBars[a].style.height = arrayBars[b].style.height;
    arrayBars[b].style.height = temp;
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
        {/* <button className="btn" onClick={() => bubbleSort()}>
          Bubble Sort
        </button> */}
        <button className="btn" onClick={() => quickSortWithRightPivot()}>
          Quick Sort (Right Pivot)
        </button>
        {/* <button className="btn" onClick={() => quickSortWithMidPivot()}>
          Quick Sort (Mid Pivot)
        </button>
        <button className="btn" onClick={() => resetArray()}>
          Reset Arrays
        </button> */}
      </div>
    </div>
  );
};

export default Visualiser;
