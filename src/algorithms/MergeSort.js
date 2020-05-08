import { PROCEDURE_TYPE } from '../utils/procedureTypes';

export function getMergeSortProcedures(array) {
  if (array.length <= 1) return array;
  const procedures = [];
  let auxArray = array.slice();
  auxArray = performMergeSort(procedures, auxArray);
  console.log(procedures);
  return procedures;
}

function performMergeSort(procedures, auxArray) {
  // base case
  if (auxArray.length <= 1) return auxArray;

  let mid = Math.floor((0 + auxArray.length) / 2);
  let left = auxArray.slice(0, mid);
  let right = auxArray.slice(mid);

  return merge(procedures, performMergeSort(procedures, left), performMergeSort(procedures, right));
}

function merge(procedures, left, right) {
  let leftIndex = 0,
    rightIndex = 0,
    results = [];

  while (leftIndex < left.length && rightIndex < right.length) {
    procedures.push({ type: PROCEDURE_TYPE.COMPARE, between: [leftIndex, rightIndex] })
    if (left[leftIndex] < right[rightIndex]) {
      results.push(left[leftIndex]);
      leftIndex++;
    }
    else {
      results.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    results.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    results.push(right[rightIndex]);
    rightIndex++;
  }

  return results;
}