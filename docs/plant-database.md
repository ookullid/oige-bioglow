# KITA taimede andmebaas v1.0.1

Kuupäev: 2026-11-26. Piirkond: Eesti. Andmestik on algversioon, mitte eksperdi valideeritud soovituste süsteem.

## Sisu

- 14 liigipõhist ökoloogia kirjet (üks osaline). Iga teadaoleva välja juures allikaviide, kuupäev, kontekst; null = teadmata. Õitsemiskuud on Tallinna haljastuskataloogi ligikaudsed ajad, mitte täpsed Eesti fenoloogilised prognoosid. Röövikute toidutaim ei võrdu õiekülastaja ega nektaritaimega. Oligolektilised mesilased on erakmesilaste alarühm; neid ei summeerita. Kasvupinnase toitainesisaldus ei võrdu lõimisega. Kuivataluvus ei tähenda, et taim eelistab kuiva mulda. Kataloogi päritolu 'looduslik' ei tõenda iseenesest Eesti pärismaisu; eraldi väli nativeEstonia on praegu viie liigi puhul eraldi USDA GRIN allikaga kinnitatud.
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
