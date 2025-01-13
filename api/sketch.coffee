table = (s) -> "<table>\n#{s}</table>"
tr = (s,attrs="") -> "<tr #{attrs}>#{s}</tr>\n"
td = (s,attrs="") -> "<td #{attrs}>#{s}</td>"
th = (s,attrs="") -> "<th #{attrs}>#{s}</th>"

turneringar = {
	14507: "Klass M",
	14508: "Klass 1",
	14509: "Klass 2",
	14510: "Klass 3",
	14512: "Klass 4",
}

process = (data_t, data_r, tid, pid) ->

	console.log data_t
	console.log data_r

	players = {}
	for p in data_t
		pi = p.playerInfo
		players[p.contenderId] = pi.elo.rating + ' ' + pi.lastName.toUpperCase() + ' ' + pi.firstName

	stable = ""
	stable += th "datum"
	stable += th "rond"
	stable += th "bord"
	stable += th "färg"
	stable += th "mot"
	stable += th "resultat"
	stable = tr stable

	played = 0
	n = data_r.length
	finalized = 0

	center = 'style="text-align: center"'
	grå    = 'class="old"'
	now = new Date()
	nu = now.toLocaleDateString "sv-SE"

	for r in data_r
		g = r.games[0]
		if r.finalized 
			finalized += 1
			if g.result in [-1,0,1] then played += 1
		if r.awayId == pid or r.homeId == pid
			färg = if r.homeId==pid then "vit" else "svart"
			s = ""
			s += td r.date
			s += td r.roundNr,center
			s += td r.board,center
			s += td färg,center
			opp = if färg=='vit' then r.awayId else r.homeId
			res = if färg=='vit' then r.homeResult else r.awayResult
			if opp < 1000
				s += td "w.o."
			else
				s += td players[opp.toString()]
			if g.result in [-3,-2,2] then res += " w.o."
			s += td res,center
			col = if r.date < nu or r.finalized then grå else ""
			stable += tr s,col

	turnering = document.getElementById 'turnering'
	spelare = document.getElementById 'spelare'
	app = document.getElementById 'app'
	statistik = document.getElementById 'statistik'

	turnering.innerHTML = "<a href='https://member.schack.se/ShowTournamentServlet?id=#{tid}'>#{turneringar[tid]}</a>"
	spelare.innerText = "Spelare: " + players[pid]
	app.innerHTML = table stable
	statistik.innerText = "#{played} av #{finalized} partier spelade i turneringen. (#{(100*played/finalized).toFixed 1}%). Ej ännu spelade: #{n-finalized}"
