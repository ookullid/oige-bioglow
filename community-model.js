/* KITA community planner v1.0 – optimisation of evidence coverage, not ecological effectiveness. */
(function(root){
'use strict';
const months=[3,4,5,6,7,8,9,10],groups=['bumblebee','solitary_bee','hoverfly','butterfly'];
const bit=m=>months.includes(m)?1<<(m-3):0;
const mask=arr=>(arr||[]).reduce((a,m)=>a|bit(m),0);
function pop(n){n>>>=0;let count=0;while(n){n=(n&(n-1))>>>0;count++;}return count;}
const monthList=n=>months.filter(m=>n&bit(m));
const pairMask=arr=>(arr||[]).reduce((a,x)=>{const i=groups.indexOf(x.group);return i<0?a:(a|(bit(x.month)<<(8*i)))>>>0;},0);
const empty=()=>({gap:0,uncertain:0,starter:0,focus:0,pairs:0,groups:0,host:0,unknownSite:0,unknownNative:0});
function contribution(x){return {gap:mask(x.gapMonths),uncertain:mask(x.uncertainMonths),starter:mask(x.starterMonths),focus:mask(x.focusMonths),pairs:pairMask(x.groupMonths),groups:(x.newGroups||[]).reduce((a,g)=>groups.includes(g)?a|(1<<groups.indexOf(g)):a,0),host:x.newHost?1:0,unknownSite:x.fit.status==='unknown'?1:0,unknownNative:x.native==='documented'?0:1};}
function union(a,b){return {gap:a.gap|b.gap,uncertain:a.uncertain|b.uncertain,starter:a.starter|b.starter,focus:a.focus|b.focus,pairs:(a.pairs|b.pairs)>>>0,groups:a.groups|b.groups,host:a.host|b.host,unknownSite:a.unknownSite+b.unknownSite,unknownNative:a.unknownNative+b.unknownNative};}
function score(s,count){return [pop(s.gap),pop(s.starter),pop(s.uncertain),pop(s.focus),pop(s.groups),pop(s.pairs),s.host,-s.unknownSite,-s.unknownNative,-count];}
function compare(a,b){for(let i=0;i<a.length;i++){if(a[i]!==b[i])return a[i]-b[i];}return 0;}
function plan(result,options={}){
 const max=Number.isInteger(options.max)?Math.max(1,Math.min(8,options.max)):5;
 const budget=Number.isInteger(options.budget)?Math.max(1,Math.min(250000,options.budget)):150000;
 if(!result?.available||!result.garden)return {available:false,plants:[],max};
 const strict=options.includeUnknown!==true;
 const all=result.allCandidates||result.candidates||[];
 const seen=new Set(), candidates=[];
 for(const x of all){if(!x?.scientific||!x.fit||x.fit.status==='mismatch'||(strict&&x.fit.status==='unknown')||seen.has(x.scientific))continue;seen.add(x.scientific);candidates.push({plant:x,delta:contribution(x)});}
 candidates.sort((a,b)=>a.plant.scientific.localeCompare(b.plant.scientific));
 let best=[],bestState=empty(),bestScore=score(bestState,0),evaluated=0,truncated=false;
 function consider(ids,state){const s=score(state,ids.length);if(compare(s,bestScore)>0){best=ids.slice();bestState=state;bestScore=s;}}
 // Greedy seed guarantees a usable result even if the bounded exhaustive search stops.
 let greedy=[],current=empty();
 while(greedy.length<max){let pick=-1,next=null,top=score(current,greedy.length);for(let i=0;i<candidates.length;i++){if(greedy.includes(i))continue;const trial=union(current,candidates[i].delta),s=score(trial,greedy.length+1);if(compare(s,top)>0){pick=i;next=trial;top=s;}}if(pick<0)break;greedy.push(pick);current=next;consider(greedy,current);}
 function visit(start,ids,state){
  if(ids.length>=max||truncated)return;
  for(let i=start;i<candidates.length;i++){
   if(evaluated>=budget){truncated=true;return;}
   const next=union(state,candidates[i].delta);ids.push(i);evaluated++;consider(ids,next);visit(i+1,ids,next);ids.pop();if(truncated)return;
  }
 }
 visit(0,[],empty());
 const plants=best.map(i=>candidates[i].plant);
 const added=bestState.gap|bestState.uncertain|bestState.starter;
 const before=result.garden.season.map(m=>({month:m.month,status:m.status}));
 const after=before.map(m=>({month:m.month,status:m.status==='documented'?'documented':added&bit(m.month)?'projected':m.status}));
 const pairList=groups.flatMap((group,i)=>months.filter(m=>bestState.pairs&(bit(m)<<(8*i))).map(month=>({group,month})));
 const groupRows=groups.map(group=>({group,before:months.filter(m=>result.garden.groupRows.find(x=>x.group===group)?.months.includes(m)),added:pairList.filter(x=>x.group===group).map(x=>x.month)}));
 return {available:true,max,candidateCount:candidates.length,excludedUnknown:all.filter(x=>x.fit?.status==='unknown').length-(strict?0:all.filter(x=>x.fit?.status==='unknown').length),plants,before,after,addedMonths:monthList(added),gapMonths:monthList(bestState.gap),uncertainMonths:monthList(bestState.uncertain),starterMonths:monthList(bestState.starter),newGroups:groups.filter((_,i)=>bestState.groups&(1<<i)),groupRows,newPairs:pairList,focusMonths:monthList(bestState.focus),newHost:!!bestState.host,unknownSite:bestState.unknownSite,unknownNative:bestState.unknownNative,evaluated,exhaustive:!truncated,legalComplete:false};
}
root.KITACommunityPlanner=Object.freeze({plan});
})(typeof window!=='undefined'?window:globalThis);
