import * as fs from "fs";

type GameRecord = Record<string, Record<string, number>[]>;
type GameRecordMaxNumSummary = Record<string, Record<string, number>>;

function getContentLines(content: string): string[] {
    return content
        .split("\n")
        .filter((x) => x)
        .map((line) => line.trim());
}

function getRecordMap(lines: string[]): GameRecord {
    const recordMap: GameRecord = {};
    for (const line of lines) {
        const tmpArray: Record<string, number>[] = [];
        const idRecordsSplit: string[] = line.split(":");
        const gameID: string = idRecordsSplit[0].split(" ")[1].trim();
        const gameRounds: string[] = idRecordsSplit[1].split(";");
        const gameRoundsSplit: string[][] = gameRounds.map((round) =>
            round.split(",").map((x) => x.trim()),
        );

        for (const round of gameRoundsSplit) {
            const tmpObject: Record<string, number> = {};
            for (const pulled of round) {
                const pulledSplit: string[] = pulled
                    .split(" ")
                    .map((x) => x.trim());
                const color: string = pulledSplit[1];
                const quantity: number = Number(pulledSplit[0]);
                tmpObject[color] = quantity;
            }
            tmpArray.push(tmpObject);
        }
        recordMap[gameID] = tmpArray;
    }
    return recordMap;
}

function getMaxColorNums(recordMap: GameRecord): GameRecordMaxNumSummary {
    const maxColorNums: GameRecordMaxNumSummary = {};

    for (const [key, value] of Object.entries(recordMap)) {
        const tmpMaxNums: Record<string, number> = {};
        for (const round of value) {
            for (const [color, num] of Object.entries(round)) {
                const currentColor: number | null = tmpMaxNums[color] ?? 0;
                if (num > currentColor) {
                    tmpMaxNums[color] = num;
                }
            }
        }
        maxColorNums[key] = tmpMaxNums;
    }
    return maxColorNums;
}

function getMultiplications(maxNumSummary: GameRecordMaxNumSummary): number[] {
    const multiplications: number[] = [];
    for (const [key, minNums] of Object.entries(maxNumSummary)) {
        const tmpMultiplications: number = Object.values(minNums).reduce(
            (a, b) => a * b,
            1,
        );
        multiplications.push(tmpMultiplications);
    }
    return multiplications;
}

export function compute(content: string): number {
    const contentLines: string[] = getContentLines(content);
    const recordMap: GameRecord = getRecordMap(contentLines);
    const maxColorNums: GameRecordMaxNumSummary = getMaxColorNums(recordMap);
    const multiplications: number[] = getMultiplications(maxColorNums);
    const result: number = multiplications.reduce((a, b) => a + b, 0);

    return result;
}

function main() {
    const fileContent: string = fs
        .readFileSync("./src/part-1/input.txt", "utf-8")
        .trim();

    const res: number = compute(fileContent);
    console.log(res);
}

main();
