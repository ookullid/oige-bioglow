# KITA Minu aed – analüüsi metoodika v1.0

Andmebaas: plant-ecology.js v1.2.0. Analüüs ei ole elurikkuse skoor, elupaiga kvaliteedi mõõtmine ega istutussoovitus.

## Arvutus

- Aia nimekiri: brauseri kohalik salvestus; taksonite sünonüümid ühendatakse, kui olemasolev register need üheselt seostab. Tundmatud kirjed säilivad.
- Kalendris kasutame ainult allikaviitega `floweringMonths` väärtusi (Tallinna haljastuskataloog), mitte Euroopa maksimaalseid õitsemisvahemikke. Kõik 12 kuud kuvatakse. Märts–oktoober on esialgne analüüsiaken, mitte teaduslik piisavuslävend.
- Õitsev taim ja dokumenteeritud õiekülastaja seos samal liigikirjel moodustavad kalendri tõendikombinatsiooni. See ei tähenda vaatlust konkreetses kuus ega tõenda piisavat toitu.
- Kimalased, erakmesilased, sirelased, päevaliblikad ning spetsialiseerunud erakmesilased kuvatakse eraldi. Viimane rühm on alarühm; rühmade arve ei summeerita. Liblikaröövikute toidutaimi näidatakse eraldi.
- Dokumenteeritud kombinatsioon puudub: kui kirjetel on kohalik õitsemisaeg ja sel kuus puudub dokumenteeritud õitsemise-külastajaseose kombinatsioon ning ükski tundmatu kirje ei mõjuta hinnangut, kuvatakse võimalik lünk. Kui õitsemisinfo puudub või õitseva liigi külastajainfo on teadmata, kuvatakse andmelünk. Mõlemad on tingimuslikud järeldused kasutaja nimekirja ja olemasolevate allikate kohta, mitte kinnitatud puudujäägid looduses.
- Teadaoleva võõrliigi hoiatusega kirjed jäävad aia inventuuri, kuid ei lähe positiivsete seoste arvestusse. Hoiatuse puudumine ei tähenda õiguslikku luba ega ohutust; täielik nimekirjade kontroll on ootel.
- Üks taimeliik loetakse üks kord, sõltumata isendite hulgast. Tulemus ei mõõda õite hulka, nektari või õietolmu kogust, putukate arvukust, pesitsuspaiku, ilmastikku ega aia hooldust.

## Testid

Käivita repositooriumi juurkaustas Node.js 18+ abil:

```sh
node --test tests/garden-model.test.cjs
```

Testid kasutavad tegelikku failipõhist KITA andmestikku. Brauseri vaate integratsioonikontrollid tehti simuleeritud DOM-is; päris seadmed, välised teenused ning visuaalne ligipääsetavus vajavad veel kontrolli. Soovitusmootor ja Supabase'i aedade salvestus ei ole osa sellest muudatusest.
