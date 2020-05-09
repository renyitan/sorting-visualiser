/**
 * Core engine for the animation. 
 * Takes in procedures[] and executes each line of procedure with the corresponding 
 * animations & colour
 */
import { Colors } from '../styles';
import { PROCEDURE_TYPE } from '../utils/procedureTypes';

function swapBars(a, b) {
  const arrayBars = document.getElementsByClassName('array-bar');
  // swap the bars in the document
  const temp = arrayBars[a].style.height;
  arrayBars[a].style.height = arrayBars[b].style.height;
  arrayBars[b].style.height = temp;
}

function markComplete() {
  const arrayBars = document.getElementsByClassName('array-bar');
  for (let i = 0; i < arrayBars.length; i++) {
    arrayBars[i].style.backgroundColor = Colors.BAR_COMPLETED;
  }
}

/** Main exported function */
export async function ProceduresReader(procedures, executionSpeed) {
  const arrayBars = document.getElementsByClassName('array-bar');
  for (let i = 0; i < procedures.length; i++) {
    const [a, b] = procedures[i].between;

    // execute the animation for the procedure
    await ExecuteProcedure(procedures[i], executionSpeed);

    // revert bars back to default color
    arrayBars[a].style.backgroundColor = Colors.BAR_DEFAULT;
    arrayBars[b].style.backgroundColor = Colors.BAR_DEFAULT;

    if (i === procedures.length - 1) {
      markComplete();
    }
  }
}

/**
 * Promise-based with delay so users can see it on screen.
 * Executes the procedure with the corresponding animation based on type. 
 */
async function ExecuteProcedure(procedure, executionSpeed) {
  return new Promise((resolve) => {
    const arrayBars = document.getElementsByClassName('array-bar');
    const [a, b] = procedure.between;
    switch (procedure.type) {
      case PROCEDURE_TYPE.PIVOT:
        arrayBars[a].style.backgroundColor = Colors.PIVOT;
        break;
      case PROCEDURE_TYPE.COMPARE:
        arrayBars[a].style.backgroundColor = Colors.COMPARE;
        arrayBars[b].style.backgroundColor = Colors.COMPARE;
        break;
      case PROCEDURE_TYPE.SWAP:
        arrayBars[a].style.backgroundColor = Colors.SWAP;
        arrayBars[b].style.backgroundColor = Colors.SWAP;
        swapBars(a, b);
        break;
      default:
        break;
    }
    return setTimeout(resolve, executionSpeed);
  });
}