
import * as fs from 'fs';
import * as util from 'util';

function sumCalibrationValues(lines: string[]): number {
    let sum = 0;
    const regex = /\d/g; // Regular expression to match digits

    for (let line of lines) {
        let digits = line.match(regex); // Extract all digits from line

        if (digits && digits.length > 0) {
            let firstDigit = digits[0];
            let lastDigit = digits[digits.length - 1];

            // Combine the first and last digit to form a two-digit number
            let calibrationValue = parseInt(firstDigit + lastDigit);

            // Add the calibration value to the total sum
            sum += calibrationValue;
        }
    }

    return sum;
}

function sumCalibrationValuesPt2(lines: string[]): number {
        // Create a mapping object
        const stringDigitMapping: Record<string, string> = {
            'one': 'o1e',
            'two': 't2o',
            'three': 't3e',
            'four': 'f4r',
            'five': 'f5e',
            'six': 's6x',
            'seven': 's7n',
            'eight': 'e8t',
            'nine': 'n9e'
        };
    
        let sum = 0;
        const regexDigit = /\d/g; // Regular expression to match digits
        let lineBefore = '';
        // Sort keys in descending order of length
        const keys = Object.keys(stringDigitMapping).sort((a, b) => b.length - a.length);

        // Replace any instance of the string digits with their corresponding integer values
        for (let line of lines) {
            lineBefore = line
                for (const key of keys) {
                    const regex = new RegExp(key, "gi");
                    line = line.replace(regex, stringDigitMapping[key]);
                }
    
            console.log("Line Before: " + lineBefore);
            console.log("Line After: " + line);
    
    

        let digits = line.match(regexDigit); // Extract all digits from line

        if (digits && digits.length > 0) {
            let firstDigit = digits[0];
            let lastDigit = digits[digits.length - 1];

            // Combine the first and last digit to form a two-digit number
            let calibrationValue = parseInt(firstDigit + lastDigit);
            console.log("Calibration: " + calibrationValue)

            // Add the calibration value to the total sum
            sum += calibrationValue;
        }
        console.log();
    }
    return sum;
 }

function readAndProcessFile(): number {
 
        const data = fs.readFileSync('input.txt','utf-8');
        const lines = data.split('\n');
        return sumCalibrationValues(lines) + " " + sumCalibrationValuesPt2(lines)  ;
}


console.log(readAndProcessFile());