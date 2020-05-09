import { PROCEDURE_TYPE } from '../utils/procedureTypes';
/**
 * Quicksort Hoare Partition Scheme
 * It uses two indices that start at the ends of the array being partitioned, 
 * then move toward each other, until they detect an inversion. 
 * The inverted elements are then swapped. When the indices meet, the algorithm stops 
 * and returns the final index.
 */

// Reference: https://www.bogotobogo.com/Algorithms/quicksort.php
export function getQuickSortMidPivotProcedures(array) {
  if (array.length <= 1) return array;
  const procedures = [];
  const auxArray = array.slice();
  performQuickSortWithMidPivot(procedures, auxArray, 0, auxArray.length - 1);
  return procedures;
}

export function performQuickSortWithMidPivot(procedures, auxArray, start, end) {
  if (start >= end) return;

  let mid = Math.floor((start + end) / 2);
  let pivot = auxArray[mid];
  let left = start;
  let right = end;

  procedures.push({ type: PROCEDURE_TYPE.PIVOT, between: [mid, mid] })

  while (left <= right) {
    while (auxArray[left] < pivot) { left++; }

    while (auxArray[right] > pivot) { right--; }

    procedures.push({ type: PROCEDURE_TYPE.COMPARE, between: [left, right] });
    if (left <= right) {
      swap(auxArray, left, right);
      procedures.push({ type: PROCEDURE_TYPE.SWAP, between: [left, right] });
      left++; right--;
    }
  }

  performQuickSortWithMidPivot(procedures, auxArray, start, right);
  performQuickSortWithMidPivot(procedures, auxArray, left, end);
}

function swap(arr, firstIndex, secondIndex) {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}