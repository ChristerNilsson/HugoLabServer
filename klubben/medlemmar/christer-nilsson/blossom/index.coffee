echo = console.log
factorial = (n) -> if n <= 1 then return 1 else n * factorial n-1

f = (players) -> 
	n = players / 2
	numerator   = factorial players
	denominator = (2 ** n) * factorial n
	numerator / denominator

calculate = ->
	n = parseInt document.getElementById("input").value
	if n % 2 != 0
		document.getElementById("label").innerText = "Felaktigt antal spelare"
		return
	s = "#{f n} parningar\n"
	if n in [2,4,6,8,10]

		total = generatePairings "123456789abcdef".slice 0,n
		
		for item in total
			s += item.map((x)-> x.join("")).join(" ") + "\n"

	document.getElementById("label").innerText = s

generatePairings = (players) ->
	return [[]] if players.length is 0

	pivot = players[0]
	rest  = players[1..]

	result = []

	for i in [0...rest.length]
		partner = rest[i]
		remaining = rest[...i].concat rest[i+1..]

		subPairings = generatePairings remaining

		for sp in subPairings
			result.push [[pivot, partner]].concat sp
	echo result
	result

calculate()
