import * as fs from "fs";

function parse(lines: string[]): number {
    let result: number = 0;
    for (const line of lines) {
        const numMatches: RegExpMatchArray | null = line.match(/\d+/g);

        if (!numMatches) {
            continue;
        }

        const joinedNums: string = numMatches.join("");
        const firstChar: string = joinedNums[0];
        const secondChar: string = joinedNums[joinedNums.length - 1];
        result += Number(firstChar + secondChar);
    }
    return result;
}

export function compute(content: string): number {
    const contentLines: string[] = content
        .split("\n")
        .map((line) => line.trim());
    return parse(contentLines);
}

function main(): void {
    const fileContent: string = fs
    .readFileSync("./src/part-1/input.txt", "utf-8")
    .trim();

    console.log(compute(fileContent));
}
main();