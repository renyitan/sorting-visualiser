export function getBubbleSortProcedures(arr) {
  const procedures = [];
  if (arr.lengh <= 1) return arr;
  const auxArray = arr.slice();
  let swap;
  do {
    swap = false;
    for (let i = 0; i < auxArray.length - 1; i++) {
      if (auxArray[i] > auxArray[i + 1]) {
        const temp = auxArray[i];
        auxArray[i] = auxArray[i + 1];
        auxArray[i + 1] = temp;
        procedures.push([i, i + 1]);
        swap = true;
      }
    }
  } while (swap);
  return procedures;
}