// Jeremy Colegrove, Tue Dec 2, 2025, Advent of Code Day 2

/**
 * The algorithm is close to O(N) time, providing simple straightforward steps to testing the string
 * Method:
 * 1) Create frequency map of characters in string. "addaadda" -> {a: 4, d: 4}
 * 2) Compute the greatest common multiple of the frequency values. Example:
 *          gcm({g: 5, d: 10}) = 5
 *          gcm({z:4, m: 1}) = 1
 * 3) If gcm is 1 or 0, then return false, it is not a made of repeating substrings
 *
 * If the string S is the substring p repeating k times, then it can be written as S = p^k.
 *  Given the definition of GCM, k must also be a multiple of GCM.
 * Since every multiple could be the length of the substring, we must test each one.
 * This will also guarantee the shortest possible substring solution.
 * 4) Loop over every multiple m of GCM, check if substring(0, len(p) / m) is repeating
 *
 *
 * EXAMPLE: "aaabbbaaabbbaaabbb" ("aaabbb" repeating 3 times)
 * 1) Generate frequency map => {a: 9, b: 9}
 * 2) Get GCM => 9
 * 3) Not multiple of 0 or 1, continue
 * 4) 3 is the first multiple of 9, so divide original string by 3 and test substring (0, 18/3) => "aaabbb"
 * This is the correct result
 *
 * @param {string} str the string to test if is made of substrings
 * @returns boolean
 */

function hasRepeatingSubstring(str) {
	// build map of character frequency O(n)
	const freq = new Map();
	for (const ch of str) freq.set(ch, (freq.get(ch) || 0) + 1);
	// get array of frequency values for gcm
	const vals = Array.from(freq.values());
	// find gcm among values O(log(min(a, b)))
	const gm =
		vals.length === 0
			? 0
			: vals.length === 1
				? vals[0]
				: vals.reduce((a, c) => gcm(a, c));
	// early escape if gcm is 1 or 0
	if (gm <= 1) return false;
	// first substring as 0, sum of vals / gcm
	// worst case scenario
	for (let k = 2; k <= gm; k++) {
		if (gm % k !== 0) continue;
		if (isRepeating(str, str.substring(0, str.length / k))) {
			return true;
		}
	}

	return false;
}

function isRepeating(str, sub) {
	for (let i = 0; i < str.length; i++) {
		if (str[i] !== sub[i % sub.length]) {
			return false;
		}
	}
	return true;
}

function gcm(a, b) {
	if (b === 0) {
		return a;
	}

	return gcm(b, a % b);
}
