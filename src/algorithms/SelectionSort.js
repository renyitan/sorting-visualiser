
import { PROCEDURE_TYPE } from '../utils/procedureTypes';

export function getSelectionSortProcedures(array) {
  if (array.length <= 1) return array;
  const procedures = [];
  let auxArray = array.slice();
  performSelectionSort(procedures, auxArray);
  return procedures;
}

function performSelectionSort(procedures, auxArray) {
  let size = auxArray.length;

  for (let i = 0; i < size - 1; i++) {
    let sortedIndex = i;
    for (let j = i + 1; j < size; j++) {
      procedures.push({ type: PROCEDURE_TYPE.COMPARE, between: [j, sortedIndex] });
      if (auxArray[j] < auxArray[sortedIndex]) {
        sortedIndex = j;
      }
    }
    swap(auxArray, i, sortedIndex);
    procedures.push({ type: PROCEDURE_TYPE.SWAP, between: [i, sortedIndex] });
  }
}


function swap(arr, firstIndex, secondIndex) {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}
