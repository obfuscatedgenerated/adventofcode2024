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

    for (const idx in levels) {
        // why is idx a string?? am i stupid? whatever, rare evil double equals
        if (idx == 0) {
            continue;
        }

        const prev_level = levels[idx - 1];
        const curr_level = levels[idx];

        if (idx == 1) {
            // determine direction
            if (curr_level < prev_level) {
                direction = Direction.DECREASING;
            } else if (curr_level > prev_level) {
                direction = Direction.INCREASING;
            } else {
                // unsafe
                continue report;
            }
        } else {
            // check direction
            if (
                curr_level === prev_level
                || (direction === Direction.DECREASING && curr_level > prev_level)
                || (direction === Direction.INCREASING && curr_level < prev_level)
            ) {
                // unsafe
                continue report;
            }
        }

        const level_diff = Math.abs(prev_level - curr_level);

        if (level_diff < 1 || level_diff > 3) {
            // unsafe
            continue report;
        }
    }

    // safe!
    safe_reports++;
    console.log(line)
}

console.log(safe_reports);
