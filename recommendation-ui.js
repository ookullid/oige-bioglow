/* KITA personalised candidate comparison UI */
(function(root){
'use strict';
const labels={bumblebee:['Kimalased','Bumblebees'],solitary_bee:['Erakmesilased','Solitary bees'],hoverfly:['Sirelased','Hoverflies'],butterfly:['Päevaliblikad','Butterflies'],specialist_bee:['Spetsialiseerunud erakmesilased','Specialist solitary bees'],light:['Valgus','Light'],moisture:['Niiskus','Moisture'],nutrients:['Mullaviljakus','Soil nutrients'],sun:['Päike','Sun'],part:['Poolvari','Part shade'],shade:['Vari','Shade'],dry_tolerant:['Kuivem kasvukoht (kuivataluvus)','Drier site (drought tolerance)'],moderate:['Parasniiske','Moderately moist'],moist_preferred:['Niiskuslembene','Moisture-loving'],poor:['Toitainevaene','Nutrient-poor'],rich:['Toitainerikas','Nutrient-rich']};
const months=[['jaan','Jan'],['veebr','Feb'],['märts','Mar'],['apr','Apr'],['mai','May'],['juuni','Jun'],['juuli','Jul'],['aug','Aug'],['sept','Sep'],['okt','Oct'],['nov','Nov'],['dets','Dec']];
let active=null,showAll=false;
const $=id=>document.getElementById(id);
function render(names,db,resolve,legacy,onExplore){
 active={names,db,resolve,legacy,onExplore};const target=$('recommendationResults');if(!target||!root.KITARecommendations)return;
 const lang=root.KITAI18n?.getLang()==='en'?1:0,t=(a,b)=>lang?b:a;
 const label=k=>labels[k]?.[lang]||k;
 const monthList=arr=>arr.map(m=>months[m-1][lang]).join(', ');
 const input={light:$('recommendLight').value,moisture:$('recommendMoisture').value,nutrients:$('recommendNutrients').value,focus:$('recommendFocus').value,nativeOnly:$('recommendNative').checked};
 const result=root.KITARecommendations.rank({names,db,resolve,site:input,legacy,limit:showAll?1000:6});
 const add=(parent,tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;parent.append(n);return n;};
 const button=(parent,txt,fn,cls='btn secondary')=>{const b=add(parent,'button',cls,txt);b.type='button';b.addEventListener('click',fn);return b;};
 target.replaceChildren();
 root.KITACommunityUI?.render(result,onExplore);
 if(!result.available){add(target,'p','garden-notice',t('Andmebaas pole saadaval.','Plant database unavailable.'));return;}
 const notice=add(target,'div','recommend-notice');
 add(notice,'strong','',t('Esialgsed taimekandidaadid, mitte kinnitatud istutussoovitused','Preliminary plant candidates, not approved planting recommendations'));
 add(notice,'p','',t('Kaitse- ja võõrliikide nimekirjade täielik kontroll puudub. Kontrolli ametlikku staatust, kasvuruumi, mulla pH-d ja kohalikku sobivust enne istutamist.','Legal and alien species checks are incomplete. Verify official status, space, soil pH and local suitability before planting.'));
 if(!result.input.light&&!result.input.moisture&&!result.input.nutrients)add(target,'p','garden-notice',t('Kasvukoht on kirjeldamata. Vali tingimused, et nimekirja täpsustada.','Site not described. Select conditions to narrow the results.'));
 if(result.garden.unknownBloom.length||result.garden.unknownVisitors.length)add(target,'p','garden-notice',t('Aia andmed on osaliselt puudulikud: kandidaat võib lisada dokumenteeritud seose, kuid tegelik toidupuudus pole kinnitatud.','Garden data are incomplete: a candidate may add documented evidence, but actual food shortage is not confirmed.'));
 add(target,'p','muted',t('Leitud kandidaate: ','Candidates found: ')+result.total+'. '+t('Teadaoleva hoiatusega, kaitsealused ja valitud tingimustega vastuolus olevad taimed jäetakse välja.','Known warnings, protected taxa and plants conflicting with selected conditions are excluded.'));
 if(!result.total){add(target,'p','garden-notice',t('Praeguste andmetega ei leitud kandidaate. Proovi muuta filtreid või täpsustada kasvukohta. KITA ei täida puuduvat infot oletustega.','No candidates with current data. Try adjusting filters or describing the site. KITA does not guess missing data.'));return;}
 const grid=add(target,'div','recommend-grid');
 for(const item of result.candidates){
  const card=add(grid,'article','recommend-card');
  const top=add(card,'div','recommend-card-top');add(top,'h4','',item.name);add(top,'span','recommend-fit '+item.fit.status,item.fit.status==='match'?t('Valitud tingimused kattuvad','Selected conditions match'):item.fit.status==='unknown'?t('Vajab kasvukoha kontrolli','Site check needed'):t('Kasvukoht kirjeldamata','Site not described'));
  add(card,'i','muted',item.scientific);
  const native=add(card,'p','recommend-native',item.native==='documented'?t('Eesti pärismaisuus allikaga kinnitatud','Estonian native status documented'):t('Eesti pärismaisuus eraldi kontrollimata','Estonian native status not verified'));
  if(item.native==='documented')native.className+=' documented';
  add(card,'p','',t('Õitsemine Tallinna kataloogis: ','Flowering in Tallinn catalog: ')+monthList(item.bloom));
  add(card,'p','',t('Dokumenteeritud õiekülastajate seosed: ','Documented flower visitor associations: ')+item.visitors.map(label).join(', '));
  if(item.host)add(card,'p','',t('Dokumenteeritud liblikaröövikute toidutaim.','Documented butterfly larval host.'));
  if(item.growthForm||item.height)add(card,'p','muted',t('Kasvuvorm / kõrgus: ','Growth form / height: ')+[item.growthForm,item.height].filter(Boolean).join(' · '));
  const reasons=add(card,'ul','recommend-reasons');
  if(item.gapMonths.length)add(reasons,'li','',t('Lisaks seose võimaliku lüngaga kuudele: ','Adds evidence in possible gap months: ')+monthList(item.gapMonths));
  if(item.uncertainMonths.length)add(reasons,'li','',t('Lisaks seose puudulike andmetega kuudele: ','Adds evidence in uncertain months: ')+monthList(item.uncertainMonths));
  if(item.starterMonths.length)add(reasons,'li','',t('Algse nimekirja katvus: ','Initial inventory coverage: ')+monthList(item.starterMonths));
  if(item.newGroups.length)add(reasons,'li','',t('Uued dokumenteeritud rühmad: ','New documented groups: ')+item.newGroups.map(label).join(', '));
  if(item.focusMonths.length)add(reasons,'li','',t('Valitud rühma täiendavad õitsemiskuud: ','Additional flowering months for selected group: ')+monthList(item.focusMonths));
  if(item.groupMonths.length)add(reasons,'li','',t('Lisanduvad rühma ja kuu tõendikombinatsioonid: ','Additional group-month evidence combinations: ')+item.groupMonths.length);
  if(!item.incremental)add(reasons,'li','',t('Ei lisa praegusele nimekirjale uut dokumenteeritud kuu või rühma kombinatsiooni.','Adds no new documented month or group combination to the current inventory.'));
  const checks=add(card,'div','recommend-site');
  for(const x of item.fit.checks)add(checks,'small','',label(x.key)+': '+(x.status==='match'?t('allika järgi kattub','matches source'):t('andmed puuduvad','data missing')));
  const sources=add(card,'details','garden-sources');add(sources,'summary','',t('Andmeallikad','Evidence sources'));for(const s of item.sources){const a=add(sources,'a','',s.publisher);a.href=s.url;a.target='_blank';a.rel='noopener';}
  if(onExplore)button(card,t('Vaata kataloogis','View in catalog'),()=>onExplore(item.scientific));
 }
 if(result.total>6)button(target,showAll?t('Näita esimest 6','Show first 6'):t('Näita kõiki kandidaate','Show all candidates'),()=>{showAll=!showAll;refresh();});
}
function refresh(){if(active)render(active.names,active.db,active.resolve,active.legacy,active.onExplore);}
function bind(){root.KITACommunityUI?.bind();for(const id of ['recommendLight','recommendMoisture','recommendNutrients','recommendFocus','recommendNative'])$(id)?.addEventListener('change',()=>{showAll=false;refresh();});}
root.KITARecommendationUI=Object.freeze({render,bind});
})(window);
