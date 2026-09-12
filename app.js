const CN={spec:'Speciality Chemicals',ind:'Industrial Chemicals',con:'Construction Chemicals',hc:'Healthcare Chemicals',cln:'Cleaning Chemicals',og:'Oil & Gas Chemicals',mar:'Marine Chemicals'};
const P=[
{n:'Sodium Metabisulphite',g:'Technical 97%',c:'spec',d:'Dechlorination, preservation and reduction processes.',s:['97%','Powder','25kg']},
{n:'Sodium Bicarbonate',g:'Food/Feed 99.5%',c:'spec',d:'Baking, feed, flue-gas treatment and pH buffering.',s:['99.5%','Powder','25kg']},
{n:'Sodium Benzoate',g:'Food E211',c:'spec',d:'Preservative for beverages and food processing.',s:['99%','Powder','25kg']},
{n:'Glycerine 99.5%',g:'USP/BP',c:'spec',d:'Humectant for pharma, cosmetics and personal care.',s:['99.5% USP','Liquid','250kg']},
{n:'EDTA 2Na / 4Na',g:'Technical 99%',c:'spec',d:'Chelating agent for cleaning, water and industry.',s:['99%','Powder','25kg']},
{n:'Zinc Sulphate 33%',g:'Agri/Tech',c:'spec',d:'Zinc correction and micronutrient blending.',s:['Zn 33%','Powder','25kg']},
{n:'Magnesium Sulphate',g:'Tech/Agri',c:'spec',d:'Epsom salt for crops and process industries.',s:['MgSO4','Crystal','25kg']},
{n:'Caustic Soda Flakes',g:'Industrial 99%',c:'ind',d:'Sodium hydroxide for soap, textiles, paper, alumina.',s:['NaOH 99%','Flakes','25/50kg']},
{n:'Caustic Soda Pearls',g:'Industrial 99%',c:'ind',d:'Low-dust pearls for detergents and dosing.',s:['NaOH 99%','Pearls','25kg']},
{n:'Soda Ash Dense',g:'99.2%',c:'ind',d:'Glass, detergent and metallurgical workhorse.',s:['Na2CO3 99.2%','Powder','50kg/1MT']},
{n:'Soda Ash Light',g:'99.2%',c:'ind',d:'Fine grade for chemicals and detergents.',s:['Na2CO3 99.2%','Fine','40kg']},
{n:'Hydrated Lime',g:'Technical',c:'ind',d:'Neutralization, effluent treatment and construction.',s:['Ca(OH)2 90%','Powder','50kg']},
{n:'Urea N46 Prilled',g:'Agri/Industrial',c:'ind',d:'High-nitrogen fertilizer and industrial resin use.',s:['N 46%','Prills','50kg/1MT']},
{n:'DAP 18-46-0',g:'Agri Grade',c:'ind',d:'Basal N+P nutrition for crops.',s:['18-46-0','Granular','50kg']},
{n:'MOP K60',g:'Potash',c:'ind',d:'Potassium for fruit, starch and plantation crops.',s:['K2O 60%','Granular','50kg']},
{n:'Hydrochloric Acid',g:'30-33%',c:'ind',d:'Pickling, descaling and acidizing applications.',s:['30-33%','Liquid','IBC']},
{n:'Sulphuric Acid 98%',g:'Technical',c:'ind',d:'Fertilizer, synthesis and metal processing.',s:['98%','Liquid','IBC']},
{n:'Nitric Acid 68%',g:'Technical',c:'ind',d:'Etching, intermediates and fertilizer grades.',s:['68%','Liquid','Carboys']},
{n:'Phosphoric Acid 85%',g:'Food/Tech',c:'ind',d:'Beverage acidulant and fertilizer salts.',s:['85%','Liquid','IBC']},
{n:'Methanol 99.85%',g:'Technical',c:'ind',d:'Formaldehyde, biodiesel and solvent uses.',s:['99.85%','Liquid','200L']},
{n:'Acetone',g:'Technical 99.5%',c:'ind',d:'Fast solvent for resins, inks and cleaning.',s:['99.5%','Liquid','Drums']},
{n:'Formaldehyde 37%',g:'Industrial',c:'ind',d:'Resin and plywood intermediate.',s:['37%','Liquid','Drums']},
{n:'PAC 30%',g:'Coagulant',c:'ind',d:'Coagulant for turbidity removal in water plants.',s:['Al2O3 30%','Powder','25kg']},
{n:'Aluminium Sulphate',g:'17% Non-Ferric',c:'ind',d:'Clarification for municipal water plants.',s:['17%','Powder','50kg']},
{n:'PCE Superplasticizer',g:'High Range',c:'con',d:'Polycarboxylate admixture for high-flow concrete.',s:['Liquid 40%','200L','RMC Grade']},
{n:'SNF Powder',g:'Conplast Grade',c:'con',d:'Sulphonated naphthalene water reducer.',s:[' Powder','25kg','Construction']},
{n:'Concrete Curing Compound',g:'Wax Emulsion',c:'con',d:'Moisture retention film for fresh concrete.',s:['30% solids','200L','Spray-on']},
{n:'Integral Waterproofing',g:'Admixture',c:'con',d:'Water-resistant concrete and plaster admixture.',s:['Liquid','200L','IS 2645']},
{n:'Tile Adhesive',g:'C2TE Grade',c:'con',d:'Cement-based adhesive for tile and stone.',s:['EN 12004','25kg','Grey/White']},
{n:'Epoxy Grout',g:'High Strength',c:'con',d:'Chemical-resistant grout for joints and fixings.',s:['3-part','Kit','Industrial']},
{n:'Floor Hardener',g:'Metallic/NM',c:'con',d:'Abrasion-resistant topping for industrial floors.',s:['Dry shake','25kg','Warehouse']},
{n:'Mould Release Oil',g:'Premium',c:'con',d:'Release agent for precast and formwork.',s:['Emulsion','200L','Construction']},{n:'IPA 99.9%',g:'Pharma/USP',c:'hc',d:'High-purity isopropyl alcohol for sterile cleaning.',s:['99.9%','Liquid','200L']},
{n:'Glycerine USP',g:'Pharma',c:'hc',d:'Pharmacopeia-grade humectant for formulations.',s:['99.5% USP','Liquid','250kg']},
{n:'BKC 80%',g:'Disinfectant',c:'hc',d:'Quaternary ammonium disinfectant for hospitals.',s:['BKC 80%','Liquid','200kg']},
{n:'Hydrogen Peroxide',g:'35/50%',c:'hc',d:'Oxidizing disinfectant for sterile environments.',s:['35/50%','Liquid','Carboys']},
{n:'Chloroxylenol PCMX',g:'Antiseptic',c:'hc',d:'Active for antiseptic liquids and handwash.',s:['PCMX 99%','Powder','25kg']},
{n:'Potassium Permanganate',g:'Technical',c:'hc',d:'Oxidizer for water treatment and antiseptic use.',s:['99%','Crystal','25kg/50kg']},
{n:'Surgical Spirit BP',g:'IP/BP',c:'hc',d:'Rubbing alcohol for clinical application.',s:['BP Grade','Liquid','5/50L']},
{n:'LABSA 96%',g:'Detergent Grade',c:'cln',d:'Anionic surfactant backbone for detergents.',s:['96% active','Liquid','210kg drums']},
{n:'SLES 70%',g:'Detergent Grade',c:'cln',d:'Foaming surfactant for shampoos and cleaners.',s:['70% active','Paste','170kg drums']},
{n:'SLS Powder',g:'92% active',c:'cln',d:'Foaming agent for toothpaste and powders.',s:['92% active','Powder','25kg']},
{n:'CAPB 30%',g:'Cosmetic Grade',c:'cln',d:'Mild amphoteric for shampoos and handwash.',s:['30% active','Liquid','200kg']},
{n:'BKC 50%',g:'Disinfectant',c:'cln',d:'Quaternary disinfectant for floors and surfaces.',s:['BKC 50%','Liquid','200kg']},
{n:'HD Degreaser Conc.',g:'Industrial',c:'cln',d:'Alkaline degreaser for auto and engineering.',s:['Concentrate','Liquid','50/200L']},
{n:'Floor Cleaner Conc.',g:'Institutional',c:'cln',d:'Pine/lemon daily mopping concentrate.',s:['Concentrate','Liquid','5/50L']},
{n:'Toilet Cleaner',g:'Acidic 10%',c:'cln',d:'Thickened acid cleaner for scale and stains.',s:['10% acid','Liquid','5L/50L']},
{n:'Phenolic Disinfectant',g:'Hospital Grade',c:'cln',d:'Black/white phenyl for wards and drains.',s:['Pine/black','Liquid','5/50L']},
{n:'Barite API',g:'Drilling Grade',c:'og',d:'Weighting agent for drilling muds.',s:['SG 4.2','Powder','50kg/1MT']},
{n:'Calcium Chloride',g:'74-94%',c:'og',d:'Brine, dust control and drilling fluid additive.',s:['74/94%','Prills','25/50kg']},
{n:'Xanthan Gum',g:'Drilling Grade',c:'og',d:'Viscosifier for oilfield drilling fluids.',s:['80 mesh','25kg','API 13A']},
{n:'Potassium Chloride',g:'Drilling/Agri',c:'og',d:'KCl for shale inhibition and clear brines.',s:['KCl 95%','Granular','50kg']},
{n:'Soda Ash Drilling',g:'API Grade',c:'og',d:'pH control and calcium removal in muds.',s:['Na2CO3 99.2%','Powder','50kg']},
{n:'Defoamer',g:'Silicone/Oil',c:'og',d:'Foam control for mud systems and process.',s:['Emulsion','50/200L','Industrial']},
{n:'Corrosion Inhibitor',g:'Oilfield',c:'og',d:'Protection for pipelines and downhole tools.',s:['Film forming','200L','Oil soluble']},
{n:'CMC / PAC-LV',g:'Fluid Loss',c:'og',d:'Filtration control for water-based muds.',s:['LV grade','25kg','API']},{n:'Tank Cleaner',g:'Marine',c:'mar',d:'Cargo tank cleaning for chemical and product tankers.',s:['Emulsifying','200L','IMO friendly']},
{n:'Cargo Hold Cleaner',g:'Bulk Carriers',c:'mar',d:'Hold cleaning for coal, cement and grain trades.',s:['Alkaline','200L','Low foam']},
{n:'Marine Descaler',g:'Inhibited',c:'mar',d:'Scale removal from coolers, condensers and pipes.',s:['Inhibited acid','20/200L','Safe on metals']},
{n:'DEHA Oxygen Scavenger',g:'Boiler',c:'mar',d:'Oxygen scavenger for marine boiler feed water.',s:['DEHA based','25/200L','Volatile']},
{n:'Boiler Water Treatment',g:'Combo',c:'mar',d:'Phosphate-polymer programme for aux boilers.',s:['Alkaline','25kg','SS safe']},
{n:'Marine Deck Cleaner',g:'All Purpose',c:'mar',d:'Deck, bulkhead and superstructure cleaning.',s:['Concentrate','5/200L','Biodegradable']},
{n:'Calcium Hypochlorite 65%',g:'Granular',c:'mar',d:'Disinfection for ballast, potable and hatch areas.',s:['65% Cl2','Granular','45kg']},
{n:'Sodium Hypochlorite',g:'12-15%',c:'mar',d:'Ballast and MBRS disinfection, ETP dosing.',s:['12-15%','Liquid','200L']},
{n:'Rust Remover / Passivator',g:'Marine',c:'mar',d:'Rust conversion and passivation for deck machinery.',s:['Phosphoric','20L','Non-fuming']},
{n:'Fuel Treatment',g:'Combustion',c:'mar',d:'Fuel stability and combustion improvement additive.',s:['Organic','200L','IMO 2020']},
];
let cur='all',qq='';
function card(p){return '<div class="pcard"><span class="ptag">'+CN[p.c]+' - '+p.g+'</span><h3>'+p.n+'</h3><p>'+p.d+'</p><div class="pspec">'+p.s.map(function(x){return '<span>'+x+'</span>'}).join('')+'</div><div style="display:flex;gap:8px;margin-top:6px"><a class="btn btn-p btn-sm" href="mailto:sales@vanguardchemicals.in?subject='+encodeURIComponent('Product Enquiry - '+p.n)+'&body='+encodeURIComponent('Hello Vanguard Team,\r\n\r\nWe are interested in '+p.n+' ('+p.g+').\r\n\r\nCompany: \r\nCountry: \r\nQuantity: \r\nPacking: \r\nDestination Port: \r\n\r\nRegards,')+'">Email Enquiry</a><a class="btn btn-g btn-sm" href="contact.html">Contact</a></div></div>'}
function render(){var g=document.getElementById('grid');if(!g)return;g.innerHTML=P.filter(function(p){return (cur==='all'||p.c===cur)&&(p.n.toLowerCase().indexOf(qq)>-1||p.d.toLowerCase().indexOf(qq)>-1)}).map(card).join('')}
function filterCat(c,el){cur=c;var b=document.querySelectorAll('.fbtn');for(var i=0;i<b.length;i++)b[i].classList.remove('active');if(el)el.classList.add('active');render()}
function filterQ(v){qq=v.toLowerCase();render()}
render();
/* Visual storytelling engine: reveal on scroll */
(function(){var els=document.querySelectorAll('.reveal,.card,.cat,.pcard,.station,.jnode');for(var i=0;i<els.length;i++){els[i].classList.add('reveal')}var ob=new IntersectionObserver(function(en){for(var j=0;j<en.length;j++){if(en[j].isIntersecting){en[j].target.classList.add('in');ob.unobserve(en[j].target)}}},{threshold:.12});for(var k=0;k<els.length;k++){ob.observe(els[k])}})();
/* ===== LUXE EXPERIENCE ENGINE ===== */
(function(){
  var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(rm)return;
  var d=document.documentElement;
  /* scroll progress bar */
  var sp=document.createElement('div');sp.className='scroll-progress';document.body.appendChild(sp);
  var onS=function(){var d=document.documentElement;var max=d.scrollHeight-d.clientHeight;sp.style.width=(max>0?(d.scrollTop||document.body.scrollTop)/max*100:0)+'%'};
  window.addEventListener('scroll',onS,{passive:true});onS();
  /* back to top */
  var t=document.createElement('a');t.className='to-top';t.href='#';t.setAttribute('aria-label','Back to top');
  t.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  t.addEventListener('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})});
  document.body.appendChild(t);
  window.addEventListener('scroll',function(){t.classList.toggle('show',(window.pageYOffset||0)>420)},{passive:true});
  /* staggered reveal: children of grids animate in sequence */
  var groups=document.querySelectorAll('.cards3,.cat-grid,.journey,.vals,.steps,.pgrid');
  for(var g=0;g<groups.length;g++){
    var kids=groups[g].children;
    for(var i=0;i<kids.length;i++){
      kids[i].classList.add('reveal');
      kids[i].style.transitionDelay=(i*80)+'ms';
    }
  }
  var els=document.querySelectorAll('.reveal');
  var ob=new IntersectionObserver(function(en){for(var j=0;j<en.length;j++){if(en[j].isIntersecting){en[j].target.classList.add('in');ob.unobserve(en[j].target)}}},{threshold:.1});
  for(var k=0;k<els.length;k++){ob.observe(els[k])}
})();