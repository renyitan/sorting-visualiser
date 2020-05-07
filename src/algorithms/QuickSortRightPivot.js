// Reference: https://www.youtube.com/watch?v=COk73cpQbFQ&t=1000s
export function getQuickSortRightPivotProcedures(array) {
  if (array.length <= 1) return array;
  const procedures = [];
  const auxArray = array.slice();
  performQuickSortWithRightPivot(procedures, auxArray, 0, auxArray.length - 1);
  return procedures;
}

export function performQuickSortWithRightPivot(procedures, auxArray, start, end) {
  if (start < end) {
    let pIndex = partitionWithRightPivot(procedures, auxArray, start, end);
    performQuickSortWithRightPivot(procedures, auxArray, start, pIndex - 1);
    performQuickSortWithRightPivot(procedures, auxArray, pIndex + 1, end);
  }
}

export function partitionWithRightPivot(procedures, auxArray, start, end) {
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
