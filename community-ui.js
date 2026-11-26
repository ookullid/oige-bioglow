/* KITA community planner – separate what-if view, never writes to the garden. */
(function(root){
'use strict';
const $=id=>document.getElementById(id);
const groups={bumblebee:['Kimalased','Bumblebees'],solitary_bee:['Erakmesilased','Solitary bees'],hoverfly:['Sirelased','Hoverflies'],butterfly:['Päevaliblikad','Butterflies']};
const months=[['märts','Mar'],['apr','Apr'],['mai','May'],['juuni','Jun'],['juuli','Jul'],['aug','Aug'],['sept','Sep'],['okt','Oct']];
let latest=null,explore=null;
function render(result,onExplore){
 latest=result;explore=onExplore;
 const target=$('communityResults');if(!target||!root.KITACommunityPlanner)return;
 const lang=root.KITAI18n?.getLang()==='en'?1:0,t=(a,b)=>lang?b:a;
 const label=g=>groups[g]?.[lang]||g;
 const month=m=>months[m-3]?.[lang]||String(m);
 const list=arr=>arr.map(month).join(', ');
 const add=(parent,tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;parent.append(n);return n;};
 const plan=root.KITACommunityPlanner.plan(result,{max:Number($('communityMax').value)||5,includeUnknown:$('communityUnknown').checked});
 target.replaceChildren();
 if(!plan.available){add(target,'p','garden-notice',t('Andmebaas pole saadaval.','Plant database unavailable.'));return;}
 const notice=add(target,'div','recommend-notice');
 add(notice,'strong','',t('Planeerimise prototüüp – mitte kinnitatud istutusplaan','Planning prototype – not an approved planting plan'));
 add(notice,'p','',t('Kasutab ülal valitud kasvukohta, pärismaisu ja tolmeldaja fookust. Kontrolli enne istutamist liikide õiguslikku staatust, kasvuruumi, taimede omavahelist sobivust ja mullatingimusi.','Uses the site, native-status and pollinator filters above. Verify legal status, space, compatibility between plants and soil conditions before planting.'));
 if(!result.input.light&&!result.input.moisture&&!result.input.nutrients)add(target,'p','garden-notice',t('Kasvukoht pole kirjeldatud. Valik ei kinnita kasvukohale sobivust.','Site not described. The selection does not establish site suitability.'));
 add(target,'p','muted',t('Võrreldud kandidaatide arv: ','Candidates considered: ')+plan.candidateCount+' · '+t('Teadmata kasvukohavaste tõttu välja jäetud: ','Excluded due to unknown site match: ')+plan.excludedUnknown);
 if(!plan.plants.length){add(target,'p','garden-notice',plan.candidateCount?t('Praeguste tõendite põhjal ei lisa ükski lubatud kombinatsioon uut katvust. KITA ei täida nimekirja tarbetute liikidega.','No eligible combination adds new evidence coverage. KITA does not fill the list with redundant species.'):t('Valitud filtritega ei leitud planeerimiseks sobivaid kandidaate. Täpsusta tingimusi või laienda andmestikku.','No eligible candidates for these filters. Refine conditions or expand the dataset.'));return;}
 const metrics=add(target,'div','garden-metrics community-metrics');
 const before=plan.before.filter(m=>m.status==='documented').length,after=before+plan.addedMonths.length;
 for(const [name,value,detail] of [[t('Valitud liike','Selected species'),plan.plants.length+'/'+plan.max,t('kuni valitud maksimumini','up to selected maximum')],[t('Kuude katvus','Month coverage'),before+'/8 → '+after+'/8',t('olemasolev → kavandatav','existing → projected')],[t('Uued rühma-kuu seosed','New group-month links'),plan.newPairs.length,t('unikaalsed tõendikombinatsioonid','unique evidence combinations')],[t('Pärismaisuus allikaga','Documented native status'),(plan.plants.length-plan.unknownNative)+'/'+plan.plants.length,t('valitud kandidaatidest','of selected candidates')]]){
  const card=add(metrics,'div','garden-metric');add(card,'span','garden-metric-label',name);add(card,'strong','garden-metric-value',value);add(card,'small','muted',detail);
 }
 add(target,'p','muted',plan.exhaustive?t('Kõik lubatud kombinatsioonid kuni valitud piirini kontrollitud. Optimaalne allpool kirjeldatud järjestusreegli järgi.','All eligible combinations up to the selected limit checked. Optimal under the stated ranking rule.'):t('Kombinatsioonide otsing jõudis arvutuspiirini. Kuvatakse parim leitud variant, mitte garanteeritud optimum.','Search reached its computation limit. Showing the best found plan, not a guaranteed optimum.'));
 const section=add(target,'section','garden-analysis-section');add(section,'h3','',t('Enne ja pärast – märts kuni oktoober','Before and after – March to October'));
 const scroll=add(section,'div','garden-calendar-scroll');scroll.tabIndex=0;
 const table=add(scroll,'table','garden-calendar-table community-table');const head=add(add(table,'thead'),'tr');add(head,'th','',t('Kavand','Plan'));for(let m=3;m<=10;m++){const th=add(head,'th','',month(m));th.scope='col';}
 const body=add(table,'tbody');
 for(const [name,rows] of [[t('Praegu','Current'),plan.before],[t('Kavandatav','Projected'),plan.after]]){const tr=add(body,'tr');const th=add(tr,'th','',name);th.scope='row';for(const m of rows){const cls=m.status==='documented'?'associated':m.status==='projected'?'projected':m.status==='uncertain'?'unknown':'outside';const td=add(tr,'td',cls,m.status==='documented'?'●':m.status==='projected'?'+':m.status==='uncertain'?'?':'–');td.title=month(m.month)+': '+m.status;}}
 for(const plant of plan.plants){const tr=add(body,'tr');const th=add(tr,'th','',plant.name);th.scope='row';for(let m=3;m<=10;m++)add(tr,'td',plant.bloom.includes(m)?'projected':'outside',plant.bloom.includes(m)?'+':'–');}
 add(section,'p','muted',t('● olemasolev tõend · + kavandatav tõend · ? andmed puudulikud · – seos dokumenteerimata. Õitsemisaeg + liigiseos ei tõenda külastust sel kuul.','● existing evidence · + projected evidence · ? incomplete data · – undocumented. Flowering month plus species association does not establish a visit in that month.'));
 if(plan.gapMonths.length)add(section,'p','',t('Võimalike lünkade täiendused: ','Possible gap additions: ')+list(plan.gapMonths));
 if(plan.uncertainMonths.length)add(section,'p','',t('Lisatõendid puudulike andmetega kuudele: ','Added evidence in uncertain months: ')+list(plan.uncertainMonths));
 const remaining=plan.after.filter(m=>!['documented','projected'].includes(m.status));if(remaining.length)add(section,'p','garden-notice',t('Endiselt dokumenteerimata või ebakindel: ','Still undocumented or uncertain: ')+list(remaining.map(x=>x.month)));
 const groupSection=add(target,'section','garden-analysis-section');add(groupSection,'h3','',t('Tolmeldajarühmade katvus','Pollinator group coverage'));
 for(const g of plan.groupRows){const row=add(groupSection,'div','garden-group-row');const top=add(row,'div','garden-group-heading');add(top,'b','',label(g.group));add(top,'span','',g.before.length+'/8 → '+(g.before.length+g.added.length)+'/8');add(row,'small','muted',g.added.length?t('Lisanduvad kuud: ','Additional months: ')+list(g.added):t('Uusi dokumenteeritud kuid ei lisandu.','No additional documented months.'));}
 const items=add(target,'section','garden-analysis-section');add(items,'h3','',t('Valitud taimekooslus','Selected plant community'));
 const grid=add(items,'div','recommend-grid');
 for(const x of plan.plants){const card=add(grid,'article','recommend-card');add(card,'h4','',x.name);add(card,'i','muted',x.scientific);add(card,'p','',t('Õitsemine: ','Flowering: ')+list(x.bloom));add(card,'p','',t('Õiekülastajate seosed: ','Visitor associations: ')+x.visitors.map(g=>groups[g]?.[lang]||t('Spetsialiseerunud erakmesilased','Specialist solitary bees')).join(', '));add(card,'p','muted',x.fit.status==='match'?t('Valitud tingimused kattuvad allikaga.','Selected conditions match source.'):x.fit.status==='unknown'?t('Kasvukoha andmed puudulikud.','Site data incomplete.'):t('Kasvukoht kirjeldamata.','Site unspecified.'));add(card,'p','muted',x.native==='documented'?t('Eesti pärismaisuus dokumenteeritud.','Estonian native status documented.'):t('Eesti pärismaisuus kontrollimata.','Native status not verified.'));if(x.growthForm||x.height)add(card,'p','muted',t('Kasvuvorm / kõrgus: ','Growth form / height: ')+[x.growthForm,x.height].filter(Boolean).join(' · '));const details=add(card,'details','garden-sources');add(details,'summary','',t('Allikad','Sources'));for(const s of x.sources){const a=add(details,'a','',s.publisher);a.href=s.url;a.target='_blank';a.rel='noopener';}if(explore){const b=add(card,'button','btn secondary',t('Vaata kataloogis','View in catalog'));b.type='button';b.addEventListener('click',()=>explore(x.scientific));}}
 const method=add(target,'details','garden-sources');add(method,'summary','',t('Kuidas KITA kombinatsiooni valib?','How does KITA choose the combination?'));add(method,'p','muted',t('Eelistab võimalike lünkade, algse aia ja ebakindlate kuude unikaalset katvust, seejärel fookusrühma kuid, uusi põhirühmi, rühma-kuu seoseid ja röövikute toidutaime lisandumist. Viigi korral eelistab vähem teadmata kasvukohavasteid ja päritolusid ning vähem liike. See on KITA planeerimisreegel, mitte teaduslik elurikkuseskoor.','Prioritises unique possible-gap, starter and uncertain month coverage, then focus months, new main groups, group-month associations and larval host addition. Ties favour fewer unknown site matches and origins, then fewer species. This is a KITA planning rule, not a scientific biodiversity score.'));add(method,'p','muted',t('Kontrollitud kombinatsioone: ','Combinations checked: ')+plan.evaluated+'. '+t('Kavand ei muuda sinu olemasolevate taimede nimekirja.','The plan does not modify your existing plant inventory.'));
}
function bind(){for(const id of ['communityMax','communityUnknown'])$(id)?.addEventListener('change',()=>{if(latest)render(latest,explore);});}
root.KITACommunityUI=Object.freeze({render,bind});
})(window);
