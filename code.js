/* Ideje:
1) Search (Države & Gl. gradovi)
2) Pokaži sve (Lista, Full Screen mode{veliki font})
3) Quiz [10 odjednom, selektovanje umesto pisanja]
4) Reverse mode (Pišeš države a dati su gl. gradovi)
5) Automatski piše velika slova za sve reči
*/

// onload

window.onload = function() {
	// ovde animiramo naslov
	var s = document.getElementById('naslov').innerHTML
	var a = "Glavni gradovi (Scorpio edition):"
	var b = "Glavni gradovi (Scorpio edition)."
	var interval = setInterval (function() {
		s = a
		var timeout = setTimeout (function() {
			s = b
			document.getElementById('naslov').innerHTML = s
		}, 500)
		document.getElementById('naslov').innerHTML = s
	}, 1000)
	// ovde animiramo mikac_inc
	var ani = "mikac_inc"
	var i = 0
	var interval2 = setInterval(function() {
			document.getElementById("mikac_inc_span").appendChild(document.createTextNode(ani[i]))
			i+=1
			if(i>ani.length){
				document.getElementById("mikac_inc_span").innerHTML = ""
				i = 0
			}
	}, 500)
}


/*
2 metode za proveru, jedna je da inuti dobju event listener, 
pa čim je upisan tačan odgovor udara se štiklica
druga metoda je da postoji dugme za proveru izvan tabele koje će 
na neki način da proveri odgovore za svaki input posebno :D
Druga metoda je bolja ali treba da se razmisli o njoj
*/

// Baza podataka:

var svedrzave = {Albanija: "Tirana", Andora: "Andora", Austrija: "Bec", Belgija: "Brisel" , Belorusija: "Minsk", "Bosna i Hercegovina": "Sarajevo", Bugarska: "Sofija", Vatikan: "Vatikan", Gruzija: "Tbilisi", Grcka: "Atina", Danska: "Kopenhagen", Estonija: "Talin", Irska: "Dablin", Island: "Rejkjavik", Italija: "Rim", Jermenija: "Jerevan", Kipar: "Nikozija", Letonija: "Riga", Litvanija: "Vilnjus", Lihtenstajn: "Vaduc", Luksemburg: "Luksemburg", Madjarska: "Budimpesta", Makedonija: "Skoplje", Malta: "Valeta", Moldavija: "Kisinjev", Monako: "Monako", Nemacka: "Berlin", Norveska: "Oslo", Poljska: "Varsava", Portugalija: "Lisabon", Rumunija: "Bukurest", Rusija: "Moskva", "San Marino": "San Marino", Slovacka: "Bratislava", Slovenija: "Ljubljana", Srbija: "Beograd", Turska: "Ankara", Engleska: "London", Ukrajna: "Kijev", Finska: "Helsinki", Francuska: "Pariz", Holandija: "Amsterdam", Hrvatska: "Zagreb", "Crna Gora": "Podgorica", Ceska: "Prag", Svajcerska: "Bern", Svedska: "Stokholm", Spanija: "Madrid", Argentina: "Buenos Ajres", Bolivija: "La Paz", Brazil: "Brazilija", Venecuela: "Karakas", Gvajana: "Dzordztaun", Ekvador: "Kito", Kolumbija: "Bogota", Paragvaj: "Asunsion", Peru: "Lima", Surinam: "Paramaribo", Urugvaj: "Montevideo", Cile: "Santijago", "Francuska Gvajana": "Kajena", Belize: "Belmopan", Gvatemala: "Gvatemala", "Dominikanska Republika": "Santo Domingo", Salvador: "San Salvador", Kostarika: "San Hoze", Kuba: "Havana", Meksiko: "Meksiko Siti", Nikaragva: "Managva", Panama: "Panama", Haiti: "Port o Prens", Honduras: "Tegusigalpa", SAD: "Vasington", Kanada: "Otava", Avganistan: "Kabul", Azerbejdzan: "Baku", Banglades: "Daka", Bahrein: "Manama", Butan: "Timbu", Vijetnam: "Hanoj", Gruzija: "Tbilisi", Izreal: "Jerusalim", Indija: "Nju Delhi", Indonezija: "Dzakarta", Irak: "Bagdad", Iran: "Teheran", "Istocni Timor": "Dili", Japan: "Tokio", Jemen: "Sana", Jermenija: "Jerevan", Jordan: "Aman", "Juzna Koreja": "Seul", "Kazahstan": "Astana", Kambodza: "Pnom Pen", Katar: "Doha", Kina: "Peking", Kipar: "Nikozija", Kirgistan: "Biskek", Kuvajt: "Kuvajt", Laos: "Vijentijan", Liban: "Bejrut", Maldivi: "Male", Melezija: "Kuala Lumpur", Mjanmar: "Nejpjido", Mongolija: "Ulan Bator", Nepal: "Katmandu", Pakistan: "Islamabad", Oman: "Maskat", Rusija: "Moskva", "Saudijska Arabija": "Rijad", "Severna Koreja": "Pjongjang", Singapur: "Singapur", Sirija: "Damask", Tajland: "Bangkok", Tadzikistan: "Dusanbe", Turkmenistan: "Ashabad", Turska: "Ankara", Uzbekistan: "Taskent", Filipini: "Manila", "Ujedinjeni Arapski Emirati": "Abu Dabi", Alzir: "Alzir", Angola: "Loanda", Benin: "Porto Novo", Bocvana: "Gaborone", "Burkina Faso": "Uagadugu", Borundi: "Budzumbura", Gabon: "Librvil", Gambija: "Bandzul", Gana: "Akra", Gvineja: "Konakri", "Gvineja Bisao": "Bisau", Egipat: "Kairo", "Ekvatorijalna Gvineja": "Malabo", Eritreja: "Asmara", Etiopija: "Adis Abeba", Zambija: "Lusaka", "Zelenortska Ostrva": "Praja", Zimbabve: "Harare", "Juznoafricka Republika": "Pretorija", "Juzni Sudan": "Dzuba", Kamerun: "Jaunde", Kenija: "Naerobi", Kongo: "Brazavil", "DR Kongo": "Kinsasa", Komori: "Moroni", Lesoto: "Maseru", Liberija: "Monrovija", Libija: "Tripoli", Madagaskar: "Antananarivo", Malavi: "Lilongve", Mali: "Bamako", Moroko: "Rabat", Mauritanija: "Nuaksot", Mauricijus: "Port Luis", Mozambik: "Maputo", Namibija: "Vindhuk", Nigerija: "Abudza", Niger: "Nijamej", "Obala Slonovace": "Jamasukro", Ruanda: "Kigali", "Sijera Leone": "Fritaun", Senegal: "Dakar", Somalija: "Mogadisu", Sudan: "Kartun", Svazilend: "Mbabane", Tanzanija: "Dodoma", Togo: "Lome", Tunis: "Tunis", Uganda: "Kampala", "Centralnoafricka Republika": "Bangi", Cad: "Ndzamena", Dzibuti: "Dzibuti", Maroko: "Rabat"};

