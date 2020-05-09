import React, { useState, useEffect } from 'react';

import { ProceduresReader } from './VisualiserCore';
import { generateRandomNumber } from '../utils/generators';
import { getQuickSortRightPivotProcedures } from '../algorithms/QuickSortRightPivot';
import { getQuickSortMidPivotProcedures } from '../algorithms/QuickSortMidPivot';
import { getBubbleSortProcedures } from '../algorithms/BubbleSort';
import { getMergeSortProcedures } from '../algorithms/MergeSort';
import { getHeapSortProcedures } from '../algorithms/HeapSort';
import { getSelectionSortProcedures } from '../algorithms/SelectionSort';
import { getInsertionSortProcedures } from '../algorithms/InsertionSort';

import './Visualiser.css';
import { Colors } from '../styles';

const ANIMATION_SPEED = 0.1;
const MIN_NUM_ARRAYS = 50;
const MAX_NUM_ARRAYS = 800;

const Visualiser = () => {
  const [visualArray, updateArray] = useState(() => []);
  const [sliderValue, updateSliderValue] = useState(
    (MAX_NUM_ARRAYS + MIN_NUM_ARRAYS) / 2
  );
  const [isRunning, updateIsRunning] = useState(false);

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


  /** SORTING FUNCTIONS */
  async function quickSortWithRightPivot() {
    const procedures = getQuickSortRightPivotProcedures(visualArray);
    await ProceduresReader(procedures, ANIMATION_SPEED);
    updateIsRunning(false);
  }

  async function quickSortWithMidPivot() {
    const procedures = getQuickSortMidPivotProcedures(visualArray);
    await ProceduresReader(procedures, ANIMATION_SPEED);
    updateIsRunning(false);
  }

  async function mergeSort() {
    const procedures = getMergeSortProcedures(visualArray);
    await ProceduresReader(procedures, ANIMATION_SPEED);
    updateIsRunning(false);
  }

  async function bubbleSort() {
    const procedures = getBubbleSortProcedures(visualArray);
    await ProceduresReader(procedures, ANIMATION_SPEED);
    updateIsRunning(false);
  }

  async function heapSort() {
    const procedures = getHeapSortProcedures(visualArray);
    await ProceduresReader(procedures, ANIMATION_SPEED);
    updateIsRunning(false);
  }

  async function selectionSort() {
    const procedures = getSelectionSortProcedures(visualArray);
    await ProceduresReader(procedures, ANIMATION_SPEED);
    updateIsRunning(false);
  }
  async function insertionSort() {
    const procedures = getInsertionSortProcedures(visualArray);
    await ProceduresReader(procedures, ANIMATION_SPEED);
    updateIsRunning(false);
  }

  return (
    <div className="visualiser-layout">
      <h1>Sorting Visualiser</h1>
      <p>By Renyi Tan</p>
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
        <div className="slider-group">
          <div className="slider">
            <input
              type="range"
              min={MIN_NUM_ARRAYS}
              max={MAX_NUM_ARRAYS}
              value={sliderValue}
              onChange={(event) => {
                updateSliderValue(event.target.value);
                resetArray();
              }}
              disabled={isRunning}
            />
            <span>{sliderValue}</span>
          </div>
        </div>
        <div className="button-group">
          <button
            className="btn"
            onClick={() => {
              bubbleSort();
              updateIsRunning(true);
            }}
            disabled={isRunning}
          >
            Bubble Sort
          </button>
          <button
            className="btn"
            onClick={() => {
              selectionSort();
              updateIsRunning(true);
            }}
            disabled={isRunning}
          >
            Selection Sort
          </button>
          <button
            className="btn"
            onClick={() => {
              insertionSort();
              updateIsRunning(true);
            }}
            disabled={isRunning}
          >
            Insertion Sort
          </button>
          <button
            className="btn"
            onClick={() => {
              mergeSort();
              updateIsRunning(true);
            }}
            disabled={isRunning}
          >
            Merge Sort
          </button>
          <button
            className="btn"
            onClick={() => {
              heapSort();
              updateIsRunning(true);
            }}
            disabled={isRunning}
          >
            Heap Sort
          </button>
          <button
            className="btn"
            onClick={() => {
              quickSortWithRightPivot();
              updateIsRunning(true);
            }}
            disabled={isRunning}
          >
            Quick Sort (Lomuto)
          </button>
          <button
            className="btn"
            onClick={() => {
              quickSortWithMidPivot();
              updateIsRunning(true);
            }}
            disabled={isRunning}
          >
            Quick Sort (Hoare)
          </button>
        </div>
        <div className="reset-container">
          <button
            className="btn"
            style={{ maxHeight: 20, marginTop: 5 }}
            onClick={() => {
              resetArray();
            }}
            disabled={isRunning}
          >
            Reset Arrays
          </button>
        </div>
      </div>
    </div>
  );
};

export default Visualiser;
