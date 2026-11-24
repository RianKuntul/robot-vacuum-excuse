// The Robot Vacuum's Best Excuse
// make.fun competition: u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214
//
// Writes one line (1-140 characters) to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt), where the judge reads it. The program runs
// under Node 22 with no dependencies and no network.
//
// The judge is briefed as a tired homeowner who has heard an excuse from
// every appliance in the house, and picks the funnier of two lines. The
// winning shape is therefore a line with two beats: a relatable premise
// the homeowner recognises, then a punchline that turns on the vacuum
// itself. v1's "performance review" beat was warm but soft; v2 keeps the
// same premise (the missed crumb as a favour) and lands a harder second
// beat — the vacuum still billed for the full clean.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Candidates, best first. Only the first is used; the rest document the
// selection so the choice is deliberate, not the first idea that came up.
const CANDIDATES = [
  // Premise: the crumb is a favour. Punchline: billed in full anyway.
  "I left one crumb so you still feel needed. Don't worry, I billed you for the full clean anyway.",
  // v1 line, kept as the runner-up: same premise, softer second beat.
  "I left that crumb on purpose so you'd still feel needed. You're welcome, my performance review is Friday.",
];

const EXCUSE = CANDIDATES[0];

function main(): void {
  const line = EXCUSE.trim();

  // Gate rules (competition.yaml): /output/entry.txt must be UTF-8 text of
  // 1 to 140 characters, not only white space, and a single line.
  if (line.length === 0 || line.length > 140) {
    throw new Error(`Excuse must be 1-140 characters, got ${line.length}.`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("Excuse must be a single line.");
  }
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(line)) {
    throw new Error("Excuse must not contain control characters.");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file holds exactly the line the judge reads.
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
}

main();
