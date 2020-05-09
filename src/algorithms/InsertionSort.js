
import { PROCEDURE_TYPE } from '../utils/procedureTypes';

export function getInsertionSortProcedures(array) {
  if (array.length <= 1) return array;
  const procedures = [];
  let auxArray = array.slice();
  performInsertionSort(procedures, auxArray);
  console.log(procedures);
  return procedures;
}

function performInsertionSort(procedures, auxArray) {
  let size = auxArray.length;
  for (let i = 1; i < size; ++i) {
    let key = auxArray[i];
    let j = i - 1;

    procedures.push({ type: PROCEDURE_TYPE.COMPARE, between: [j, i] });
    while (j >= 0 && auxArray[j] > key) {
      auxArray[j + 1] = auxArray[j];
      procedures.push({ type: PROCEDURE_TYPE.SWAP, between: [j+1, j] });
      j--;
    }
    auxArray[j + 1] = key;
  }

}