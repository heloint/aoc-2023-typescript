import * as fs from "fs";

type Coordinates = {
    y: number;
    x: number;
};

type DirectionCoordinates = {
    top: Coordinates;
    topRight: Coordinates;
    right: Coordinates;
    downRight: Coordinates;
    down: Coordinates;
    downLeft: Coordinates;
    left: Coordinates;
    topLeft: Coordinates;
};

function getContentLines(content: string): string[] {
    return content
        .split("\n")
        .filter((x) => x)
        .map((line) => line.trim());
}

function getMatrixFromLines(lines: string[]): string[][] {
    return lines.map((line) => line.split(""));
}

function getSymbolCoordinates(matrix: string[][]): Coordinates[] {
    const indexes: Coordinates[] = [];
    for (let row_index: number = 0; row_index < matrix.length; row_index++) {
        const row: string[] = matrix[row_index];
        for (
            let field_index: number = 0;
            field_index < matrix.length;
            field_index++
        ) {
            const field: string = row[field_index];
            const isSymbol: boolean = isNaN(Number(field)) && field !== ".";

            if (isSymbol) {
                indexes.push({ x: row_index, y: field_index });
            }
        }
    }
    return indexes;
}

function getDirectionCoordinates(
    matrix: string[][],
    centerCoordinates: Coordinates
): DirectionCoordinates {
    const maxRowIndex: number = matrix.length - 1;
    const maxColIndex: number = matrix[0].length - 1;

    return {
        top: {
            y: Math.max(centerCoordinates.x - 1, 0),
            x: centerCoordinates.y,
        },
        topRight: {
            y: Math.max(centerCoordinates.x - 1, 0),
            x: Math.min(centerCoordinates.y + 1, maxColIndex),
        },
        right: {
            y: centerCoordinates.x,
            x: Math.min(centerCoordinates.y + 1, maxColIndex),
        },
        downRight: {
            y: Math.min(centerCoordinates.x + 1, maxRowIndex),
            x: Math.min(centerCoordinates.y + 1, maxColIndex),
        },
        down: {
            y: Math.min(centerCoordinates.x + 1, maxRowIndex),
            x: centerCoordinates.y,
        },
        downLeft: {
            y: Math.min(centerCoordinates.x + 1, maxRowIndex),
            x: Math.max(centerCoordinates.y - 1, 0),
        },
        left: {
            y: centerCoordinates.x,
            x: Math.max(centerCoordinates.y + 1, 0),
        },
        topLeft: {
            y: Math.max(centerCoordinates.x - 1, 0),
            x: Math.max(centerCoordinates.y - 1, 0),
        },
    };
}

function parseNeighboursForNumbers(
    matrix: string[][],
    coordinates: Coordinates
): Coordinates[] {
    const numCoordinates: Coordinates[] = [];
    const directionCoordinates: DirectionCoordinates = getDirectionCoordinates(
        matrix,
        coordinates
    );
    for (const direction of Object.values(directionCoordinates)) {
        const neighbourItem: number = Number(matrix[direction.y][direction.x]);

        if (!isNaN(neighbourItem)) {
            numCoordinates.push(direction);
        }
    }
    return numCoordinates;
}

function getLeftSideOfNum(
    matrix: string[][],
    numCoordinates: Coordinates
): string {
    let leftSideDigits: string = "";
    let xAxisCoordinate: number = numCoordinates.x - 1;
    let currentValue: number = Number(
        matrix[numCoordinates.y][xAxisCoordinate]
    );
    while (xAxisCoordinate >= 0 && !isNaN(currentValue) || !isNaN(currentValue)) {
        leftSideDigits = currentValue + leftSideDigits;
        xAxisCoordinate -= 1;
        currentValue = Number(
            matrix[numCoordinates.y][xAxisCoordinate]
        );

    }
    return leftSideDigits;
}


function getRightSideOfNum(
    matrix: string[][],
    numCoordinates: Coordinates
): string {
    const maxXAxis: number = matrix[0].length;
    let rigthSideDigits: string = "";
    let xAxisCoordinate: number = numCoordinates.x + 1;
    let currentValue: number = Number(
        matrix[numCoordinates.y][xAxisCoordinate]
    );
    while (xAxisCoordinate <= maxXAxis && !isNaN(currentValue) || !isNaN(currentValue)) {
        rigthSideDigits = rigthSideDigits + currentValue;
        xAxisCoordinate += 1;
        currentValue = Number(
            matrix[numCoordinates.y][xAxisCoordinate]
        );
    }
    return rigthSideDigits;
}

export function compute(content: string): number {
    const contentLines: string[] = getContentLines(content);
    const matrix: string[][] = getMatrixFromLines(contentLines);
    const symbolCoordinates: Coordinates[] = getSymbolCoordinates(matrix);
    const foundNumberNeighbours: Coordinates[][] = symbolCoordinates
        .map((coord) => parseNeighboursForNumbers(matrix, coord))
        .filter((x) => x.length > 0);

    // Testy
    console.log(getLeftSideOfNum(matrix, foundNumberNeighbours[0][0]));
    // console.log(completeNumberToRight(matrix, foundNumberNeighbours[0][0]));
    


    return 0;
}

function main() {
    const fileContent: string = fs
        .readFileSync("./src/part-1/input.txt", "utf-8")
        .trim();

    const res: number = compute(fileContent);
    console.log(res);
}

// main();
