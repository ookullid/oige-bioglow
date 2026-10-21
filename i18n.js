(() => {
  'use strict';

  const dict = {
    et: {
      'address.label':'Aadress Eestis','address.placeholder':'Näiteks Mustamäe tee 51, Tallinn','address.search':'Otsi',
      'address.short':'Sisesta vähemalt 3 märki.','address.loading':'Otsin aadressi…','address.empty':'Aadressi ei leitud. Lisa linn või vald või vali koht kaardilt.',
      'address.results':'Vali allpool õige aadress.','address.selected':'Aadress valitud. Täpsusta istutuskoht kaardil, näiteks aias või peenras.',
      'address.error':'Aadressiotsing ei vasta. Proovi uuesti või vali koht kaardilt.',
      'nav.results':'Tulemused','nav.analyze':'Analüüsi','nav.account':'Konto','nav.demo':'Demo','nav.lab':'KITA Lab',
      'hero.title':'Kas see taim sobib siia?','hero.subtitle':'Vali taim ja kirjelda kasvukohta. KITA näitab kohalikke vaatlusi ja keskkonnaandmeid ning selgitab, mida need ei tõesta.','hero.start':'Alusta analüüsi →','hero.how':'Kuidas see töötab?',
      'site.title':'Kirjelda istutuskohta (valikuline)','site.help':'Need vastused aitavad kohta kirjeldada. Prototüüp ei võrdle neid veel automaatselt iga liigi vajadustega.','site.light':'Kui palju saab koht päikest?','site.moisture':'Milline on tavaliselt mullaniiskus?','site.soil':'Kas tead mulla tüüpi?','site.wind':'Kas koht on tuultele avatud?','site.unknown':'Ei tea','site.sun':'Päikeseline','site.part':'Poolvarjuline','site.shade':'Varjuline','site.dry':'Kuiv','site.moderate':'Parasniiske','site.wet':'Niiske või märg','site.sandy':'Liivane','site.clay':'Savine','site.peat':'Turba- või turbane','site.garden':'Aiamuld / muu','site.sheltered':'Tuule eest varjatud','site.exposed':'Avatud tuultele',
      'plant.title':'Vali taim','plant.help':'Kirjuta lihtne nimi, näiteks kadakas, tamm, kask või nurmenukk.','plant.placeholder':'Otsi taime…',
      'place.title':'Vali koht','place.help':'Otsi aadressi, klõpsa kaardil, kasuta seadme asukohta või lisa GPS-andmetega JPG/JPEG foto.','place.device':'◎ Kasuta minu asukohta','place.map':'⌖ Vali kaardilt','place.analyze':'Analüüsi sobivust →',
      'result.title':'KITA esialgne hinnang','result.reset':'↻ Uus analüüs','how.title':'Neli lihtsat sammu',
      'lab.title':'KITA Lab','lab.heatmap':'Vaatluskaart','lab.whatif':'Mis siis kui…?','lab.quality':'Andmekvaliteet','lab.expert':'Kinnitatud ekspertarvamused','lab.diagnostics':'Diagnostika','lab.stats':'Statistika','lab.settings':'Seaded',
      'lab.demo':'Näita demo','lab.close':'Sulge','lab.run':'Arvuta','lab.refresh':'Värskenda','lab.install':'Paigalda äpp','lab.privacy':'Privaatsusrežiim','lab.contrast':'Kõrge kontrast','lab.text':'Suurem tekst',
      'lab.heatmap.note':'Prototüübi sobivuskiht põhineb valitud liigi avalike GBIF-vaatluste tihedusel. See ei ole kasvugarantii.','lab.whatif.note':'Muuda tingimusi ja vaata, kuidas KITA prototüübi hinnang võiks liikuda.','lab.quality.note':'Iga andmekihi juures on eraldi kvaliteedi- ja värskuse hinnang.','lab.expert.note':'Kinnitatud ekspertarvamused kuvatakse eraldi. Siin salvestatud päringut ei saadeta automaatselt eksperdile ega meeskonnale.','lab.stats.note':'Kuvatakse ainult koondarvud, mitte kasutajate isikuandmeid ega täpseid asukohti.',
      'a11y.skip':'Liigu põhisisu juurde'
    },
    en: {
      'address.label':'Address in Estonia','address.placeholder':'For example Mustamäe tee 51, Tallinn','address.search':'Search',
      'address.short':'Enter at least 3 characters.','address.loading':'Searching for an address…','address.empty':'No address found. Add a town or municipality, or choose a location on the map.',
      'address.results':'Choose the correct address below.','address.selected':'Address selected. Refine the planting location on the map, for example in your garden.',
      'address.error':'Address search is unavailable. Try again or choose a location on the map.',
      'nav.results':'Results','nav.analyze':'Analyze','nav.account':'Account','nav.demo':'Demo','nav.lab':'KITA Lab',
      'hero.title':'Will this plant suit this place?','hero.subtitle':'Choose a plant and describe its spot. KITA shows local observations and environmental data, and explains what they cannot prove.','hero.start':'Start analysis →','hero.how':'How does it work?',
      'site.title':'Describe the planting spot (optional)','site.help':'These answers describe the spot. The prototype does not yet compare them automatically with each species’ needs.','site.light':'How much sun does the spot get?','site.moisture':'What is the usual soil moisture?','site.soil':'Do you know the soil type?','site.wind':'Is the spot exposed to wind?','site.unknown':'Not sure','site.sun':'Sunny','site.part':'Part shade','site.shade':'Shady','site.dry':'Dry','site.moderate':'Moderately moist','site.wet':'Moist or wet','site.sandy':'Sandy','site.clay':'Clay','site.peat':'Peat or peaty','site.garden':'Garden soil / other','site.sheltered':'Sheltered from wind','site.exposed':'Wind-exposed',
      'plant.title':'Choose a plant','plant.help':'Type a simple plant name, for example juniper, oak, birch or cowslip.','plant.placeholder':'Search for a plant…',
      'place.title':'Choose a place','place.help':'Search for an address, click the map, use your device location or add a JPG/JPEG photo with GPS metadata.','place.device':'◎ Use my location','place.map':'⌖ Choose on map','place.analyze':'Analyze suitability →',
      'result.title':'KITA preliminary assessment','result.reset':'↻ New analysis','how.title':'Four simple steps',
      'lab.title':'KITA Lab','lab.heatmap':'Observation map','lab.whatif':'What if…?','lab.quality':'Data quality','lab.expert':'Confirmed expert opinions','lab.diagnostics':'Diagnostics','lab.stats':'Statistics','lab.settings':'Settings',
      'lab.demo':'Show demo','lab.close':'Close','lab.run':'Calculate','lab.refresh':'Refresh','lab.install':'Install app','lab.privacy':'Privacy mode','lab.contrast':'High contrast','lab.text':'Larger text',
      'lab.heatmap.note':'The prototype suitability layer is based on the density of public GBIF observations for the selected species. It is not a growth guarantee.','lab.whatif.note':'Change conditions and see how the KITA prototype assessment might move.','lab.quality.note':'Each data layer gets its own quality and freshness estimate.','lab.expert.note':'Confirmed expert opinions are shown separately. A request saved here is not sent automatically to an expert or team.','lab.stats.note':'Only aggregate counts are shown, never personal user data or precise locations.','a11y.skip':'Skip to main content'
    }
  };

  let lang = localStorage.getItem('bioglow_lang') === 'en' ? 'en' : 'et';
  const t = key => dict[lang]?.[key] || dict.et[key] || key;

  const staticBindings = [
    ['[data-scroll="results"]','nav.results'],['[data-scroll="analyze"].compact','nav.analyze'],
    ['.hero-copy h1','hero.title'],['.hero-copy > p','hero.subtitle'],['.hero-actions [data-scroll="analyze"]','hero.start'],['.hero-actions [data-scroll="how"]','hero.how'],
    ['.controls-panel .panel-head:nth-of-type(1) h2','plant.title'],['#plantInput','plant.placeholder','placeholder'],
    ['#useLocation','place.device'],['#pickMap','place.map'],['#analyzeBtn','place.analyze'],
    ['#results .results-head h2','result.title'],['#resetBtn','result.reset'],['#how .how-intro h2','how.title']
  ];

  function apply(root=document){
    root.documentElement && (root.documentElement.lang = lang);
    if(document.documentElement) document.documentElement.lang = lang;
    staticBindings.forEach(([selector,key,kind]) => {
      const node = document.querySelector(selector);
      if(!node) return;
      if(kind === 'placeholder') node.setAttribute('placeholder', t(key));
      else node.textContent = t(key);
    });
    root.querySelectorAll?.('[data-i18n]').forEach(node => { node.textContent = t(node.dataset.i18n); });
    root.querySelectorAll?.('[data-i18n-placeholder]').forEach(node => { node.setAttribute('placeholder',t(node.dataset.i18nPlaceholder)); });
    const toggle=document.getElementById('languageToggle');
    if(toggle){ toggle.textContent = lang === 'et' ? 'EN' : 'ET'; toggle.setAttribute('aria-label',lang === 'et' ? 'Switch to English' : 'Lülita eesti keelele'); }
  }

  function setLang(next){
    lang = next === 'en' ? 'en' : 'et';
    localStorage.setItem('bioglow_lang',lang);
    apply(document);
    document.dispatchEvent(new CustomEvent('bioglow:language',{detail:{lang}}));
  }

  function buildToggle(){
    if(document.getElementById('languageToggle')) return;
    const nav=document.querySelector('.nav-actions'); if(!nav) return;
    const button=document.createElement('button');
    button.id='languageToggle'; button.type='button'; button.className='btn ghost compact language-toggle';
    button.addEventListener('click',()=>setLang(lang === 'et' ? 'en' : 'et'));
    nav.insertBefore(button,nav.firstChild);
    apply(document);
  }

  window.KITAI18n={t,apply,setLang,getLang:()=>lang};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',buildToggle); else buildToggle();
})();
