import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// "Off-grid" first reads as disconnecting from the grid; the friends then treat "the grid" as a literal destination with Wi-Fi, so the turn reuses the setup's own word.
// Asking about Wi-Fi makes the misunderstanding concrete and current without naming a brand or a person.
// One short sentence, no proper nouns, and no trailing newline keep the joke cold-readable; no Date, random, network, or reads make the bytes identical every run.
const joke = "I told my friends I'm going off-grid. They asked if the grid had Wi-Fi.";

// Spread counts Unicode code points, not UTF-16 units, so an astral emoji counts once toward 200; trim kills the 0 case, the regex kills CR/LF/LS/PS, and "utf8" fixes the bytes.
if (!joke.trim()) {
  throw new Error("Joke line is empty or blank.");
}

if ([...joke].length > 200) {
  throw new Error("Joke line exceeds 200 code points.");
}

if (/[\n\r\u2028\u2029]/.test(joke)) {
  throw new Error("Joke line contains a newline.");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), joke, "utf8");
