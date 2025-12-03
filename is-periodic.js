// Jeremy Colegrove, Tue Dec 2, 2025, Advent of Code Day 2

/**
 * The algorithm is close to O(N) time, providing simple straightforward steps to testing the string
 * Method:
 * 1) Create frequency map of characters in string. "addaadda" -> {a: 4, d: 4}
 * 2) Compute the greatest common divisor of the frequency values. Example:
 *          gcd({g: 5, d: 10}) = 5
 *          gcd({z:4, m: 1}) = 1
 * 3) If gcd is 1 or 0, then return false, it is not a made of repeating substrings
 *
 * If the string S is the substring p repeating k times, then it can be written as S = p^k.
 *  Given the definition of gcd, k must also be a multiple of gcd.
 * Since every multiple could be the length of the substring, we must test each one.
 * Looping from 2->gm will gaurantee the longest substring, gm->2 will gaurantee the shortest.
 * 4) Loop over every multiple m of gcd, check if substring(0, len(p) / m) is repeating
 *
 *
 * EXAMPLE: "aaabbbaaabbbaaabbb" ("aaabbb" repeating 3 times)
 * 1) Generate frequency map => {a: 9, b: 9}
 * 2) Get gcd => 9
 * 3) gcd is not 0 or 1, continue
 * 4) 3 is the first multiple of 9, so divide original string by 3 and test substring (0, 18/3) => "aaabbb"
 * This is the correct result
 *
 * The worst case timing for this algo is O(N^(1 + 1/lnlnN)), slightly larger than O(N),
 * but for most real world inputs is O(N) because most numbers have few divisors.
 *
 * @param {string} str the string to test if is made of substrings
 * @returns boolean
 */

export function isPeriodic(str) {
	// build map of character frequency O(n)
	const freq = new Map();
	for (const ch of str) freq.set(ch, (freq.get(ch) || 0) + 1);
	// get array of frequency values for gcd
	const vals = Array.from(freq.values());
	// find gcd among values O(log(min(a, b)))
	const gm =
		vals.length === 0
			? 0
			: vals.length === 1
				? vals[0]
				: vals.reduce((a, c) => gcd(a, c));
	// early escape if gcd is 1 or 0
	if (gm <= 1) return false;
	// loop over all multiples of gcd
	for (let k = 2; k <= gm; k++) {
		if (gm % k !== 0) continue;
		// test str split into k pieces
		if (isRepeating(str, str.substring(0, str.length / k))) {
			return true;
		}
	}
}

function isRepeating(str, sub) {
	for (let i = 0; i < str.length; i++) {
		if (str[i] !== sub[i % sub.length]) {
			return false;
		}
	}
	return true;
}

function gcd(a, b) {
	if (b === 0) {
		return a;
	}

	return gcd(b, a % b);
}
