import * as fs from "fs";

enum NumsAsWord {
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
}

type NumsAsWordsDictionary = {
    [key in keyof typeof NumsAsWord]: number;
};

function parse(lines: string[], numsAsWords: NumsAsWordsDictionary): number {
    let result: number = 0;
    for (const line of lines) {
        const foundNumbers: number[] = [];
        for (let i = 0; i < line.length; i++) {
            for (let j = i + 1; j < line.length + 1; j++) {
                const kmer: string = line.slice(i, j);
                const wordToNum: number | null =
                    numsAsWords[kmer as keyof typeof NumsAsWord];
                const chartToNum: number = Number(kmer[0]);
                if (!isNaN(chartToNum)) {
                    foundNumbers.push(chartToNum);
                } else if (wordToNum) {
                    foundNumbers.push(wordToNum);
                }
            }
        }
        const foundNumbersAsArray: number[] = Array.from(foundNumbers);
        const firstNumber: number = foundNumbersAsArray[0];
        const lastNumber: number =
            foundNumbersAsArray[foundNumbersAsArray.length - 1];
        result += Number(`${firstNumber}${lastNumber}`);
    }
    return result;
}

export function compute(content: string): number {
    const numsAsWords: NumsAsWordsDictionary = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
    };

    const contentLines: string[] = content
        .split("\n")
        .map((line) => line.trim())
        .filter((x) => x);

    return parse(contentLines, numsAsWords);
}

function main(): void {
    const fileContent: string = fs
        .readFileSync("./src/part-2/input.txt", "utf-8")
        .trim();

    console.log(compute(fileContent));
}
main();
