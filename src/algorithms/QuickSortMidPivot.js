// Reference: https://www.youtube.com/watch?v=COk73cpQbFQ&t=1000s
export function getQuickSortMidPivotProcedures(array) {
  if (array.length <= 1) return array;
  const procedures = [];
  const auxArray = array.slice();
  performQuickSortWithMidPivot(procedures, auxArray, 0, auxArray.length - 1);

  return procedures;
}

export function performQuickSortWithMidPivot(procedures, auxArray, start, end) {
  let pIndex;
  if (auxArray.length > 1) {
    pIndex = partitionWithMidPivot(procedures, auxArray, start, end);
  }

  if (start < pIndex - 1) {
    performQuickSortWithMidPivot(procedures, auxArray, start, pIndex - 1);
  }

  if (pIndex < end) {
    performQuickSortWithMidPivot(procedures, auxArray, pIndex, end);
  }
}

export function partitionWithMidPivot(procedures, auxArray, start, end) {
  let pivot = auxArray[Math.floor((start + end) / 2)]; //middle element
  let right = end;
  let left = start; //pIndex

  while (left <= right) {
    while (auxArray[left] < pivot) {
      left++;
    }
    while (auxArray[right] > pivot) {
      right--;
    }
    if (left <= right) {
      let temp = auxArray[left];
      auxArray[left] = auxArray[right]
      auxArray[right] = temp;
      procedures.push([left, right]);
      left++;
      right--;
    }
  }

  return left;
}
