// needs fixing, too low

import * as fs from "node:fs";

const data = fs.readFileSync("input.txt", "utf8");
const chars = data.split("");

enum State {
    NORMAL,
    CONSUMING_PARAM_1,
    CONSUMING_PARAM_2
}

let sum = 0;
let state = State.NORMAL;

let enabled = false;

let param_1_str = "";
let param_2_str = "";

for (let idx = 3; idx < chars.length; idx++) {
    const char = chars[idx];

    switch (state) {
        case State.NORMAL:
            param_1_str = "";
            param_2_str = "";

            // ignore anything that isn't an open or close bracket

            if (char === "(") {
                if (enabled && chars[idx - 3] === "m" && chars[idx - 2] === "u" && chars[idx - 1] === "l") {
                    // backtrack to check mul( when enabled
                    state = State.CONSUMING_PARAM_1;
                }
            } else if (char === ")") {
                if (chars[idx - 3] === "d" && chars[idx - 2] === "o" && chars[idx - 1] === "(") {
                    // backtrack to check for do()
                    enabled = true;
                } else if (chars[idx - 6] === "d" && chars[idx - 5] === "o" && chars[idx - 4] === "n" && chars[idx - 3] === "'" && chars[idx - 2] === "t" && chars[idx - 1] === "(") {
                    // backtrack to check for don't()
                    enabled = false;
                }

                // mul( handled by the earlier stuff
            }

            break;
        case State.CONSUMING_PARAM_1:
            // expect either numerical or comma. reset to normal otherwise (invalid)

            if (char === ",") {
                if (param_1_str.length === 0) {
                    // if we havent consumed any numbers yet, reset to normal (invalid)
                    state = State.NORMAL;
                } else {
                    // move to consuming param 2
                    state = State.CONSUMING_PARAM_2;
                }
            } else if (/\d/.test(char)) {
                param_1_str += char;
            } else {
                // invalid
                state = State.NORMAL;
            }

            break;
        case State.CONSUMING_PARAM_2:
            // expect either numerical or closing bracket. reset to normal otherwise (invalid)

            if (char === ")") {
                if (param_2_str.length === 0) {
                    // if we havent consumed any numbers yet, reset to normal (invalid)
                    state = State.NORMAL;
                } else {
                    // complete calculation
                    const param_1 = Number.parseInt(param_1_str);
                    const param_2 = Number.parseInt(param_2_str);

                    if (Number.isNaN(param_1) || Number.isNaN(param_2)) {
                        // invalid
                        state = State.NORMAL;
                        break;
                    }

                    sum += param_1 * param_2;
                    state = State.NORMAL;
                }
            } else if (/\d/.test(char)) {
                param_2_str += char;
            } else {
                // invalid
                state = State.NORMAL;
            }

            break;
    }
}

console.log(sum);
