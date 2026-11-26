# KITA personaalsed taimekandidaadid v1.0

Andmeallikas: KITA plant-ecology.js v1.2.0. See on esialgne tõendipõhine kandidaatide võrdlus, mitte eksperdi valideeritud istutussoovitus.

## Kasutaja sisend
Olemasolevate taimede nimekiri, valgus, mulla niiskuse kategooria, mullaviljakus, valikuline õiekülastajate rühm ning valik näidata ainult dokumenteeritud Eesti pärismaiseid liike. Teadmata tingimus ei muutu automaatselt sobivuseks. Kuivataluvus ei ole kuiva pinnase eelistuse tõend; püsiva niiskuse valik ei hõlma üleujutust. Mulla pH, lõimis, piirkondlik kliima, taimede kasvuruum ning hooldus ei ole praegu algoritmi filtrid.

## Kohustuslikud filtrid
- Eemalda aias juba olevad liigid (üheselt seostatud nimed).
- Eemalda olemasoleva võõrliikide hoiatusregistri ning varasemate INVASIVE ja PROTECTED_I/II/III kontrollnimekirjade vasted. Need loendid ei ole täielikult ajakohase õiguse suhtes valideeritud. Hoiatuse puudumine ei tähenda luba istutada.
- Eemalda dokumenteeritud mittepärismaised liigid; kinnitatud pärismaisu filtri valimisel eemalda ka teadmata päritoluga liigid.
- Nõua allikaviidetega kohalikku õitsemiskuud (märts–oktoober) ja vähemalt üht dokumenteeritud põhigrupi õiekülastajaseost. Euroopa maksimaalseid õitsemisvahemikke ei kasutata. Röövikute toidutaime staatus on eraldi lisateave, mitte õiekülastuse asendaja.
- Kui valitud kasvukoha tingimus ei sisaldu allika dokumenteeritud kategooriates, jäta liik sellest võrdlusest välja. See ei tõenda bioloogilist sobimatust. Kui kategooria või allikas puudub, säilita kandidaat eraldi märgistatud ebakindla vastena. Ellenbergi indikaatoreid ei teisendata aianduslikeks tolerantsideks.
- Kui fookusrühm on valitud, nõua dokumenteeritud seost selle rühmaga.

## Järjestus
Kandidaadid järjestatakse leksikograafiliselt, ilma kaalutud elurikkuseskoorita:
1. Valitud tingimustega dokumenteeritud vaste (või tingimusi pole valitud) enne teadmata kasvukohaga vasteid.
2. Rohkem võimaliku lüngaga kuid, seejärel tühja aia planeerimiskuud ja andmelüngaga kuud.
3. Rohkem valitud rühma täiendavaid õitsemiskuid ja uusi dokumenteeritud põhirühmi.
4. Dokumenteeritud Eesti pärismaisuus.
5. Rohkem täiendavaid rühma-kuu kombinatsioone ning uue röövikute toidutaime seos.
6. Ladinakeelne nimi viigimurdjana.

Rühma-kuu kombinatsioon ühendab liigipõhise õiekülastajaseose ja õitsemisaja; ei tõenda külastust selles kuus. Võimalik lünk on tingimuslik andmejäreldus, mitte mõõdetud toidupuudus. Ebakindla kuu puhul kuvatakse lisanduv tõend, mitte kinnitatud lünga täitmine. Kui uusi kombinatsioone ei teki, kuvatakse see selgelt. Taimede arv ei näita nektarikogust, taimede isendite arvu ega putukate arvukust. Spetsialiseerunud erakmesilaste alarühma ei loeta eraldi põhigrupiks.

## Kontroll ja kasutuselevõtt
V1.2.0 andmestikus on tühja aia ja filtriteta 21 esialgset kandidaati, neist viiel on pärismaisu allikas. Järjestus on KITA disainiotsus, mitte valideeritud teaduslik optimeerimismudel. Enne istutamist tuleb kontrollida ajakohast õiguslikku staatust, taimede päritolu ja konkreetse kasvukoha sobivust. Soovitusvaade ei muuda aia nimekirja ega tee istutusotsuseid kasutaja eest. Supabase'i muudatusi ei ole.

Korduvtestid: `node --test tests/recommendation-model.test.cjs`. Kasutajaliidest kontrolliti simuleeritud DOM-is; päris brauser ja eksperdivalidatsioon on ootel.
