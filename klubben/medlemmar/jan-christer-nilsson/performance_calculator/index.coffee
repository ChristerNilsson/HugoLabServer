ass = (a,b) ->
	if a != b 
		console.log 'assert failure'
		console.log a
		console.log b


## Juha Kivijärvi:

Epsilon = 0.000001
MinRating = 0
MaxRating = 10000

erf = (x) ->
	# Horner's method, gives a reasonably good approximation
	a = 1.0 / (1.0 + 0.5 * Math.abs(x));
	res = 1 - a * Math.exp( -x*x   -   1.26551223 +
									a * ( 1.00002368 +
									a * ( 0.37409196 + 
									a * ( 0.09678418 + 
									a * (-0.18628806 + 
									a * ( 0.27886807 + 
									a * (-1.13520398 + 
									a * ( 1.48851587 + 
									a * (-0.82215223 + 
									a * ( 0.17087277))))))))))
	if x >= 0 then res else -res

perf_correct = (ratings, double_score) ->
	low = MinRating
	high = MaxRating
	guess = 0
	we = 0
	i = 0

	if double_score < 0 || 2 * ratings.length < double_score then return ""

	if double_score < 1 then return "-\u221e"
	if 2 * ratings.length - double_score < 1 then return "\u221e"

	while high - low > Epsilon
		we = 0.0
		guess = (low + high) / 2.0
		for rating in ratings
			we += 0.5 * (1 + erf((guess - rating) / 400.0))
		if 2 * we < double_score then low = guess
		else high = guess
	Math.round high

##

summa = (arr) ->
	res = 0
	for item in arr
		res += item
	res

expected_score = (ratings, own_rating) -> summa (1 / (1 + 10**((rating - own_rating) / 400)) for rating in ratings)

performance_rating = (pp, ratings) ->
	lo = 0
	hi = 4000
	while Math.abs(hi - lo) > 0.001
		rating = (lo + hi) / 2
		if pp > expected_score ratings, rating
			lo = rating
		else
			hi = rating
	rating

# Use two extreme values when calculating 0% or 100%
extrapolate = (a0, b0, elos) ->
	a = performance_rating a0,elos
	b = performance_rating b0,elos
	b + b - a

performance = (pp,elos) -> 
	n = elos.length
	if pp == 0 then return extrapolate   0.5,  0.25,elos
	if pp == n then return extrapolate n-0.5,n-0.25,elos
	performance_rating pp,elos

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
	document.getElementById("TRUEDEF").innerText = perf_correct(elos, 2 * pp).toFixed 0
	document.getElementById("LOGISTIC").innerText = performance(pp, elos).toFixed 0
	document.getElementById("FIDE").innerText = perf_fide(elos, pp, average).toFixed 0

calculate()

ass "1118", performance(0.0,[1500]).toFixed 0
ass "1500", performance(0.5,[1500]).toFixed 0
ass "1882", performance(1.0,[1500]).toFixed 0

ass "1058", performance(0.0,[1500,1600]).toFixed 0
ass "1356", performance(0.5,[1500,1600]).toFixed 0
ass "1550", performance(1.0,[1500,1600]).toFixed 0
ass "1744", performance(1.5,[1500,1600]).toFixed 0
ass "2042", performance(2.0,[1500,1600]).toFixed 0
