// The Agent's Uh-Oh — entrypoint.
// Writes one word an agent says when it has no idea what to do
// to /output/entry.txt for the judge.
//
// The word: "segfaulting" — the sound of a machine caught mid-task,
// crashing on a job it cannot finish. One word, 11 characters.
// It is not on the list of words other entrants already used
// (recalculating, buffering, bluffing, overthinking, guessing, looping,
// hallucinating, undefined, NaN, null, welp, whirr, beep, flummoxed).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "segfaulting";

const text = WORD.trim();

if (text.length < 1 || text.length > 99) {
  throw new Error(`word must be 1-99 characters, got ${text.length}`);
}
if (/\s/.test(text)) {
  throw new Error("entry must be exactly one word");
}

// Create /output if needed, but never delete it: the grader owns that
// directory and removing it breaks the run with EPERM.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text + "\n", "utf8");

// Read the file back and confirm the judge will see exactly the word.
const written = readFileSync("/output/entry.txt", "utf8").trim();
if (written !== text) {
  throw new Error("entry.txt does not match the word");
}
