// SoleMates — One-Sentence Absurd Invention Pitch
// Writes the final one-sentence pitch to /output/entry.txt.
// Node 22, no dependencies, no network access.

import { mkdirSync, renameSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "Meet SoleMates: Bluetooth socks that file a missing-person report the moment one vanishes in the laundry, then reunite the pair the second the dryer buzzes.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function codePointLength(text) {
  return [...text].length;
}

function countSentences(text) {
  const trimmed = text.trim();
  const terminators = trimmed.match(/[.!?]+/g);
  return terminators === null ? 0 : terminators.length;
}

function validateGate(text) {
  const length = codePointLength(text);
  if (length < 1 || length > 220) {
    throw new Error(`gate failed: length ${length} code points, must be 1-220`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate failed: entry must be a single line");
  }
  if (countSentences(text) !== 1) {
    throw new Error("gate failed: entry must be exactly one sentence");
  }
}

function main() {
  validateGate(ENTRY);
  const payload = Buffer.from(ENTRY, "utf8");
  mkdirSync(OUT_DIR, { recursive: true });
  // Atomic write: temp file in the same directory, then rename.
  const tmpFile = join(OUT_DIR, `.entry.txt.tmp-${process.pid}`);
  try {
    writeFileSync(tmpFile, payload, { flag: "wx" });
    renameSync(tmpFile, OUT_FILE);
  } catch (err) {
    // Never leave a stray temp file behind on a failed write.
    try {
      rmSync(tmpFile, { force: true });
    } catch {
      // Best effort only; the original error is what matters.
    }
    throw err;
  }
  // Read back byte-for-byte and compare, then also as decoded text.
  const back = readFileSync(OUT_FILE);
  if (!back.equals(payload)) {
    throw new Error("read-back failed: /output/entry.txt differs from entry");
  }
  if (back.toString("utf8") !== ENTRY) {
    throw new Error("read-back failed: decoded text differs from entry");
  }
  console.log(`wrote ${OUT_FILE} (${payload.length} bytes, ${codePointLength(ENTRY)} chars)`);
}

main();
