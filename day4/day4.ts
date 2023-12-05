import * as fs from 'fs';
import * as util from 'util';

function readAndProcessFile(): number {
 
    const data = fs.readFileSync('input.txt','utf-8');
    const lines = data.split('\n');

    console.log(scratchCardScore(lines));
    console.log(scratchCardScorePt2(lines));

}

function scratchCardScore(lines: string[]): number {
    let allGamesSum = 0;
  
    for (let game of lines) {
        let individualGameSum = 0;
        const duplicates = new Set();
        //Drop the game
        let scratchNumbersOnly = game.substring(game.indexOf(':') + 2);

        let winningNumbers = scratchNumbersOnly.slice(0,scratchNumbersOnly.indexOf("|")).trim()
        let pickedNumbers = scratchNumbersOnly.slice(scratchNumbersOnly.indexOf("|")+1,scratchNumbersOnly.length).trim()

        let winningNumbersArray = winningNumbers.split(/\s+/).map(Number);
        let pickedNumbersArray = pickedNumbers.split(/\s+/).map(Number);

   
        for (const number of winningNumbersArray) {
          if (duplicates.has(number)) {
            //Don't add if theres a dupe in winning numbers
          } else {
            duplicates.add(number);
          }
        }

        //console.log(scratchNumbers);
        for (const number of pickedNumbersArray) {
            if (duplicates.has(number)) {
            //Don't add if theres a dupe in winning numbers
                if(individualGameSum == 0 ){
                    individualGameSum = 1;
                } else {
                    individualGameSum = individualGameSum * 2;
                }
            }
           
        }

        //One game finished
        allGamesSum += individualGameSum;
    }


    return allGamesSum;
}

function scratchCardScorePt2(lines: string[]): number {
    let allGamesSum = 0;
    let cardIndex = 0;
    const arrayLength = lines.length; // Specify the desired length of the array
    const cardArray: number[] = Array.from({ length: arrayLength }, () => 1);
    for (let game of lines) {
        let numGameMatches = 0;
        const duplicates = new Set();
        //Drop the game
        let scratchNumbersOnly = game.substring(game.indexOf(':') + 2);

        let winningNumbers = scratchNumbersOnly.slice(0,scratchNumbersOnly.indexOf("|")).trim()
        let pickedNumbers = scratchNumbersOnly.slice(scratchNumbersOnly.indexOf("|")+1,scratchNumbersOnly.length).trim()

        let winningNumbersArray = winningNumbers.split(/\s+/).map(Number);
        let pickedNumbersArray = pickedNumbers.split(/\s+/).map(Number);

   
        for (const number of winningNumbersArray) {
          if (duplicates.has(number)) {
            //Don't add if theres a dupe in winning numbers
          } else {
            duplicates.add(number);
          }
        }

        //console.log(scratchNumbers);
        for (const number of pickedNumbersArray) {
            if (duplicates.has(number)) {
                numGameMatches += 1;
            }
           
        }

        //One game finished, we know how many matches...we now need to duplicate the number of cards...
        for (let c = 0; c < cardArray[cardIndex]; c++) {
            for(var i=cardIndex+1; i <= cardIndex+ numGameMatches;i++){
                cardArray[i] += 1;
            }
         }  
        
        cardIndex +=1;
        //console.log(cardArray);
    }

    //console.log(cardArray);
    for(var i=0; i < cardArray.length;i++){
        allGamesSum += cardArray[i];
    }
    return allGamesSum;
}

readAndProcessFile();