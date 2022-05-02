let SCORE_MIN = -Infinity
let SCORE_MAX = Infinity
let SCORE_GAP_LEADING = -0.005
let SCORE_GAP_TRAILING = -0.005
let SCORE_GAP_INNER = -0.01
let SCORE_MATCH_CONSECUTIVE = 1.0
let SCORE_MATCH_SLASH = 0.9
let SCORE_MATCH_WORD = 0.8
let SCORE_MATCH_DOT = 0.6

def fzy arr, query, keyname="name"
	let needle = query.trim!.toLowerCase!
	return [] unless arr.length > 0
	let scored = []
	let M = new Array(100_000)
	let D = new Array(100_000)
	let B = new Array(100_000)
	for obj in arr
		continue unless obj.hasOwnProperty keyname
		let haystack = obj[keyname].trim!.toLowerCase!
		continue unless has_match needle, haystack
		obj.fzy_score = score(needle, haystack, M, D, B)
		sorted_insert obj, scored
	scored

def score needle, haystack, M, D, match_bonus
	let n = needle.length
	let m = haystack.length
	if n < 1 or m < 1
		return SCORE_MIN
	if n === m
		return SCORE_MAX
	if m > 1024
		return SCORE_MIN
	compute needle, haystack, M, D, match_bonus
	M[(n - 1)*m + (m - 1)]

def compute needle, haystack, M, D, match_bonus
	let n = needle.length
	let m = haystack.length
	precompute_bonus haystack, match_bonus
	for i in [0 .. n - 1]
		let prev_score = SCORE_MIN
		let gap_score = i === n - 1 ? SCORE_GAP_TRAILING : SCORE_GAP_INNER
		for j in [0 .. m - 1]
			let ij = i*m + j
			let pij = (i - 1)*m + (j - 1)
			if needle[i] === haystack[j]
				let score = SCORE_MIN
				if i === 0
					score = (j * SCORE_GAP_LEADING) + match_bonus[j]
				elif j > 0
					score = Math.max(M[pij] + match_bonus[j], D[pij] + SCORE_MATCH_CONSECUTIVE)
				D[ij] = score
				M[ij] = prev_score = Math.max(score, prev_score + gap_score)
			else
				D[ij] = SCORE_MIN
				M[ij] = prev_score = prev_score + gap_score

def precompute_bonus haystack, match_bonus
	let m = haystack.length
	let last_ch = '/'
	for i in [0 .. m - 1]
		let ch = haystack[i]
		if last_ch === '/'
			match_bonus[i] = SCORE_MATCH_SLASH
		elif last_ch === '-' || last_ch === '_' || last_ch === ' '
			match_bonus[i] = SCORE_MATCH_WORD
		elif last_ch === '.'
			match_bonus[i] = SCORE_MATCH_DOT
		else
			match_bonus[i] = 0
		last_ch = ch

def has_match needle, haystack
	let i = 0
	let n = -1
	let letter
	while letter = needle[i++]
		if (n = haystack.indexOf(letter, n + 1)) === -1
			return no
	return yes

def sorted_insert elem, arr
	let low = 0
	let high = arr.length
	while low < high
		let mid = (low + high) >>> 1
		if elem.fzy_score > arr[mid].fzy_score
			high = mid
		else
			low = mid + 1
	arr.splice(low, 0, elem)

export default fzy
