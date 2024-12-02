import * as fs from "node:fs";

const data = fs.readFileSync("input.txt", "utf8");
const lines = data.split("\n");

enum Direction {
    UNDECIDED,
    INCREASING,
    DECREASING
}

let safe_reports = 0;
report: for (const line of lines) {
    if (line === "") {
        continue;
    }

    const level_strs = line.split(" ");
    const levels = level_strs.map(str => Number.parseInt(str));

    let direction = Direction.UNDECIDED;
    let dampened = false;

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
                if (dampened) {
                    continue report;
                } else {
                    dampened = true;
                    levels.splice(idx, 1);
                    idx = 0;
                    end--;
                    continue;
                }
            }
        } else {
            // check direction
            if (
                curr_level === prev_level
                || (direction === Direction.DECREASING && curr_level > prev_level)
                || (direction === Direction.INCREASING && curr_level < prev_level)
            ) {
                // unsafe
                if (dampened) {
                    continue report;
                } else {
                    dampened = true;
                    levels.splice(idx, 1);
                    continue;
                }
            }
        }

        const level_diff = Math.abs(prev_level - curr_level);

        if (level_diff < 1 || level_diff > 3) {
            // unsafe
            if (dampened) {
                continue report;
            } else {
                dampened = true;
                levels.splice(idx, 1);
                idx = 0;
                end--;
                continue;
            }
        }
    }

    // safe!
    safe_reports++;
}

console.log(safe_reports);
