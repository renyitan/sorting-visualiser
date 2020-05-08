import { Colors } from '../styles';

export function swapBars(a, b) {
  const arrayBars = document.getElementsByClassName('array-bar');
  // visual
  const temp = arrayBars[a].style.height;
  arrayBars[a].style.height = arrayBars[b].style.height;
  arrayBars[b].style.height = temp;
}

export function markComplete() {
  const arrayBars = document.getElementsByClassName('array-bar');
  for (let i = 0; i < arrayBars.length; i++) {
    arrayBars[i].style.backgroundColor = Colors.BAR_COMPLETED;
  }
}

export async function proceduresReader(procedures, executionSpeed) {
  const arrayBars = document.getElementsByClassName('array-bar');
  for (let i = 0; i < procedures.length; i++) {
    const [a, b] = procedures[i].between;

    await executeProcedure(procedures[i]);

    // revert bars back to default color
    arrayBars[a].style.backgroundColor = Colors.BAR_DEFAULT;
    arrayBars[b].style.backgroundColor = Colors.BAR_DEFAULT;

    if (i === procedures.length - 1) {
      markComplete();
    }
  }
}

export async function executeProcedure(procedure, executionSpeed) {
  return new Promise((resolve) => {
    const arrayBars = document.getElementsByClassName('array-bar');
    const [a, b] = procedure.between;
    if (procedure.type === 'pivot') {
      arrayBars[a].style.backgroundColor = Colors.PIVOT;
    }
    if (procedure.type === 'compare') {
      arrayBars[a].style.backgroundColor = Colors.COMPARE;
      arrayBars[b].style.backgroundColor = Colors.COMPARE;
    }
    if (procedure.type === 'swap') {
      arrayBars[a].style.backgroundColor = Colors.SWAP;
      arrayBars[b].style.backgroundColor = Colors.SWAP;
      swapBars(a, b);
    }
    return setTimeout(resolve, executionSpeed);
  });
}