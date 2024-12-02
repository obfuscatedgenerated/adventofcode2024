import * as fs from "node:fs";

const data = fs.readFileSync("input.txt", "utf8");
const lines = data.split("\n");

const left: number[] = [];
const right: number[] = [];

for (const line of lines) {
    if (line === "") {
        continue;
    }

    const [left_str, right_str] = line.split("   ");

    left.push(Number.parseInt(left_str));
    right.push(Number.parseInt(right_str))
}

// :laughatthisuser:
const num_comparator = (a: number, b: number) => a - b;

left.sort(num_comparator);
right.sort(num_comparator);

let dist_sum = 0;
for (const idx in left) {
    dist_sum += Math.abs(left[idx] - right[idx]);
}

console.log(dist_sum);
