echo = console.log
factorial = (n) ->
	return 1 if n <= 1
	result = 1
	i = 2
	while i <= n
		result *= i 
		i += 1
	result

f = (players) -> 
	n = players / 2
	numerator   = factorial players
	denominator = (2 ** n) * factorial n
	numerator / denominator

# alert f 6  # 15
# console.log f 8  # 105
# console.log f 10 # 945
# console.log f 12 # 135135

calculate = ->
	# document.getElementById("label").innerText = f parseInt document.getElementById("input").value
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


# generatePairings(players)
# players: en array, t.ex. [1..6]
# retur: en lista med alla parningar, där varje parning är en lista av par

generatePairings = (players) ->
# Om inga spelare kvar: returnera enda tomma parningen
	return [[]] if players.length is 0

# Ta första spelaren som "pivot"
	pivot = players[0]
	rest  = players[1..]

	result = []

	# Prova att para pivot med var och en av de återstående
	for i in [0...rest.length]
		partner = rest[i]
		remaining = rest[...i].concat rest[i+1..]  # ta bort partnern

		# Rekursivt: generera parningar för återstående
		subPairings = generatePairings remaining

		# Prependa paret (pivot, partner) till varje sub-parning
		for sp in subPairings
			result.push [[pivot, partner]].concat sp
	echo result
	result

calculate()

