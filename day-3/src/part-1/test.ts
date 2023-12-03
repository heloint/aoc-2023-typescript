import { compute } from "./main";

const input: string = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;
const expected: number = 4361;

const res: number = compute(input);
if (res !== expected) {
    console.error(`[FAILED] Output must be ${expected}, but it's ${res}`);
} else {
    console.info(`[PASSED]`);
}
