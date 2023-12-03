
import * as fs from 'fs';
import * as util from 'util';

function retNum(str:string):number { 
    var num = str.replace(/[^0-9]/g, ''); 
    return parseInt(num,10); 
}

function possibleGames(lines: string[],redCubes:number,greenCubes:number,blueCubes:number): number {
    let gameSum = 0;
    let gameID = 0;
  
    const dictionary = new Map<string, number>();
    for (let line of lines) {
        let rBool,gBool,bBool = false;
        //GetGameInfo
        const gameInfo = line.split(':');
        if(gameInfo){
            gameID = retNum(gameInfo[0]);
        }

        const games = gameInfo[1].split(';');
        for (const game of games) {
                //console.log(game);
                const colors: Record<string, number> = {};
                const colorTokens = game.split(', ').map(function(item) {
                    return item.trim();
                  });
                
                for (const token of colorTokens) {
                    const [count, color] = token.split(' ');
                    
                    colors[color.toLowerCase()] = parseInt(count, 10);
                }

                console.log(gameID + " " +game)
                console.log(colors);
                //check the values..
                if (colors["red"] > redCubes ) {
                    rBool = true;
                }
                if (colors["green"] > greenCubes ) {
                    gBool = true;
                }
                if (colors["blue"] > blueCubes ) {
                    bBool = true;
                }
       
        }

        if (!rBool && !gBool && !bBool){
            console.log(gameID)
            gameSum += gameID;
        }

    }
    return gameSum;

}


function possibleGamePt2(lines: string[]): number {
    let gameSum = 0;
    let gameID = 0;
  
    const dictionary = new Map<string, number>();
    for (let line of lines) {
        let rBool,gBool,bBool = false;
        //GetGameInfo
        const gameInfo = line.split(':');
        if(gameInfo){
            gameID = retNum(gameInfo[0]);
        }


        const minColor: Record<string,number> = {};
        minColor["red"] = 0;
        minColor["green"] = 0;
        minColor["blue"] = 0;
        const pulls = gameInfo[1].split(';');
        for (const pull of pulls) {
                const colors: Record<string, number> = {};
                const colorTokens = pull.split(', ').map(function(item) {
                    return item.trim();
                  });
                
                for (const token of colorTokens) {
                    const [count, color] = token.split(' ');
                    
                    colors[color.toLowerCase()] = parseInt(count, 10);
                }

              
                //check the values..
                if (colors["red"] >= minColor["red"]) {
                    minColor["red"] = colors["red"];
                    
                }

                if (colors["blue"] >= minColor["blue"]) {
                    minColor["blue"] = colors["blue"];
                    
                }

                if (colors["green"] >= minColor["green"]) {
                    minColor["green"] = colors["green"];
                }
       
        }
        console.log(gameID);
        console.log(minColor);
        gameSum += minColor["red"] * minColor["green"] * minColor["blue"]
        console.log(gameSum)

    }
    return gameSum;

}

function readAndProcessFile(): number {
 
        const data = fs.readFileSync('input.txt','utf-8');
        const lines = data.split('\n');
        //return possibleGames(lines,12,13,14);
        return possibleGamePt2(lines);

}


console.log(readAndProcessFile());
