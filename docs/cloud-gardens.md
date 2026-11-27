# KITA – privaatsete aedade pilvesalvestus v1.0

## Kasutamine
1. Logi olemasoleva KITA kontoga sisse ja ava Minu aed.
2. Kohalik mustand jääb brauserisse; sisselogimine ei impordi seda automaatselt.
3. Sisesta uue aia nimi. Loo tühi aed või kopeeri parajasti kuvatav nimekiri koos filtritega.
4. Muuda taimede nimekirja, nime ja kasvukoha/planeerija filtreid ning vajuta Salvesta aed kontole.
5. Taimekoosluse salvestamiseks salvesta esmalt aed; anna kuvatud kavandile nimi ja salvesta. Kavand on muutumatu ajalooline koopia, sisaldab andmestiku versiooni, aia versiooni, lähte­taimi, filtreid, kavandatud liike, allikaid ja katvuse tulemusi. Kavand ei tähenda, et taimed on juba istutatud. Uuendatud kavand salvesta uue kirjena.
6. Teises seadmes logi sama kontoga sisse, värskenda aedade nimekirja ja ava soovitud aed. Sünkroonimine ei ole reaalajas ega automaatne.
7. Aia kustutamine kustutab ka selle kavandid; kasutajaliides küsib kinnitust.

## Tehniline lahendus
Supabase migration 20261126183311, `kita_private_gardens_and_plans`, on rakendatud Bioglow projektis. SQL koopia on supabase/migrations kataloogis; olemasolevas projektis ära rakenda seda uuesti. Tabelid `kita_gardens` ja `kita_garden_plans` on RLS-kaitsega. Ainult authenticated rollil on vajalikud õigused, omaniku kontroll põhineb auth.uid()-l. Kavandi FK (garden_id,user_id) tagab, et kavand kuulub sama omaniku aeda. Kavandid on ainult lisatavad, loetavad ja kustutatavad. Uut salavõtit ei lisatud.

Aia salvestamisel on revision-põhine optimistlik lukustus: uuendus toimub ainult avatud versiooni alusel. Konflikti korral kohalikud muudatused jäävad vaatesse, kasutaja võib neist teha koopia või uuesti avada uusima aia. Kavand on ajalooline versioonisnapshot: enne lisamist kontrollitakse versiooni; samaaegne hilisem muudatus ei muuda snapshot'i. Tabelid ei säilita aadressi ega GPS-andmeid. Pilveaia mustandit ei kirjutata külalise localStorage'i. Konto vahetamisel/ väljalogimisel puhastatakse pilvevaade, pooleliolevate päringute tulemusi ignoreeritakse. Sunnitud sessiooni lõpp võib salvestamata pilvemuudatused kaotada. Brauseris kohalik mustand on seadmes teistele brauseri kasutajatele nähtav nagu varemgi.

## Kontroll
- Päris Supabase SQL tehingus kontrollitud omaniku CRUD, teise kasutaja lugemise/muutmise/kustutamise tõkestamine, võõra omaniku nimel sisestamise tõkestamine, revision konflikt ja cascade kustutamine. Testtehing rollback; püsivaid testandmeid ei jäetud.
- Anon rollil uute tabelite SELECT õigus puudub.
- 17 simuleeritud DOM-i ja Supabase kliendi kontrolli läbitud; päris brauseris kahe seadme ja tegeliku sisselogimise test on veel vajalik.
- Supabase security advisor ei tuvastanud uusi tabelitega seotud hoiatuseid; varasem public.bioglow_public_stats SECURITY DEFINER anon/authenticated ligipääs ja väljalülitatud lekkinud paroolide kaitse vajavad eraldi otsust. Neid varasemaid funktsioone/seadeid ei muudetud.
- Avalik veebiversioon ja olemasolevad tabelid on muutmata; frontend on kita-ui-refresh harus. Uued andmebaasitabelid on juba aktiivses projektis olemas.

Järgmiseks: brauseri test, kasutajate tagasiside, olemasolevate avaliku statistika õiguste audit ning vajaduse korral päris reaalajas sünkroonimine.