var evropa = {Albanija: "Tirana", Andora: "Andora", Austrija: "Bec", Belgija: "Brisel" , Belorusija: "Minsk", "Bosna i Hercegovina": "Sarajevo", Bugarska: "Sofija", Vatikan: "Vatikan", Gruzija: "Tbilisi", Grcka: "Atina", Danska: "Kopenhagen", Estonija: "Talin", Irska: "Dablin", Island: "Rejkjavik", Italija: "Rim", Jermenija: "Jerevan", Kipar: "Nikozija", Letonija: "Riga", Litvanija: "Vilnjus", Lihtenstajn: "Vaduc", Luksemburg: "Luksemburg", Madjarska: "Budimpesta", Makedonija: "Skoplje", Malta: "Valeta", Moldavija: "Kisinjev", Monako: "Monako", Nemacka: "Berlin", Norveska: "Oslo", Poljska: "Varsava", Portugalija: "Lisabon", Rumunija: "Bukurest", Rusija: "Moskva", "San Marino": "San Marino", Slovacka: "Bratislava", Slovenija: "Ljubljana", Srbija: "Beograd", Turska: "Ankara", Engleska: "London", Ukrajna: "Kijev", Finska: "Helsinki", Francuska: "Pariz", Holandija: "Amsterdam", Hrvatska: "Zagreb", "Crna Gora": "Podgorica", Ceska: "Prag", Svajcerska: "Bern", Svedska: "Stokholm", Spanija: "Madrid"};
var l_amerika = {Argentina: "Buenos Ajres", Bolivija: "La Paz", Brazil: "Brazilija", Venecuela: "Karakas", Gvajana: "Dzordztaun", Ekvador: "Kito", Kolumbija: "Bogota", Paragvaj: "Asunsion", Peru: "Lima", Surinam: "Paramaribo", Urugvaj: "Montevideo", Cile: "Santijago", "Francuska Gvajana": "Kajena", Belize: "Belmopan", Gvatemala: "Gvatemala", "Dominikanska Republika": "Santo Domingo", Salvador: "San Salvador", Kostarika: "San Hoze", Kuba: "Havana", Meksiko: "Meksiko Siti", Nikaragva: "Managva", Panama: "Panama", Haiti: "Port o Prens", Honduras: "Tegusigalpa"};
var a_amerika = {SAD: "Vasington", Kanada: "Otava"};
var azija = {Avganistan: "Kabul", Azerbejdzan: "Baku", Banglades: "Daka", Bahrein: "Manama", Butan: "Timbu", Vijetnam: "Hanoj", Gruzija: "Tbilisi", Izreal: "Jerusalim", Indija: "Nju Delhi", Indonezija: "Dzakarta", Irak: "Bagdad", Iran: "Teheran", "Istocni Timor": "Dili", Japan: "Tokio", Jemen: "Sana", Jermenija: "Jerevan", Jordan: "Aman", "Juzna Koreja": "Seul", "Kazahstan": "Astana", Kambodza: "Pnom Pen", Katar: "Doha", Kina: "Peking", Kipar: "Nikozija", Kirgistan: "Biskek", Kuvajt: "Kuvajt", Laos: "Vijentijan", Liban: "Bejrut", Maldivi: "Male", Melezija: "Kuala Lumpur", Mjanmar: "Nejpjido", Mongolija: "Ulan Bator", Nepal: "Katmandu", Pakistan: "Islamabad", Oman: "Maskat", Rusija: "Moskva", "Saudijska Arabija": "Rijad", "Severna Koreja": "Pjongjang", Singapur: "Singapur", Sirija: "Damask", Tajland: "Bangkok", Tadzikistan: "Dusanbe", Turkmenistan: "Ashabad", Turska: "Ankara", Uzbekistan: "Taskent", Filipini: "Manila", "Ujedinjeni Arapski Emirati": "Abu Dabi"}
var afrika = {Alzir: "Alzir", Angola: "Loanda", Benin: "Porto Novo", Bocvana: "Gaborone", "Burkina Faso": "Uagadugu", Borundi: "Budzumbura", Gabon: "Librvil", Gambija: "Bandzul", Gana: "Akra", Gvineja: "Konakri", "Gvineja Bisao": "Bisau", Egipat: "Kairo", "Ekvatorijalna Gvineja": "Malabo", Eritreja: "Asmara", Etiopija: "Adis Abeba", Zambija: "Lusaka", "Zelenortska Ostrva": "Praja", Zimbabve: "Harare", "Juznoafricka Republika": "Pretorija", "Juzni Sudan": "Dzuba", Kamerun: "Jaunde", Kenija: "Naerobi", Kongo: "Brazavil", "DR Kongo": "Kinsasa", Komori: "Moroni", Lesoto: "Maseru", Liberija: "Monrovija", Libija: "Tripoli", Madagaskar: "Antananarivo", Malavi: "Lilongve", Mali: "Bamako", Moroko: "Rabat", Mauritanija: "Nuaksot", Mauricijus: "Port Luis", Mozambik: "Maputo", Namibija: "Vindhuk", Nigerija: "Abudza", Niger: "Nijamej", "Obala Slonovace": "Jamasukro", Ruanda: "Kigali", "Sijera Leone": "Fritaun", Senegal: "Dakar", Somalija: "Mogadisu", Sudan: "Kartun", Svazilend: "Mbabane", Tanzanija: "Dodoma", Togo: "Lome", Tunis: "Tunis", Uganda: "Kampala", "Centralnoafricka Republika": "Bangi", Cad: "Ndzamena", Dzibuti: "Dzibuti", Maroko: "Rabat"}

