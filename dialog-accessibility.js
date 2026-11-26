/* Keyboard focus management for KITA dialogs; no network or data access. */
(()=>{'use strict';
let active=null,previous=null;
const selector='button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex]:not([tabindex="-1"])';
const visible=n=>!n.hidden&&!n.closest('[hidden],.hidden')&&n.getClientRects().length>0;
const items=n=>[...n.querySelectorAll(selector)].filter(visible);
function sync(){
 const list=[...document.querySelectorAll('[role="dialog"][aria-modal="true"]')].filter(visible),next=list.at(-1)||null;
 if(next===active)return;
 if(next){if(!active)previous=document.activeElement;active=next;if(!active.contains(document.activeElement)){const first=items(active)[0]||active;if(first===active)active.tabIndex=-1;first.focus();}}
 else{active=null;if(previous?.isConnected&&visible(previous))previous.focus();previous=null;}
}
function init(){const observer=new MutationObserver(sync);observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','hidden']});document.addEventListener('keydown',e=>{if(e.key!=='Tab'||!active)return;const list=items(active);if(!list.length){e.preventDefault();active.focus();return;}const first=list[0],last=list.at(-1);if(e.shiftKey&&(document.activeElement===first||!active.contains(document.activeElement))){e.preventDefault();last.focus();}else if(!e.shiftKey&&(document.activeElement===last||!active.contains(document.activeElement))){e.preventDefault();first.focus();}});sync();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
