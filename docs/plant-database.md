# KITA taimede andmebaas v1.1.0

Kuupäev: 2026-11-26. Piirkond: Eesti. Andmestik on algversioon, mitte eksperdi valideeritud soovituste süsteem.

## Sisu

- 179 liigipõhist ökoloogiakirjet: 14 varasemat haljastuskataloogi kirjet ja 165 uut Euroopa indikaatorandmetega kirjet. 13 varasemat kirjet täiendatud Euroopa indikaatoritega. 14 liigil õitsemisandmed, 13 liigil õiekülastajate rühmad. Uued eestikeelsed nimetused on esialgsed, mitte registris kontrollitud; Euroopa indikaatorandmed ei tõenda Eestis esinemist ega pärismaisu. Iga teadaoleva välja juures allikaviide, kuupäev, kontekst; null = teadmata. Õitsemiskuud on Tallinna haljastuskataloogi ligikaudsed ajad, mitte täpsed Eesti fenoloogilised prognoosid. Röövikute toidutaim ei võrdu õiekülastaja ega nektaritaimega. Oligolektilised mesilased on erakmesilaste alarühm; neid ei summeerita. Kasvupinnase toitainesisaldus ei võrdu lõimisega. Kuivataluvus ei tähenda, et taim eelistab kuiva mulda. Kataloogi päritolu 'looduslik' ei tõenda iseenesest Eesti pärismaisu; eraldi väli nativeEstonia on praegu viie liigi puhul eraldi USDA GRIN allikaga kinnitatud.
- 15 hoiatusreeglit: 13 Eesti keelatud võõrtaimede kirjet (sh kogu ambroosia perekond) ja 2 probleemset võõrliiki. Keelatud ja probleemne eristatud. EL nimekiri ja kaitsealuste liikide täielik ajakohane kontroll veel puudu; hoiatuse puudumine ei tähenda lubatud või soovitatud liiki.
- Olemasolev nimiindeks on jätkuvalt otsitav, aga sellele ei omistata kontrollimata ökoloogilisi andmeid.

Olemasolevaid probleemseid taimi saab aia inventuuri märkida, kuid neid ei soovitata istutada. Aia kirje ei ole istutussoovitus.

## Allikad ja laiendamine

1. Tallinna elurikka haljastuse kataloog https://haljastus.tallinn.ee/elurikka-haljastuse-kataloogist/ — vähesed üksikfaktid käsitsi allikatega; kogu kataloogi kopeerimiseks küsida andmeomanikult luba / masinloetavat eksporti. Ei kopeerita pilte ega kirjeldusi.
2. Eesti taimenimede register https://taimenimed.ut.ee/ — nimede kontroll; hulgiimpordi õigused kontrollida.
3. FloraVeg.EU https://floraveg.eu/download/ ja Chytrý et al. 2024 https://doi.org/10.1111/avsc.12798 — ökoloogilised indikaatorid; enne importi kontrollida konkreetse faili litsents, versioon ja tulpade definitsioonid. Ellenbergi väärtusi ei tohi automaatselt tõlgendada aia kasvugarantiina.
4. GRIIS Estonia https://doi.org/10.15468/53s95n — CC BY 4.0; järgmine samm DWCA impordi adapter, taksoni sobitamine, täpne allika versioon. GRIIS puuduv liik ei tähenda pärismaist ega ohutut.
5. EuPPollNet (parandatud väljaanne) https://doi.org/10.1111/geb.70054 ja https://doi.org/10.5281/zenodo.15183272 — interaktsioonid; kontrollida faili ligipääs ja litsents; külastus ei tähenda mõõdetud tolmeldamistõhusust; puuduv vaatlus ei tähenda puuduvat seost.
6. Keskkonnaamet https://www.keskkonnaamet.ee/elusloodus-looduskaitse/voorliigid/keelatud-voorliigid-load — siseriiklik ja EL nimekiri, probleemsed liigid; kontrollida ametliku koondnimekirja uusimat seisu enne avaldamist.
7. GBIF https://www.gbif.org/ ja eElurikkus https://elurikkus.ee/ — taksonoomia, esinemine; vaatlusarv ei tõenda pärismaisu, sobivust ega väärtust.

## Laiendamise töövoog

Võta allika versioon ja litsents; salvesta allika koopia/viide; sobita ainult üheselt määratud taksonid (täpne nimi või kinnitatud sünonüüm); kontrolli riikliku/EL loendi ja kaitsekategooria vastavust; lisa väljade kaupa allikas, piirkond ja väärtus; lahenda vastuolud eksperdiga; valideeri skeem; testi; alles siis ava soovitused. Soovitatud järgmine etapp: 50–100 tavalisemat liiki, sh kevad- ja hilissuvised õitsejad, puittaimed ning röövikute toidutaimed. Hiljem avatud andmestike import. Andmebaas on failipõhine, ei sisalda isikuandmeid ega nõua Supabase'i muudatusi.

## Euroopa indikaatorite import 2026-11-26

Allikas: Tichý et al. (2023), Journal of Vegetation Science, DOI 10.1111/jvs.13168; andmestiku v2.0 DOI 10.5281/zenodo.7427088 (CC BY 4.0). Kasutatud masinloetav vahendus: Midolo et al. (2024), Landscape Ecology, DOI 10.1007/s10980-024-02016-6, CSV https://github.com/gmidolo/historical-land-use-effects-on-Central-EU-grassland-vegetation/blob/main/ecological.and.disturbance.values.csv, blob SHA 342dedc447c05615c82bdd3c8356ce03be0695dd. Tabeli autorid kirjeldavad L/M/N/R/T väärtusi algsete Ellenbergi tüüpi väärtustena. Algset Zenodo XLSX-faili ei saanud siin otse alla laadida; võimalik ümardus vahendustabelis, seetõttu säilitatakse täpselt vahendustabeli väärtused ja viide. Muud tabeli muutujad (RC ja häiring) jäeti importimata. Sobitus ainult täpse kaheosalise liiginimega, ilma automaatse sünonüümi- või agregaaditaseme teisenduseta. Valik on KITA koostatud Eesti jaoks asjakohaste kandidaatide loend, mitte ametlik Eesti liikide nimekiri. Allikas ei tõesta liigi esinemist Eestis, taimede ohutust, kaitse- või võõrliigistaatust. L 1–9, M 1–12, N/R/T 1–9; ordinaalskaalad, R ei ole mõõdetud pH, näitajad ei ole aia kasvutingimuste lävendid. Õitsemise ja külastajate null tähendab andmete puudumist, mitte õitsemise või külastajate puudumist. Soovituste mootor jääb välja lülitatuks. 

Täpselt sobitatud: 178; uusi liike: 165; täiendatud olemasolevaid: 13; täpse vasteta jäeti välja: Achillea millefolium. 