var finalGG = {}

// Random funkija
function random_number(n){
	return Math.floor(Math.random()*n)
}

// Pretraga

function pretraga_button()  {
	clearInterval(interval_show)
	var tabs = document.getElementsByClassName("tabs")
	for(var i=0; i<tabs.length; i++){
		tabs[i].style.display = "none"
	}
	document.getElementById("pretraga_tab").style.display = "block"
}

function pretraga(value) {
	var sve_len = Object.values(svedrzave).length
	for(var i=0; i<sve_len; i++){
		if(value == Object.values(svedrzave)[i]){
			console.log(i)
			var rezultat = Object.keys(svedrzave)[i]
			console.log(rezultat)
			document.getElementById("rezultat_pretrage").innerHTML = rezultat
			break;
		}
		else {
			var rezultat2 = svedrzave[value]
			document.getElementById("rezultat_pretrage").innerHTML = rezultat2
			if(rezultat2 == undefined){
				document.getElementById("rezultat_pretrage").innerHTML = "..."
			}
		}
	}
	// Veliko početno slovo za sve reči... Ako je nejasno Searchuj /JavaScript Regular Expressions/
	document.getElementById("input_pretraga").value = value.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);}); //value.charAt(0).toUpperCase() + value.slice(1)
}


// Nauči me

