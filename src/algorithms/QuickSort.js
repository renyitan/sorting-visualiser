// Reference: https://www.youtube.com/watch?v=COk73cpQbFQ&t=1000s
export function getQuickSortProcedures(array) {
  if (array.length <= 1) return array;
  const procedures = [];
  const auxArray = array.slice();
  performQuickSort(procedures, auxArray, 0, auxArray.length - 1);
  return procedures;
}

export function performQuickSort(procedures, auxArray, start, end) {
  if (start < end) {
    let pIndex = partition(procedures, auxArray, start, end);
    performQuickSort(procedures, auxArray, start, pIndex - 1);
    performQuickSort(procedures, auxArray, pIndex + 1, end);
  }
}

export function partition(procedures, auxArray, start, end) {
  // use right most element as pivot
  let pivot = auxArray[end]
  let pIndex = start;
  for (let i = start; i < end; i++) {
    if (auxArray[i] < pivot) {
      // swap A[i] and A[pIndex]
      let temp = auxArray[i];
      auxArray[i] = auxArray[pIndex];
      auxArray[pIndex] = temp;
      // add affected indices into procedures array
      procedures.push([i, pIndex]);
      pIndex++;
    }
  }
  // swap pivot (arr[end]) with arr[pIndex]
  let temp = auxArray[end];
  auxArray[end] = auxArray[pIndex]
  auxArray[pIndex] = temp;
  procedures.push([pIndex, end]);

  return pIndex;
}
