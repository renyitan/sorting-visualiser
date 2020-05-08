export function getQuickSortRightPivotProcedures(array) {
  if (array.length <= 1) return array;
  const procedures = [];
  const auxArray = array.slice();
  performQuickSortWithRightPivot(procedures, auxArray, 0, auxArray.length - 1);

  return procedures;
}

function performQuickSortWithRightPivot(procedures, auxArray, start, end) {
  if (start < end) {
    let pIndex = partitionWithRightPivot(procedures, auxArray, start, end);
    performQuickSortWithRightPivot(procedures, auxArray, start, pIndex - 1);
    performQuickSortWithRightPivot(procedures, auxArray, pIndex + 1, end);
  }
}

function partitionWithRightPivot(procedures, auxArray, start, end) {
  let pivot = auxArray[end] // use right most element as pivot
  procedures.push({ type: 'pivot', between: [end, end] });
  let pIndex = start;
  for (let i = start; i < end; i++) {
    procedures.push({ type: 'compare', between: [i, end] });
    if (auxArray[i] < pivot) {
      swap(auxArray, i, pIndex)
      procedures.push({ type: 'swap', between: [i, pIndex] });
      pIndex++;
    }
  }
  swap(auxArray, end, pIndex) // swap pivot (arr[end]) with arr[pIndex]
  procedures.push({ type: 'swap', between: [end, pIndex] });
  return pIndex;
}

function swap(arr, firstIndex, secondIndex) {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}