var naucime_ukljuceno = 0
var interval_show;

function naucime_button()  {
	clearInterval(interval_show)
	var tabs = document.getElementsByClassName("tabs")
	for(var i=0; i<tabs.length; i++){
		tabs[i].style.display = "none"
	}
	document.getElementById("naucime_tab").style.display = "block"
	// Poziva funkciju za ostalo
	if(naucime_ukljuceno == 0){
		naucime_fill_divs()
	}
	naucime_show(1)
}

function naucime_fill_divs() {
	// Država plavo, grad narandžasto
	var kontinenti = [evropa, azija, afrika, l_amerika, a_amerika]
	var kontinenti_string = ["evropa", "azija", "afrika", "l_amerika", "a_amerika"]
	for (var k=0; k<kontinenti.length; k++){
		var kont = kontinenti[k]
		var kont_string = kontinenti_string[k]
		for (var i=0; i<Object.keys(kont).length; i++){
			var li = document.createElement("li")
			var drzava = Object.keys(kont)[i]
			//drzava.style.color = "cyan"
			var span_drzava = document.createElement("span")
			span_drzava.appendChild(document.createTextNode(drzava))
			span_drzava.style.color = "cyan"
			var grad = kont[drzava]
			var span_grad = document.createElement("span")
			span_grad.appendChild(document.createTextNode(grad))
			span_grad.style.color = "orange"
			//var resenje = drzava + " -> " + grad
			li.appendChild(span_drzava)
			li.appendChild(document.createTextNode(" -> "))
			li.appendChild(span_grad)
			document.getElementById(kont_string).appendChild(li)
			///////
		}
	}
	naucime_ukljuceno += 1
}

function naucime_show(time) {
	clearInterval(interval_show)
	interval_show = setInterval(function() {
		var drzava = Object.keys(svedrzave)[random_number(Object.keys(svedrzave).length)]
		var grad = svedrzave[drzava]
		document.getElementById("drzava").innerHTML = drzava
		document.getElementById("grad").innerHTML = grad
	}, time*1000)
}

function naucime_show_size(value) {
	document.getElementById("show").style.fontSize = value + "px"
	document.getElementById("grad").style.fontSize = value + "px"
	document.getElementById("drzava").style.fontSize = value +"px"
}

// Kviz

function kviz_button(){
	clearInterval(interval_show)
	var tabs = document.getElementsByClassName("tabs")
	for(var i=0; i<tabs.length; i++){
		tabs[i].style.display = "none"
	}
	document.getElementById("kviz_tab").style.display = "block"
	if(document.getElementById("kviz_pogon").style.display != "block"){
		document.getElementById("kviz_podesavanja").style.display = "block"
	}
}

function brpitanja_label(value) {
	document.getElementById("brpitanja_label").innerHTML = value
}

function br_ponudjenih_span(value) {
	document.getElementById("br_ponudjenih_span").innerHTML = value
}

function dis_br_pon_odg(t) {
	console.log(t)
	if(t == true){
		document.getElementById("br_pon_odg_input").disabled = false
	} else {
		document.getElementById("br_pon_odg_input").disabled = true
	}
}

