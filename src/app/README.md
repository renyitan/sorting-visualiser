## Working Principles

Implementing the animations was a little tricky because we can't really see the process real-time. The JS V8 engine does it realy fast. 

Instead, what I did here was to make each sorting algorithm return a list of procedures, from which our animation engine will read and execute each line of procedure. 

The procedures include every step of comparison, swapping, selection of pivots (for quick sort), much like how an actual person will manually go through the sorting process. 


## 1. More on Procedures
Every procedure is an object with `type` and `between` key: 
```
procedure = {
  type: string
  between: [int a, int b]
}
```

There are three types: `COMPARE`, `PIVOT` and `SWAP` (found in `src/utils/procedureTypes.js`)

- `COMPARE`: denotes the procedure is a comparison, 
- `PIVOT`: denotes a procedure is a pivot (only used in Quicksort) 
- `SWAP`: denotes a procedure is a swap. 

`between` is a list containing two `int` which are the respective index of the two operands for which the procedure is operating on. 


## 2. Sorting Algorithms
The sorting algorithms are found `src/algorithms`. We will use `BubbleSort.js` as a working example. 

The `getBubbleSortProcedures(arr)` is called from the main app and returns a list of procedures. 

1. We create an auxillary array `auxArray` which is a copy of the actual array to be sorted. The `auxArray` works like a proxy of the actual array. 
2. We pass this auxillary array to a bubble sort sorting algorithm to get the procedure of how to sort the actual array. 
3. At each stage within the sorting process where a comparison happens or swapping happens, we push that into our `procedures` array. 
```
// in BubbleSort.js 
// within the loop, we need to compare auxArr[i] with auxArr[i+1]
...
procedures.push({ type: PROCEDURE_TYPE.COMPARE, between: [i, i + 1] });

if(auxArray[i] > auxArray[i+1]) {
  ...swap and continue loop...
}
```
4. Once the sorting process is complete, we would have captured all the procedures needed for the sorting process.
5. This `procedures` array is then passed into our `VisualiserEngine` which is produces the animation.


## 3. Visualiser Engine

This is the core engine of the visualisation app. 

The main function is the `ProcedureReader()` function which takes in a `procedures[]` array. 
For each of the procedure in the `procedures[]` array, it will add the animation for that particular procedure and revert the the array bars to their default state once the execution is complete. 

When all of the execution is complete, the array must be sorted and it'll change all the color of the bars to `Color.BAR_COMPLETED`.



