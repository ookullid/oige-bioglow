/* KITA recommendation candidate model v1.0. Evidence-based comparison, not validated planting advice. */
(function(root){
'use strict';
const season=[3,4,5,6,7,8,9,10];
const mainGroups=['bumblebee','solitary_bee','hoverfly','butterfly'];
const groups=[...mainGroups,'specialist_bee'];
const criteria={light:['sun','part','shade'],moisture:['dry_tolerant','moderate','moist_preferred'],nutrients:['poor','rich']};
const norm=x=>String(x||'').trim().toLowerCase().replace(/\s+/g,' ');
function settings(input={}){
 const result={};for(const [key,allowed] of Object.entries(criteria))result[key]=allowed.includes(input[key])?input[key]:'';
 result.focus=groups.includes(input.focus)?input.focus:'';
 result.nativeOnly=input.nativeOnly===true;return result;
}
function compareSite(r,input){
 const checks=[];for(const key of Object.keys(criteria)){
  const wanted=input[key];if(!wanted)continue;
  const values=r.ecology?.[key], sources=r.evidence?.[key]||[];
  const valid=Array.isArray(values)&&values.length>0&&sources.length>0;
  checks.push({key,wanted,values:valid?values:[],sources:valid?sources:[],status:!valid?'unknown':values.includes(wanted)?'match':'mismatch'});
 }
 return {checks,status:checks.some(x=>x.status==='mismatch')?'mismatch':!checks.length?'unspecified':checks.some(x=>x.status==='unknown')?'unknown':'match'};
}
function legacyBlock(r,lists={}){
 const names=[r.scientific,...(r.aliases||[])].map(norm);
 const matches=items=>(items||[]).some(v=>{const key=norm(v);return !!key&&names.some(n=>n===key||n.startsWith(key+' '));});
 if(matches(lists.invasive))return 'legacy_invasive';
 if(matches(lists.protected))return 'legacy_protected';
 return null;
}
function rank({names=[],db,resolve,site={},legacy={},limit=8}={}){
 const input=settings(site);
 if(!db?.data?.records||!root.KITAGardenModel)return {input,candidates:[],excluded:{},available:false};
 const garden=root.KITAGardenModel.analyse(names,db,resolve);
 const seen=new Set(garden.entries.map(x=>norm(x.scientific||x.key)));
 const targets=garden.season.filter(m=>m.status!=='documented');
 const excluded={existing:0,warning:0,protected:0,native:0,missingEvidence:0,siteMismatch:0,focus:0};
 const candidates=[];
 for(const r of db.data.records){
  const e=r.ecology||{};
  if(seen.has(norm(r.scientific))){excluded.existing++;continue;}
  if([r.scientific,r.nameEt,...(r.aliases||[])].some(n=>db.restriction(n))){excluded.warning++;continue;}
  const block=legacyBlock(r,legacy);
  if(block){excluded[block==='legacy_protected'?'protected':'warning']++;continue;}
  const native=r.nativeEstonia===true&&r.nativeEvidence?.length?'documented':r.nativeEstonia===false&&r.nativeEvidence?.length?'non_native':'unknown';
  if(native==='non_native'||(input.nativeOnly&&native!=='documented')){excluded.native++;continue;}
  const bloom=Array.isArray(e.floweringMonths)&&r.evidence?.floweringMonths?.length?[...new Set(e.floweringMonths.filter(m=>season.includes(m)))].sort((a,b)=>a-b):[];
  const visitors=groups.filter(g=>e.flowerVisitors?.includes(g)&&(r.flowerVisitorEvidence?.[g]?.length||r.evidence?.flowerVisitors?.length));
  const visitorsMain=visitors.filter(g=>mainGroups.includes(g));
  if(!bloom.length||!visitorsMain.length){excluded.missingEvidence++;continue;}
  if(input.focus&&!visitors.includes(input.focus)){excluded.focus++;continue;}
  const fit=compareSite(r,input);if(fit.status==='mismatch'){excluded.siteMismatch++;continue;}
  const gapMonths=targets.filter(m=>m.status==='no_documented'&&bloom.includes(m.month)).map(m=>m.month);
  const uncertainMonths=targets.filter(m=>m.status==='uncertain'&&bloom.includes(m.month)).map(m=>m.month);
  const starterMonths=targets.filter(m=>m.status==='empty'&&bloom.includes(m.month)).map(m=>m.month);
  const newGroups=visitorsMain.filter(g=>!garden.groupRows.find(x=>x.group===g)?.plants.length);
  const groupMonths=visitorsMain.flatMap(g=>bloom.filter(m=>!garden.groupRows.find(x=>x.group===g)?.months.includes(m)).map(month=>({group:g,month})));
  const focusMonths=input.focus?bloom.filter(m=>!garden.groupRows.find(x=>x.group===input.focus)?.months.includes(m)):[];
  const host=e.butterflyLarvalHost===true&&!!r.evidence?.butterflyLarvalHost?.length;
  const newHost=host&&!garden.hosts.length;
  const evidence=[...(r.evidence?.floweringMonths||[]),...visitors.flatMap(g=>r.flowerVisitorEvidence?.[g]||r.evidence?.flowerVisitors||[]),...fit.checks.flatMap(x=>x.sources),...(native==='documented'?r.nativeEvidence:[]),...(host?r.evidence?.butterflyLarvalHost||[]:[])];
  const sourceMap=new Map();for(const s of evidence)if(s.url)sourceMap.set(s.url,s.publisher||s.url);
  candidates.push({scientific:r.scientific,name:r.nameEt||r.scientific,native,legalReview:r.legalReview||'unknown',fit,bloom,visitors,host,newHost,gapMonths,uncertainMonths,starterMonths,newGroups,groupMonths,focusMonths,growthForm:e.growthForm||null,height:e.height||null,sources:[...sourceMap].map(([url,publisher])=>({url,publisher})),incremental:gapMonths.length+uncertainMonths.length+starterMonths.length+groupMonths.length+(newHost?1:0)>0});
 }
 // Lexicographic evidence counts, not a weighted biodiversity score.
 const tier=x=>x.fit.status==='unknown'?1:0;
 const order=(a,b)=>tier(a)-tier(b)||b.gapMonths.length-a.gapMonths.length||b.starterMonths.length-a.starterMonths.length||b.uncertainMonths.length-a.uncertainMonths.length||b.focusMonths.length-a.focusMonths.length||b.newGroups.length-a.newGroups.length||Number(b.native==='documented')-Number(a.native==='documented')||b.groupMonths.length-a.groupMonths.length||Number(b.newHost)-Number(a.newHost)||a.scientific.localeCompare(b.scientific);
 candidates.sort(order);
 const count=Number.isInteger(limit)?Math.max(1,Math.min(1000,limit)):8;
 return {available:true,input,garden,excluded,total:candidates.length,candidates:candidates.slice(0,count),allCandidates:candidates,uncoveredTargets:targets.map(x=>({month:x.month,status:x.status})),legalComplete:false};
}
root.KITARecommendations=Object.freeze({rank,settings,compareSite,legacyBlock});
})(typeof window!=='undefined'?window:globalThis);
