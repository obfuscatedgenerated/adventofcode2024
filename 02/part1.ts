import * as fs from "node:fs";

const data = fs.readFileSync("input.txt", "utf8");
const lines = data.split("\n");

enum Direction {
    UNDECIDED,
    INCREASING,
    DECREASING
}

const is_safe = (levels: number[]) => {
    let direction = Direction.UNDECIDED;

    let end = levels.length;
    for (let idx = 1; idx < end; idx++) {
        const prev_level = levels[idx - 1];
        const curr_level = levels[idx];

        if (idx === 1) {
            // determine direction
            if (curr_level < prev_level) {
                direction = Direction.DECREASING;
            } else if (curr_level > prev_level) {
                direction = Direction.INCREASING;
            } else {
                // unsafe
                return false;
            }
        } else {
            // check direction
            if (
                curr_level === prev_level
                || (direction === Direction.DECREASING && curr_level > prev_level)
                || (direction === Direction.INCREASING && curr_level < prev_level)
            ) {
                // unsafe
                return false;
            }
        }

        const level_diff = Math.abs(prev_level - curr_level);

        if (level_diff < 1 || level_diff > 3) {
            // unsafe
            return false;
        }
    }

    // safe!
    return true;
}

let safe_reports = 0;

for (const line of lines) {
    if (line === "") {
        continue;
    }

    const level_strs = line.split(" ");
    const levels = level_strs.map(str => Number.parseInt(str));

    if (is_safe(levels)) {
        safe_reports++;
    }
}

console.log(safe_reports);
