# KITA taimekoosluse planeerija v1.0

## Eesmärk
Leida kuni 1–8 liigi kombinatsioon, mis täiendab kasutaja olemasoleva aia dokumenteeritud õitsemist ja õiekülastajate seoseid. Tegemist on tõendikombinatsioonide optimeerimise prototüübiga, mitte kinnitatud istutusplaani või mõõdetud elurikkuse suurenemisega.

## Sisend ja filtrid
Planeerija kasutab recommendation-model.js täielikku kandidaatide nimekirja, mitte ekraanil nähtavat esimest kuut. Säilivad olemasolevate liikide, teadaolevate võõrliikide, kaitsealuste taksonite, kasvukoha kategooriate, pärismaisu ja õiekülastajate fookuse filtrid. Kui kasutaja on kasvukohta kirjeldanud, jäävad teadmata kasvukohavastega kandidaadid vaikimisi välja; kasutaja saab need eraldi kaasata. Kirjeldamata kasvukoht ei ole sobivuse tõend.

## Optimeerimine
Iga kandidaadi panus teisendatakse kuude, põhirühmade ning rühma-kuu kombinatsioonide bitimaskideks. Koosluse panus arvutatakse hulgateoreetilise ühendi abil. Korduvat kuud ega rühma-kuu kombinatsiooni ei loeta mitu korda. Spetsialiseerunud erakmesilaste alarühma ei loeta eraldi põhirühmaks; valitud fookus võib siiski olla see alarühm.

Leksikograafiline järjestus:
1. Võimaliku lüngaga kuude arv.
2. Tühja aia algse planeerimise kuud.
3. Puuduliku infoga kuude lisatõendid.
4. Valitud fookusrühma uued kuud.
5. Uued dokumenteeritud põhirühmad.
6. Unikaalsed uued põhirühma-kuu kombinatsioonid.
7. Dokumenteeritud röövikute toidutaime lisandumine, kui seni pole ühtki.
8. Viigi korral vähem teadmata kasvukohavasteid, vähem teadmata pärismaisu ja vähem liike.

Ahne algvalik annab kasutatava variandi ka suurema andmestiku korral. Seejärel kontrollib algoritm kõiki kombinatsioone kuni valitud liikide piirini, välja arvatud kui saavutatakse vaikimisi 150 000 kombinatsiooni arvutuspiir. Sel juhul näidatakse parimat leitud varianti ja piirangu teadet, mitte garanteeritud optimumi. Võrdsete tulemuste korral on valik deterministlik, kuid ei väida bioloogilist paremust. Kui ükski kombinatsioon ei lisa uut tõendit, on tulemus tühi. Valitud maksimum ei ole kohustuslik täpne liikide arv.

## Väljund
Enne/pärast kuude katvus (märts–oktoober, esialgne kasutajaliidese vaatlusaken), põhirühmade uued kuud, valitud taimed, nende allikad, teadaolevad puudujäägid ja ebakindlus. Kavand ei muuda olemasolevat aia nimekirja ega salvesta isikuandmeid. Euroopa maksimaalseid õitsemisvahemikke ei kasutata kohaliku kalendri asendajana. Õitsemise ja liigipõhise õiekülastajaseose kombinatsioon ei ole konkreetsel kuul mõõdetud külastus.

## Piirangud
Taimede omavahelist konkurentsi, kasvuruumi, kõrgust kui piirangut, istutustihedust, pH-d, lõimist, maksumust ega tegelikku nektarikogust ei optimeerita. Kaitse- ja võõrliikide nimekirjad on osalised. Kogu kavand vajab enne kasutamist kohalikku kasvukoha ja õigusliku staatuse kontrolli. Eksperdivalidatsioon ja päris brauseri test on ootel.

## Näidistest
V1.2.0 andmestik, tühi aed, filtriteta, maksimaalselt 5 liiki: 21 kandidaati; 27 895 kombinatsiooni; 5 liiki; 7/8 dokumenteeritud kavandatavat kuud; 22 uut põhirühma-kuu kombinatsiooni. Oktoober jääb katmata. See ei ole mõõdetud elurikkuse tulemus.

Korduvtestid: `node --test tests/community-model.test.cjs`. Kasutajaliidese kontrollid tehti simuleeritud DOM-is.