function Constructor(tip_pitanja, tip_odgovora, sel_br_pon_odg){
	var td_e, p_e, input_e, drzava, grad, resenje, vodic_e

	this.sel_br_pon_odg = sel_br_pon_odg
	this.tip_pitanja = tip_pitanja
	this.tip_odgovora = tip_odgovora
	this.td = function () {
		td_e = document.createElement("td")
		document.getElementById("tabela").appendChild(td_e)
	}
	this.p = function () {
		var p_e = document.createElement("p")
		drzava = Object.keys(finalGG)[random_number(Object.keys(finalGG).length)]
		grad = finalGG[drzava]
		if(tip_pitanja == "Gradove"){
			p_e.innerHTML = drzava
			resenje = grad
		} else {
			p_e.innerHTML = grad
			resenje = drzava
		}
		td_e.appendChild(p_e)
	}
	this.vodic = function () {
		vodic_e = document.createElement("p")
		vodic_e.className = "vodic"
		vodic_e.style.display = "none"
		td_e.appendChild(vodic_e)
	}
	this.input = function () {
		input_e = document.createElement("input")
		input_e.type = "text"
		input_e.className = "default_input"
		input_e.addEventListener("input", function() {
			if(this.value == resenje){
				vodic_e.innerHTML = "Tačno!"
				vodic_e.style.color = "cyan";
			} else {
				vodic_e.innerHTML = "Netačno!"
				vodic_e.style.color = "red";
			}
			var valutae = this.value
			this.value = valutae.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
		})
		td_e.appendChild(input_e)
	}
	this.select = function () {
		var select_e = document.createElement("select")
		var option_e
		var rnd_k = random_number(sel_br_pon_odg)
		console.log(rnd_k)
		for(var k=0; k<sel_br_pon_odg; k++){
			if(k == rnd_k){
				option_e = document.createElement("option")
				option_e.className = "opcije" + k
				option_e.innerHTML = resenje
				select_e.appendChild(option_e)
			}
			option_e = document.createElement("option")
			option_e.className = "opcije" + k
			var d = Object.keys(finalGG)[random_number(Object.keys(finalGG).length)]
			if(tip_pitanja == "Gradove"){
				option_e.innerHTML = finalGG[d]
			} else {
				option_e.innerHTML = d
			}
			/*
			for(var h=0; h<document.getElementsByClassName("opcije" + k).length; h++){
				if(document.getElementsByClassName("opcije" + k)[h].innerHTML == option_e.innerHTML){
					k -= 1
				} else {
					select_e.appendChild(option_e)
				}
			}
			*/
			select_e.appendChild(option_e)
		}
		select_e.addEventListener("change", function() {
			if(this.value == resenje){
				vodic_e.innerHTML = "Tačno!"
				vodic_e.style.color = "cyan";
			} else {
				vodic_e.innerHTML = "Netačno!"
				vodic_e.style.color = "red";
			}
		})
		select_e.value = ""
		td_e.appendChild(select_e)
	}
	
}

function kviz_start() {
	//Pokaži tabelu
	document.getElementById("kviz_pogon").style.display = "block"
	document.getElementById("kviz_podesavanja").style.display = "none"
	// Ubaci selektovane objekte u finalGG obj.
	if(document.getElementById('Evropa').checked){
		Object.assign(finalGG, evropa)
	} if (document.getElementById('Azija').checked){
		Object.assign(finalGG, azija)
	} if (document.getElementById('Afrika').checked){
		Object.assign(finalGG, afrika)
	} if (document.getElementById('L_Amerika').checked){
		Object.assign(finalGG, l_amerika)
	} if (document.getElementById('A_Amerika').checked){
		Object.assign(finalGG, a_amerika)
	}
	//
	var sel_br_pon_odg = document.getElementById("br_pon_odg_input").value
	//
	var tip_pitanja = document.getElementById("kviz_tip").value
	var tip_odgovora
	if(document.getElementById("pisanje_odg").checked){
		tip_odgovora = 0
	} else if(document.getElementById("selektovanje_odg").checked){
		tip_odgovora = 1
	}
	console.log(tip_pitanja + " " + tip_odgovora)

	// pozovi new određen broj puta
	var num = document.getElementById("brpitanja_range").value
	for(var i=0; i<num; i++){
		var td_ = new Constructor(tip_pitanja, tip_odgovora, sel_br_pon_odg)
		td_.td()
		td_.p()
		td_.vodic()
		if(tip_odgovora == 0){
			td_.input()
		} else if(tip_odgovora == 1){
			td_.select()
		}
		
	}
		
}

function check() {
	var vodici = document.getElementsByClassName("vodic")
	for(var e=0; e<vodici.length; e++){
		vodici[e].style.display = "block"
	}
	setTimeout(function() {
		document.getElementById("tabela").innerHTML = ""
		if(confirm("Da pređemo u sledeći krug?") == true){
			kviz_start()
		} else {
			finalGG = {}
			document.getElementById("kviz_pogon").style.display = "none"
			document.getElementById("kviz_podesavanja").style.display = "block"
		}
	}, 1000)
}

function kviz_druga_podesavanja() {
	finalGG = {}
	document.getElementById("tabela").innerHTML = ""
	document.getElementById("kviz_pogon").style.display = "none"
	document.getElementById("kviz_podesavanja").style.display = "block"
}
