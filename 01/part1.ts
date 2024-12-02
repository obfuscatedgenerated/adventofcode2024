import * as fs from "node:fs";

const data = fs.readFileSync("input.txt", "utf8");
const lines = data.split("\n");

const left: number[] = [];
const right: number[] = [];

for (const line of lines) {
    if (line === "") {
        continue;
    }

    // collect parsed ints into lists
    const [left_str, right_str] = line.split("   ");

    left.push(Number.parseInt(left_str));
    right.push(Number.parseInt(right_str))
}

// need to define a comparator to sort numbers properly in js
// :laughatthisuser:
const num_comparator = (a: number, b: number) => a - b;

left.sort(num_comparator);
right.sort(num_comparator);

// tally distances
let dist_sum = 0;
for (const idx in left) {
    dist_sum += Math.abs(left[idx] - right[idx]);
}

console.log(dist_sum);
