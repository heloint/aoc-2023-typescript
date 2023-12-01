import { compute } from "./main";

const input: string = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

const expected: number = 142;
const res: number = compute(input);
if (res !== expected) {
    console.error(`[FAILED] Output must be ${expected}, but it's ${res}`);
} else {
    console.info(`[PASSED]`);
}
