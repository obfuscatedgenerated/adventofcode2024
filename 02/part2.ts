// i made weird choices because i had to keep changing approach

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

// key is the line it originated from as they need to be grouped, value is a list of lists (levels)
const backtrack: { [key: string]: number[][] } = {};

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
        if (!backtrack[line]) {
            backtrack[line] = [];
        }

        // generate all possible backtracks
        // this is brute force and could be done smarter, but i don't care much
        // reasoning:
        // e.g.  6 1 2 3 4
        // removing 6 fixes it but the old code would remove the 1
        for (let idx = 0; idx < levels.length; idx++) {
            const new_levels = levels.slice();
            new_levels.splice(idx, 1);
            backtrack[line].push(new_levels);
        }
    }
}

// consume backtrack, with no fallback this time
for (const line in backtrack) {
    // check that ONE of the lists under the key is safe. do not check all
    for (const levels of backtrack[line]) {
        if (is_safe(levels) === -1) {
            safe_reports++;
            break;
        }
    }
}

console.log(safe_reports);
