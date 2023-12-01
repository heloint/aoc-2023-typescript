import { compute } from "./main";

const input: string = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;

const expected: number = 281;
const res: number = compute(input);
if (res !== expected) {
    console.error(`[FAILED] Output must be ${expected}, but it's ${res}`);
} else {
    console.info(`[PASSED]`);
}
