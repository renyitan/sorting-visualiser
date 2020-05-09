
import { PROCEDURE_TYPE } from '../utils/procedureTypes';
// References: https://www.geeksforgeeks.org/heap-sort/

export function getHeapSortProcedures(array) {
  if (array.length <= 1) return array;
  const procedures = [];
  let auxArray = array.slice();
  performHeapSort(procedures, auxArray);
  return procedures;
}

function performHeapSort(procedures, auxArray) {

  let size = auxArray.length;

  // Build max heap (rearrange array) 
  for (let i = Math.floor((size / 2) - 1); i >= 0; i--) {
    heapify(procedures, auxArray, size, i);
  }

  // One by one extract an element from heap 
  for (let i = size - 1; i > 0; i--) {
    // Move current root to end 
    swap(auxArray, 0, i);
    procedures.push({ type: PROCEDURE_TYPE.SWAP, between: [0, i] });
    // call max heapify on the reduced heap 
    heapify(procedures, auxArray, i, 0);
  }
}

// To heapify a subtree rooted with node i which is 
// an index in arr[]. n is size of heap 
function heapify(procedures, auxArray, size, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // see if child of root exist and whether it's greater than root
  if (left < size && auxArray[left] > auxArray[largest]) {
    largest = left;
  }

  if (right < size && auxArray[right] > auxArray[largest]) {
    largest = right;
  }

  if (largest !== i) {
    swap(auxArray, i, largest);
    procedures.push({ type: PROCEDURE_TYPE.SWAP, between: [i, largest] });
    // Recursively heapify the affected sub - tree
    heapify(procedures, auxArray, size, largest);
  }
}

function swap(arr, firstIndex, secondIndex) {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}
