/* KITA garden evidence model, v1.0. No biodiversity score or planting recommendation. */
(function(root){
'use strict';
const months=Object.freeze(Array.from({length:12},(_,i)=>i+1));
const groups=Object.freeze(['bumblebee','solitary_bee','hoverfly','butterfly','specialist_bee']);
const norm=x=>String(x||'').trim().toLowerCase().replace(/\s+/g,' ');
function analyse(names,db,resolve){
 const entries=[], seen=new Set();
 for(const input of Array.isArray(names)?names:[]){
  const name=String(input||'').trim();if(!name)continue;
  const scientific=resolve?.(name)||name;
  const record=db?.find(name)||db?.find(scientific)||null;
  const warning=db?.restriction(name)||db?.restriction(record?.scientific||scientific)||null;
  const key=norm(record?.scientific||scientific);
  if(seen.has(key))continue;seen.add(key);
  const e=record?.ecology||{};
  // European maximum ranges are deliberately never substituted for local months.
  const bloom=Array.isArray(e.floweringMonths)&&e.floweringMonths.length&&record?.evidence?.floweringMonths?.length?[...new Set(e.floweringMonths.filter(m=>Number.isInteger(m)&&m>=1&&m<=12))].sort((a,b)=>a-b):[];
  const visitors=groups.filter(g=>e.flowerVisitors?.includes(g)&&(record?.flowerVisitorEvidence?.[g]?.length||record?.evidence?.flowerVisitors?.length));
  const sourcesFor=g=>record?.flowerVisitorEvidence?.[g]||record?.evidence?.flowerVisitors||[];
  entries.push({name:record?.nameEt||name,scientific:record?.scientific||null,key,record,warning,bloom,visitors,
   host:e.butterflyLarvalHost===true&&!!record?.evidence?.butterflyLarvalHost?.length,
   wind:e.pollinationMode==='wind',sourcesFor});
 }
 const eligible=entries.filter(x=>!x.warning);
 const unknownBloom=eligible.filter(x=>!x.bloom.length);
 const unknownVisitors=eligible.filter(x=>!x.visitors.length);
 const monthRows=months.map(month=>{
  const flowering=eligible.filter(x=>x.bloom.includes(month));
  const associated=flowering.filter(x=>x.visitors.length);
  const uncertain=eligible.filter(x=>!x.bloom.length||(x.bloom.includes(month)&&!x.visitors.length));
  return {month,flowering,associated,uncertain,status:!eligible.length?'empty':associated.length?'documented':uncertain.length?'uncertain':'no_documented'};
 });
 const groupRows=groups.map(group=>{
  const plants=eligible.filter(x=>x.visitors.includes(group));
  const seasonal=plants.filter(x=>x.bloom.length);
  // A species-level association plus a flowering month is not an observed visit in that month.
  return {group,plants,months:months.filter(m=>seasonal.some(x=>x.bloom.includes(m))),unknownSeason:plants.filter(x=>!x.bloom.length),status:!eligible.length?'empty':plants.length?'documented':'no_documented'};
 });
 const season=monthRows.filter(m=>m.month>=3&&m.month<=10);
 return {entries,eligible,unknownBloom,unknownVisitors,monthRows,groupRows,season,hosts:eligible.filter(x=>x.host),warnings:entries.filter(x=>x.warning),coverage:{total:entries.length,eligible:eligible.length,bloom:eligible.length-unknownBloom.length,visitors:eligible.length-unknownVisitors.length,hosts:eligible.filter(x=>x.host).length},gapMonths:season.filter(x=>x.status==='no_documented'),uncertainMonths:season.filter(x=>x.status==='uncertain')};
}
root.KITAGardenModel=Object.freeze({analyse,months,groups});
})(typeof window!=='undefined'?window:globalThis);
