ass = (a,b) ->
	if a != b 
		console.log 'assert failure'
		console.log a
		console.log b

summa = (arr) ->
	res = 0
	for item in arr
		res += item
	res

elo_formula = (gap) -> 0.5 * (1 + erf(gap / 400.0))

expected_horner = (ratings, rating) -> summa(elo_formula(rating - r) for r in ratings)
expected_score = (ratings, own_rating) -> summa (1 / (1 + 10**((rating - own_rating) / 400)) for rating in ratings)

erf = (x) -> # Horner's method, ger 5-6 korrekta decimaler
	a = 1.0 / (1.0 + 0.5 * Math.abs(x))
	b = 1.00002368+a*(0.37409196+a*(0.09678418+a*(-0.18628806+a*(0.27886807+a*(-1.13520398+a*(1.48851587+a*(-0.82215223+a*0.17087277)))))))
	res = 1 - a * Math.exp( -x*x - 1.26551223 + a * b)
	if x >= 0 then res else -res

search = (pp, ratings,func) ->
	[lo,hi] = [0,10000]
	while Math.abs(hi - lo) > 0.00000001
		guess = (lo + hi) / 2
		[lo,hi] = if pp > func(ratings, guess) then [guess,hi] else [lo,guess]
	guess

performance = (pp,elos,func) ->
	D = 0.1
	n = elos.length
	if pp == 0 then pp += D
	if pp == n then pp -= D
	search pp, elos, func

perf_fide = (elos, score, average) ->
	if score < 0 or elos.length < score then return ""

	dp = [0, 7, 14, 21, 29, 36, 43, 50, 57, 65, 
		72, 80, 87, 95, 102, 110, 117, 125, 133, 141, 
		149, 158, 166, 175, 184, 193, 202, 211, 220, 230, 
		240, 251, 262, 273, 284, 296, 309, 322, 336, 351, 
		366, 383, 401, 422, 444, 470, 501, 538, 589, 677, 800]
	
	percentage = Math.round 100 * score / elos.length

	diff = if percentage >= 50 then dp[percentage - 50] else -dp[50 - percentage]
	average + diff

calculate = ->
	input = document.getElementById("INPUT").value
	input = input.replaceAll ',',' '
	data = input.trim().split ' '
	if data.length <= 1 then return
	pp = parseFloat data.pop()
	elos = (parseFloat item for item in data)
	average = summa(elos) / elos.length
	document.getElementById("AVG").innerText = average.toFixed 0
	document.getElementById("NORMDIST").innerText = performance(pp, elos, expected_horner).toFixed 0
	document.getElementById("LOGISTIC").innerText = performance(pp, elos, expected_score).toFixed 0
	document.getElementById("FIDE").innerText = perf_fide(elos, pp, average).toFixed 0

calculate()
