// this doesnt work because the point we catch the error might not be the one to remove to fix it!
// e.g.  6 1 2 3 4
// removing 6 fixes it but the code would remove the 1
// could be done with clever code / brute force, i'll come back to it

import * as fs from "node:fs";

const data = fs.readFileSync("input.txt", "utf8");
const lines = data.split("\n");

enum Direction {
    UNDECIDED,
    INCREASING,
    DECREASING
}

// returns index of failure, or -1 if safe
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
                return idx;
            }
        } else {
            // check direction
            if (
                curr_level === prev_level
                || (direction === Direction.DECREASING && curr_level > prev_level)
                || (direction === Direction.INCREASING && curr_level < prev_level)
            ) {
                // unsafe
                return idx;
            }
        }

        const level_diff = Math.abs(prev_level - curr_level);

        if (level_diff < 1 || level_diff > 3) {
            // unsafe
            return idx;
        }
    }

    // safe!
    return -1;
}

let safe_reports = 0;
const backtrack: number[][] = [];

for (const line of lines) {
    if (line === "") {
        continue;
    }

    const level_strs = line.split(" ");
    const levels = level_strs.map(str => Number.parseInt(str));

    const fail_idx = is_safe(levels);
    if (fail_idx === -1) {
        safe_reports++;
    } else {
        // backtracking by deleting unsafe one and trying again
        levels.splice(fail_idx, 1);
        backtrack.push(levels);
    }
}

// consume backtrack, with no fallback this time
backtrack.forEach((levels) => {
    const fail_idx = is_safe(levels);
    if (fail_idx === -1) {
        safe_reports++;
    }
});

console.log(safe_reports);
