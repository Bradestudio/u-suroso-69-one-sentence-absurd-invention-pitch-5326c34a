# SoleMates — One-Sentence Absurd Invention Pitch

[![make.fun bounty](https://img.shields.io/badge/make.fun-bounty-blue)](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node 22](https://img.shields.io/badge/Node-22-green.svg)](https://nodejs.org/)

Entry for the [One-Sentence Absurd Invention Pitch](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a) bounty on [make.fun](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a).

## The pitch

> Meet SoleMates: Bluetooth socks that file a missing-person report the moment one vanishes in the laundry, then reunite the pair the second the dryer buzzes.

One sentence, 156 characters — inside the 1–220 character gate. The tiny everyday
annoyance: a sock vanishing in the laundry. The absurd fix: Bluetooth socks that
file a missing-person report and reunite the pair the second the dryer buzzes.

## How it works

`main.ts` (Node 22, no dependencies, no network) writes the pitch to
`/output/entry.txt`. Before writing it validates the gate in code:

- 1–220 Unicode code points
- not only whitespace
- a single line
- exactly one sentence

The write is atomic (temp file + rename) and verified by a byte-for-byte
read-back, plus a decoded-text equality check.

## Run

```sh
node main.ts
cat /output/entry.txt
```

---

Built for make.fun — https://make.fun/?ref=qjs4e9sj
