import * as fs from "fs";

type GameRecord = Record<string, Record<string, number>[]>;
type GameRecordMaxNumSummary = Record<string, Record<string, number>>;
export type BagContent = Record<string, number>;

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

function getPossibleGames(
    maxColorNums: GameRecordMaxNumSummary,
    bagContent: BagContent,
) {
    const possibleGames: string[] = Object.keys(maxColorNums);
    for (const [key, value] of Object.entries(maxColorNums)) {
        for (const [color, num] of Object.entries(value)) {
            const bagMaxNum: number = bagContent[color];

            if (num > bagMaxNum) {
                const index: number = possibleGames.indexOf(key);
                if (index > -1) {
                    possibleGames.splice(index, 1);
                }
            }
        }
    }
    return possibleGames;
}

export function compute(content: string, bagContent: BagContent): number {
    const contentLines: string[] = getContentLines(content);
    const recordMap: GameRecord = getRecordMap(contentLines);
    const maxColorNums: GameRecordMaxNumSummary = getMaxColorNums(recordMap);
    const possibleGames: string[] = getPossibleGames(maxColorNums, bagContent);
    const result: number = possibleGames.reduce(
        (a, b) => Number(a) + Number(b),
        0,
    );
    return result;
}

function main() {
    const fileContent: string = fs
        .readFileSync("./src/part-1/input.txt", "utf-8")
        .trim();

    const bagContent: BagContent = {
        red: 12,
        green: 13,
        blue: 14,
    };

    const res: number = compute(fileContent, bagContent);
    console.log(res);
}

main();
