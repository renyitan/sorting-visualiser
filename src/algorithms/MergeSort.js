// References: https://github.com/bakeraj4/In-Place-Merge-Sort/blob/master/mergeMain.java
import { PROCEDURE_TYPE } from '../utils/procedureTypes';

export function getMergeSortProcedures(array) {
  if (array.length <= 1) return array;
  const procedures = [];
  let auxArray = array.slice();
  performMergeSort(procedures, auxArray, 0, auxArray.length - 1);
  return procedures;
}

function performMergeSort(procedures, auxArray, start, end) {
  // base case
  // only one element
  if (end - start === 0) { }
  // only two elements, swap them
  else if (end - start === 1) {
    procedures.push({ type: PROCEDURE_TYPE.COMPARE, between: [start, end] });
    if (auxArray[start] > auxArray[end]) {
      swap(auxArray, start, end);
      procedures.push({ type: PROCEDURE_TYPE.SWAP, between: [start, end] });
    }
  }
  else {
    let mid = Math.floor((start + end) / 2);
    performMergeSort(procedures, auxArray, start, mid);
    performMergeSort(procedures, auxArray, mid + 1, end);
    merge(procedures, auxArray, start, end, mid)
  }
}

function merge(procedures, auxArray, start, end, mid) {
  let i = start;
  while (i <= mid) {
    procedures.push({ type: PROCEDURE_TYPE.COMPARE, between: [i, mid + 1] });
    if (auxArray[i] > auxArray[mid + 1]) {
      swap(auxArray, i, mid + 1);
      procedures.push({ type: PROCEDURE_TYPE.SWAP, between: [i, mid + 1] });
      push(procedures, auxArray, mid + 1, end);
    }
    i++;
  }
}

function swap(arr, firstIndex, secondIndex) {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

function push(procedures, arr, start, end) {
  for (let i = start; i < end; i++) {
    if (arr[i] > arr[i + 1]) {
      // procedures.push({ type: PROCEDURE_TYPE.COMPARE, between: [i, i + 1] });
      swap(arr, i, i + 1);
      procedures.push({ type: PROCEDURE_TYPE.SWAP, between: [i, i + 1] });
    }
  }
}