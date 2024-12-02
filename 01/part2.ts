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

const right_count = (n: number) => {
    if (!right.includes(n)) {
        return 0;
    }

    let count = 0;
    for (const num of right) {
        if (num === n) {
            count++;
        }
    }

    return count;
}

// bart, lisa, maggie, homer, marge
let sim_sum = 0;

for (const num of left) {
    sim_sum += num * right_count(num);
}

console.log(sim_sum);
