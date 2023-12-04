import * as fs from 'fs';

function parseFile(filePath: string): string[][] {
  try {
    // Read the contents of the file synchronously
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Split the file content into lines
    const lines = fileContent.split('\n');

    // Create a 2D array where each section represents one character
    const result: string[][] = lines.map((line) => line.split(''));

    return result;
  } catch (error) {
    console.error(`Error reading or parsing the file: ${error}`);
    return [];
  }
}

// Example usage:
const filePath = 'input.txt';
const parsedArray = parseFile(filePath);

console.log(findParts(parsedArray));
console.log(calculateGearRatios(parsedArray));


function calculateGearRatios(schematic: string[][]): number {
    const numRows = schematic.length;
    const numCols = schematic[0].length;
    let gearProductSum = 0;

    const calculateGearProduct = (row: number, col: number): number => {

      if (schematic[row][col] !== '*') {
        return 0;
      }
      let num1 = 0;
      let num2 = 0;
      let adjacentPartNumbers = 0;
      const directions = [
        { dx: -1, dy: 0 },  // Up
        { dx: 1, dy: 0 },   // Down
        { dx: 0, dy: -1 },  // Left
        { dx: 0, dy: 1 },   // Right
        { dx: -1, dy: -1 }, // Up-Left
        { dx: -1, dy: 1 },  // Up-Right
        { dx: 1, dy: -1 },  // Down-Left
        { dx: 1, dy: 1 },   // Down-Right
      ];
  
      for (const dir of directions) {
        const newRow = row + dir.dx;
        const newCol = col + dir.dy;
  
        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
          const char = schematic[newRow][newCol];
          if (!isNaN(parseInt(char))) {
      
            if (adjacentPartNumbers === 0){
                num1 = getPartNumber(newRow,newCol);
                adjacentPartNumbers++;
            } else if (adjacentPartNumbers === 1){
                //hack so i dont have to make my scanning better, its finding the same number sometime
                    num2 = getPartNumber(newRow,newCol)
                    if (num1 === num2){
                        num2 = 0
                    } else {
                        adjacentPartNumbers++;
                    }
                   
                
           
            }
            
          }
        }
      }
  
      if (adjacentPartNumbers === 2){
        //get the product, return it.
        return num1 * num2;
      } else {
        return 0;
      }
    };

    const getPartNumber = (row: number, col: number): number | null => {
        const partNumberStr = [];
    
        // Iterate left to find the leftmost digit
        let left = col;
        while (left >= 0 && !isNaN(parseInt(schematic[row][left]))) {
          partNumberStr.unshift(schematic[row][left]);
          left--;
        }
    
        // Iterate right to find the rightmost digit
        let right = col + 1;
        while (right < numCols && !isNaN(parseInt(schematic[row][right]))) {
          partNumberStr.push(schematic[row][right]);
          right++;
        }
    
        return partNumberStr.length > 0 ? parseInt(partNumberStr.join(''), 10) : null;
      };


      let totalGearRatios = 0;
  
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          gearProductSum += calculateGearProduct(i,j)
        }
      }
    
      return gearProductSum;


  }

  
  


function is_numeric_char(c:string) { return /\d/.test(c); }


type Index = {
    x: number;
    y: number;
  };


  function hasAdjacentNonDotOrDigit(matrix: string[][], x: number, y: number): boolean {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
  
    const isOutOfBounds = (row: number, col: number): boolean => {
      return row < 0 || row >= numRows || col < 0 || col >= numCols;
    };
  
    const directions = [
      { dx: -1, dy: 0 },  // Up
      { dx: 1, dy: 0 },   // Down
      { dx: 0, dy: -1 },  // Left
      { dx: 0, dy: 1 },   // Right
      { dx: -1, dy: -1 }, // Up-Left
      { dx: -1, dy: 1 },  // Up-Right
      { dx: 1, dy: -1 },  // Down-Left
      { dx: 1, dy: 1 },   // Down-Right
    ];
  
    for (const dir of directions) {
      const newX = x + dir.dx;
      const newY = y + dir.dy;
  
      if (!isOutOfBounds(newX, newY) && (matrix[newX][newY] !== '.' && isNaN(parseInt(matrix[newX][newY])))) {
        return true;
      }
    }
  
    return false;
  }

function findParts(engineArray:string[][]): number {
    let partSum = 0;
    const indexesWithNumbers:Index[] = [];
    let charNumBuffer= "";
    for(var i = 0; i < engineArray.length; i++) {
        var row = engineArray[i];
      
        for(var j = 0; j < row.length; j++) {
            let currentChar = engineArray[i][j];
         
            //Keep movin if its a dot and charBuffer is empty.
            if (currentChar == '.' && charNumBuffer.length == 0){
                continue;
            }

            //End of a number if buffer has values, means we need to check some stuff.
            if ( (currentChar == '.' || !is_numeric_char(currentChar)) && charNumBuffer.length > 0){
                //Alright, this means we've read a number across some number of rows/cols...we now need to check if any digit is is adjacent to a special character via the indexeswithNumbers array.
                for(var indexToCheck of indexesWithNumbers){
                    //Check all directions, if we find anything besides a '.' or '<digit'> in all of the directions....then we count the number from buffer.
                    if (hasAdjacentNonDotOrDigit(engineArray,indexToCheck.x,indexToCheck.y)){
                        partSum += parseInt(charNumBuffer,10);
                        break
                    }

                }

                //Clear our buffers.
                charNumBuffer = "";
                indexesWithNumbers.length = 0;
                continue;

            }

            //add to charBuffer and list of indxes to check for special symbols.
            if (is_numeric_char(currentChar) ){
                charNumBuffer = charNumBuffer.concat(currentChar);
                indexesWithNumbers.push({x: i,y: j})
                continue;
            }
        }
    }
    return partSum;
}




