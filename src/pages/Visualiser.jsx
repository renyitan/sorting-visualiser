import React, { useState } from 'react';
import './Visualiser.css';

const barArray = [];

for (let i = 0; i < 100; i++) {
  const num = generateRandomNumber(1, 500);
  barArray.push(num);
}

function yielder() {
  setTimeout(() => {
    return Math.floor(Math.random() * 100) + 1;
  }, 1000);
}

let num = 0;

const Visualiser = () => {
  const [start, updateStart] = useState(false);

  let [animationArr] = useState([]);

  while (start) {
    console.log('hi');
    setTimeout(() => {
      num++;
    }, 1000);

    if (num >= 10) {
      break;
    }
  }

  return (
    <div>
      Hello
      <div className="array-container">
        {animationArr.map((i, idx) => (
          <div className="array-bar" key={idx} style={{ height: i }} />
        ))}
      </div>
      <div>
        <button onClick={() => updateStart(true)}>Add</button>
      </div>
    </div>
  );
};

function generateRandomNumber(start, end) {
  return Math.floor(Math.random() * end) + start;
}

function bubbleSort(arr) {
  let sorted = arr;
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i; j < sorted.length; j++) {
      if (sorted[i] > sorted[j]) {
        const temp = sorted[i];
        sorted[i] = arr[j];
        sorted[j] = temp;
      }
    }
  }
  return sorted;
}

function isSorted(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i + 1] < array[i]) {
      return false;
    } else {
      return true;
    }
  }
}

export default Visualiser;
