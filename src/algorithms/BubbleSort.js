export function getBubbleSortProcedures(arr) {
  const procedures = [];
  if (arr.lengh <= 1) return arr;
  const auxArray = arr.slice();
  let runLoop;
  do {
    runLoop = false;
    for (let i = 0; i < auxArray.length - 1; i++) {
      procedures.push({ type: 'compare', between: [i, i + 1] });
      if (auxArray[i] > auxArray[i + 1]) {
        swap(auxArray, i, i + 1);
        procedures.push({ type: 'swap', between: [i, i + 1] });
        runLoop = true;
      }
    }
  } while (runLoop);
  return procedures;
}

function swap(arr, firstIndex, secondIndex) {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}