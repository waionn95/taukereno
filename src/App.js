import { useState } from "react";

const C = {
  teal:"#45B5A5",tealDark:"#2A8A7C",tealDeep:"#1A6B5F",tealLight:"#E8F7F5",tealMid:"#B8E8E3",
  amber:"#BA7517",amberLight:"#FAEEDA",
  coral:"#D85A30",coralLight:"#FAECE7",
  solar:"#F59E0B",solarLight:"#FEF3C7",solarDeep:"#92400E",
  purple:"#7C3AED",purpleLight:"#EDE9FE",
  text:"var(--color-text-primary)",textSec:"var(--color-text-secondary)",
};

const CATEGORIES = [
  { id:"renovation", label:"Renovation", icon:"🏗️", color:C.teal, light:C.tealLight, desc:"Full home renovation & makeover" },
  { id:"repair", label:"Repair", icon:"🔧", color:C.coral, light:C.coralLight, desc:"Urgent & general repair works", urgent:true },
  { id:"solar", label:"Solar System", icon:"☀️", color:C.solar, light:C.solarLight, desc:"Solar panel installation & quotes" },
  { id:"aircon", label:"Air Conditioning", icon:"❄️", color:"#185FA5", light:"#E6F1FB", desc:"Supply, install & service", soon:true },
  { id:"electrical", label:"Electrical & Plumbing", icon:"⚡", color:"#6D28D9", light:"#EDE9FE", desc:"Wiring, piping & fixtures", soon:true },
  { id:"roofing", label:"Roofing & Waterproofing", icon:"🏠", color:"#065F46", light:"#D1FAE5", desc:"Roof repair & waterproofing", soon:true },
  { id:"cleaning", label:"Cleaning Service", icon:"🧹", color:"#BE185D", light:"#FCE7F3", desc:"Home & office deep cleaning", soon:true },
];

const SOLAR_TIERS = [
  {
    id:"neo", label:"Solar Neo", tag:"Budgetary", icon:"☀️",
    desc:"Reliable entry-level system using cost-effective Tier-1 brands. Great for homeowners starting their solar journey with a modest budget.",
    components:{
      panels:{ brands:["JA Solar","Trina Solar","Jinko Solar","Canadian Solar"], tech:"Monocrystalline PERC", warranty:"25-year performance warranty" },
      inverter:{ brands:["GoodWe","Solis (Ginlong)","Growatt"], type:"String inverter", warranty:"10-year warranty" },
      battery:{ brands:["Dyness","AlphaESS","Growatt Battery"], chemistry:"LiFePO₄ (optional add-on)", note:"Optional — not included by default" },
    },
    highlights:["Tier-1 certified panels","SEDA/Solar ATAP eligible","Budget-friendly upfront cost","Good for TNB bills below RM 200/month"],
    minCost:12000, maxCost:22000, timeline:"7–10 working days", color:C.teal, light:C.tealLight
  },
  {
    id:"moderate", label:"Solar Moderate", tag:"Mid-range", icon:"☀️☀️",
    desc:"Balanced efficiency and reliability with globally recognised brands. Ideal for medium homes wanting smart monitoring and optional battery storage.",
    components:{
      panels:{ brands:["LONGi Solar (Hi-MO series)","Astronergy ASTRO","REC Group","Qcells Q.Peak"], tech:"Monocrystalline / Bifacial", warranty:"25–30 year performance warranty" },
      inverter:{ brands:["Huawei FusionSolar","Sungrow SG series","Sofar Solar"], type:"Hybrid inverter (battery-ready)", warranty:"10-year warranty" },
      battery:{ brands:["Pylontech US series","GoodWe Lynx Home","BYD Battery-Box LV"], chemistry:"LiFePO₄ modular stackable", note:"Included or optional upgrade" },
    },
    highlights:["Smart monitoring via app","Battery-ready hybrid inverter","Strong after-sales support","Best for TNB bills RM 200–500/month"],
    minCost:22000, maxCost:42000, timeline:"10–14 working days", color:C.amber, light:C.amberLight
  },
  {
    id:"premium", label:"Solar Premium", tag:"Premium", icon:"☀️☀️☀️",
    desc:"Top-tier imported components with maximum efficiency, integrated battery storage, smart energy management and the longest warranties available.",
    components:{
      panels:{ brands:["SunPower Maxeon","REC Alpha (N-type)","Qcells Q.Peak DUO BLK-G10+","LONGi Hi-MO 6"], tech:"N-type TOPCon / HJT / IBC", warranty:"25–40 year performance warranty" },
      inverter:{ brands:["Fronius Symo / Primo","SMA Sunny Boy / Tripower","SolarEdge with optimisers","Huawei SUN2000 (premium tier)"], type:"Smart hybrid / string with optimisers", warranty:"12–15 year warranty" },
      battery:{ brands:["BYD HVS / HVM Battery-Box","Huawei LUNA2000","Sungrow SBR HV series","Fronius Reserva"], chemistry:"High-voltage LiFePO₄ (integrated)", note:"Included — full home backup capable" },
    },
    highlights:["Highest panel efficiency (22%+)","Full home backup during outage","25–40 yr panel performance warranty","AI-based energy management","Best for TNB bills above RM 500/month"],
    minCost:45000, maxCost:85000, timeline:"14–21 working days", color:C.solar, light:C.solarLight
  },
];

const RENO_SCOPES = [
  { id:"kitchen", label:"Kitchen", icon:"🍳", items:["Cabinet replacement","Countertop","Backsplash tiling","Sink & tap","Appliance installation"] },
  { id:"bathroom", label:"Bathroom", icon:"🚿", items:["Wall & floor tiling","Toilet bowl","Vanity & mirror","Shower system","Plumbing repair"] },
  { id:"living", label:"Living room", icon:"🛋️", items:["Feature wall","False ceiling","LED lighting","Flooring","Built-in TV console"] },
  { id:"bedroom", label:"Bedroom", icon:"🛏️", items:["Built-in wardrobe","False ceiling","Flooring","Partition wall","Feature wall"] },
  { id:"exterior", label:"Exterior", icon:"🏠", items:["Roof repair","Facade painting","Gate & fence","Driveway","Landscaping"] },
  { id:"repair", label:"Urgent repair", icon:"🔧", items:["Leaking pipe","Electrical fault","Roof leak","Crack & seepage","Broken tiles"] },
];

const BASE_COST = {
  "Cabinet replacement":[8000,20000],"Countertop":[3000,8000],"Backsplash tiling":[1500,4000],"Sink & tap":[800,2500],"Appliance installation":[500,1500],
  "Wall & floor tiling":[3000,8000],"Toilet bowl":[600,2000],"Vanity & mirror":[800,3000],"Shower system":[1200,4000],"Plumbing repair":[500,2000],
  "Feature wall":[2000,6000],"False ceiling":[3000,8000],"LED lighting":[1000,3000],"Flooring":[4000,12000],"Built-in TV console":[2500,7000],
  "Built-in wardrobe":[4000,12000],"Partition wall":[2000,6000],
  "Roof repair":[3000,10000],"Facade painting":[2000,6000],"Gate & fence":[3000,8000],"Driveway":[5000,15000],"Landscaping":[3000,10000],
  "Leaking pipe":[300,1500],"Electrical fault":[500,2000],"Roof leak":[1000,5000],"Crack & seepage":[800,3000],"Broken tiles":[400,1500],
};

const Btn=({onClick,children,variant="primary",small,full,disabled})=>{
  const base={border:"none",borderRadius:8,fontWeight:500,cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.5:1,fontSize:small?12:14,padding:small?"6px 14px":full?"13px":"10px 20px",width:full?"100%":undefined};
  const s={primary:{...base,background:C.teal,color:"#fff"},outline:{...base,background:"none",border:`1px solid ${C.teal}`,color:C.teal},ghost:{...base,background:"none",border:"1px solid #ddd",color:C.text},solar:{...base,background:C.solar,color:"#fff"},urgent:{...base,background:C.coral,color:"#fff"}};
  return <button style={s[variant]||s.primary} onClick={onClick} disabled={disabled}>{children}</button>;
};

const Card=({children,style})=>(
  <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"16px 18px",...style}}>{children}</div>
);

const Tag=({label,color=C.tealDeep,bg=C.tealLight})=>(
  <span style={{background:bg,color,fontSize:11,fontWeight:500,padding:"3px 10px",borderRadius:20}}>{label}</span>
);

function SolarCalculator({onBack}){
  const [step,setStep]=useState(1);
  const [tier,setTier]=useState(null);
  const [bill,setBill]=useState("");
  const [roofType,setRoofType]=useState("landed");
  const [floors,setFloors]=useState("1");
  const [aiResult,setAiResult]=useState(null);
  const [loading,setLoading]=useState(false);
  const [agreed,setAgreed]=useState(false);

  const selectedTier=SOLAR_TIERS.find(t=>t.id===tier);

  const runAI=async()=>{
    setLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`You are a Malaysian solar energy consultant. Give a realistic solar installation estimate. Respond ONLY in JSON: totalMin (number RM), totalMax (number RM), recommendedCapacity (string kW), estimatedSavings (string monthly RM savings), paybackPeriod (string years), netMeteringEligible (boolean), tips (array of 2 strings), suitability (string 1 sentence). No markdown.\n\nTier: ${selectedTier?.label}\nMonthly electricity bill: RM ${bill}\nRoof type: ${roofType}\nStorey: ${floors}\nSystem range: RM ${selectedTier?.minCost}–${selectedTier?.maxCost}`}]})});
      const d=await res.json();
      setAiResult(JSON.parse(d.content.map(i=>i.text||"").join("").replace(/```json|```/g,"").trim()));
    }catch{
      setAiResult({totalMin:selectedTier?.minCost,totalMax:selectedTier?.maxCost,recommendedCapacity:tier==="neo"?"4 kW":tier==="moderate"?"8 kW":"12 kW",estimatedSavings:"RM 200–400",paybackPeriod:"6–8 years",netMeteringEligible:true,tips:["Apply for Solar ATAP with TNB to export excess power back to grid","Clean panels every 3 months to maintain efficiency"],suitability:"Suitable for your energy consumption and roof type."});
    }
    setLoading(false);
    setStep(4);
  };

  if(agreed) return(
    <Card style={{textAlign:"center",padding:"32px 20px"}}>
      <div style={{width:52,height:52,borderRadius:"50%",background:C.solarLight,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:24}}>☀️</div>
      <p style={{fontWeight:500,fontSize:16,marginBottom:8,color:C.text}}>Solar request submitted!</p>
      <p style={{color:C.textSec,fontSize:13,marginBottom:20,lineHeight:1.6}}>Bidding is now open. Certified solar installers will submit quotes. We'll shortlist the best for you.</p>
      <Btn variant="solar" onClick={()=>{setStep(1);setTier(null);setBill("");setAiResult(null);setAgreed(false);}}>Start new estimate</Btn>
    </Card>
  );

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:C.teal,fontWeight:500,padding:0,fontSize:13}}>← Back</button>
        <span style={{fontSize:13,color:C.textSec}}>Step {step} of {step<4?3:4}</span>
      </div>
      <div style={{display:"flex",gap:5,marginBottom:20}}>
        {[1,2,3,4].map(n=><div key={n} style={{flex:1,height:4,borderRadius:4,background:step>=n?C.solar:"var(--color-border-tertiary)"}}/>)}
      </div>

      {step===1&&(
        <div>
          <p style={{fontWeight:500,fontSize:15,marginBottom:4,color:C.text}}>Choose your solar package</p>
          <p style={{fontSize:13,color:C.textSec,marginBottom:16}}>Select the tier that fits your budget and needs</p>
          {SOLAR_TIERS.map(t=>(
            <div key={t.id} onClick={()=>setTier(t.id)} style={{border:`${tier===t.id?"2px":"0.5px"} solid ${tier===t.id?t.color:"var(--color-border-tertiary)"}`,borderRadius:12,padding:"14px 16px",marginBottom:14,cursor:"pointer",background:tier===t.id?t.light:"var(--color-background-primary)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:18}}>{t.icon}</span>
                  <span style={{fontWeight:500,fontSize:15,color:tier===t.id?t.color:C.text}}>{t.label}</span>
                  <span style={{background:t.light,color:t.color,fontSize:10,fontWeight:500,padding:"2px 8px",borderRadius:20,border:`0.5px solid ${t.color}`}}>{t.tag}</span>
                </div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:8}}>
                  <div style={{fontWeight:500,fontSize:13,color:t.color}}>RM {(t.minCost/1000).toFixed(0)}k–{(t.maxCost/1000).toFixed(0)}k</div>
                  <div style={{fontSize:11,color:C.textSec}}>{t.timeline}</div>
                </div>
              </div>
              <p style={{fontSize:12,color:C.textSec,margin:"0 0 10px",lineHeight:1.5}}>{t.desc}</p>
              {[
                {icon:"🔆",label:"PV Panels",data:t.components.panels},
                {icon:"⚡",label:"Inverter",data:t.components.inverter},
                {icon:"🔋",label:"Battery",data:t.components.battery},
              ].map(c=>(
                <div key={c.label} style={{background:"var(--color-background-secondary)",borderRadius:8,padding:"8px 10px",marginBottom:6}}>
                  <div style={{fontSize:11,fontWeight:500,color:C.text,marginBottom:3}}>{c.icon} {c.label} — <span style={{color:C.textSec,fontWeight:400}}>{c.data.tech||c.data.type||c.data.chemistry}</span></div>
                  <div style={{fontSize:11,color:t.color,fontWeight:500}}>{c.data.brands.join(" · ")}</div>
                  {c.data.note&&<div style={{fontSize:10,color:C.textSec,marginTop:2,fontStyle:"italic"}}>{c.data.note}</div>}
                </div>
              ))}
              <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>
                {t.highlights.map(h=><span key={h} style={{fontSize:10,background:t.light,color:t.color,padding:"2px 8px",borderRadius:20,border:`0.5px solid ${t.color}`}}>✓ {h}</span>)}
              </div>
            </div>
          ))}
          <Btn full onClick={()=>setStep(2)} disabled={!tier}>Next — tell us about your home</Btn>
        </div>
      )}

      {step===2&&(
        <div>
          <p style={{fontWeight:500,fontSize:15,marginBottom:4,color:C.text}}>Your home details</p>
          <p style={{fontSize:13,color:C.textSec,marginBottom:16}}>Helps us calculate the right system size for you</p>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,color:C.textSec,display:"block",marginBottom:6}}>Average monthly electricity bill (RM) <span style={{color:C.coral}}>*</span></label>
            <input type="number" placeholder="e.g. 250" value={bill} onChange={e=>setBill(e.target.value)} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"0.5px solid #ccc",fontSize:14,boxSizing:"border-box"}}/>
            {bill&&<p style={{fontSize:11,color:C.tealDark,marginTop:4}}>Estimated annual savings potential: RM {Math.round(Number(bill)*0.6*12).toLocaleString()}/year</p>}
          </div>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,color:C.textSec,display:"block",marginBottom:8}}>Property type</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[["landed","🏠 Landed house"],["apartment","🏢 Apartment / Condo"],["semi-d","🏘️ Semi-D / Bungalow"],["commercial","🏪 Commercial"]].map(([k,l])=>(
                <div key={k} onClick={()=>setRoofType(k)} style={{border:`${roofType===k?"2px":"0.5px"} solid ${roofType===k?C.solar:"var(--color-border-tertiary)"}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",background:roofType===k?C.solarLight:"var(--color-background-primary)",fontSize:13,color:roofType===k?C.solarDeep:C.text,fontWeight:roofType===k?500:400}}>{l}</div>
              ))}
            </div>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:12,color:C.textSec,display:"block",marginBottom:8}}>Number of storeys</label>
            <div style={{display:"flex",gap:8}}>
              {[["1","1 storey"],["2","2 storey"],["3+","3+ storey"]].map(([k,l])=>(
                <div key={k} onClick={()=>setFloors(k)} style={{flex:1,border:`${floors===k?"2px":"0.5px"} solid ${floors===k?C.solar:"var(--color-border-tertiary)"}`,borderRadius:10,padding:"10px 8px",cursor:"pointer",textAlign:"center",background:floors===k?C.solarLight:"var(--color-background-primary)"}}>
                  <div style={{fontWeight:500,fontSize:13,color:floors===k?C.solarDeep:C.text}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <Btn variant="solar" full onClick={()=>setStep(3)} disabled={!bill}>Next — review & get AI estimate</Btn>
        </div>
      )}

      {step===3&&(
        <div>
          <p style={{fontWeight:500,fontSize:15,marginBottom:16,color:C.text}}>Review your selection</p>
          <Card style={{background:C.solarLight,border:`0.5px solid ${C.solar}`,marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontWeight:500,color:C.solarDeep}}>{selectedTier?.label}</span>
              <span style={{fontSize:12,color:C.solar,fontWeight:500}}>{selectedTier?.tag}</span>
            </div>
            {[["Monthly bill",`RM ${Number(bill).toLocaleString()}`],["Property",roofType],["Storeys",floors],["Est. cost range",`RM ${selectedTier?.minCost.toLocaleString()} – ${selectedTier?.maxCost.toLocaleString()}`],["Install timeline",selectedTier?.timeline]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6}}>
                <span style={{color:C.textSec}}>{l}</span><span style={{fontWeight:500,color:C.text}}>{v}</span>
              </div>
            ))}
          </Card>
          <div style={{background:C.tealLight,border:`0.5px solid ${C.teal}`,borderRadius:10,padding:"12px 14px",marginBottom:20,fontSize:13,color:C.tealDeep,lineHeight:1.6}}>
            🇲🇾 Malaysia's Solar ATAP scheme (from Jan 2026) lets you export excess solar energy to TNB grid for credits — our AI will assess your eligibility.
          </div>
          <Btn variant="solar" full onClick={runAI} disabled={loading}>{loading?"AI is calculating your solar estimate...":"Get AI-powered solar estimate"}</Btn>
        </div>
      )}

      {step===4&&aiResult&&(
        <div>
          <div style={{background:C.solarLight,border:`1px solid ${C.solar}`,borderRadius:12,padding:"16px",marginBottom:16,textAlign:"center"}}>
            <p style={{fontSize:12,color:C.solarDeep,margin:"0 0 4px",fontWeight:500}}>AI solar estimate — {selectedTier?.label}</p>
            <p style={{fontSize:24,fontWeight:500,color:C.solarDeep,margin:"0 0 6px"}}>RM {aiResult.totalMin?.toLocaleString()} – {aiResult.totalMax?.toLocaleString()}</p>
            <p style={{fontSize:13,color:C.solar,margin:0}}>Recommended capacity: {aiResult.recommendedCapacity}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {[["Monthly savings",aiResult.estimatedSavings],["Payback period",aiResult.paybackPeriod],["Solar ATAP eligible",aiResult.netMeteringEligible?"Yes ✓":"Check with installer"],["Timeline",selectedTier?.timeline]].map(([l,v])=>(
              <div key={l} style={{background:"var(--color-background-secondary)",borderRadius:10,padding:"12px"}}>
                <div style={{fontSize:11,color:C.textSec,marginBottom:4}}>{l}</div>
                <div style={{fontSize:13,fontWeight:500,color:C.text}}>{v}</div>
              </div>
            ))}
          </div>
          <p style={{fontSize:13,color:C.textSec,marginBottom:10,lineHeight:1.6}}>{aiResult.suitability}</p>
          {aiResult.tips?.length>0&&(
            <div style={{background:C.amberLight,borderRadius:10,padding:"12px 14px",marginBottom:16}}>
              <p style={{fontSize:12,fontWeight:500,color:C.amber,margin:"0 0 6px"}}>Smart tips</p>
              {aiResult.tips.map((t,i)=><p key={i} style={{fontSize:12,color:C.amber,margin:"0 0 4px"}}>• {t}</p>)}
            </div>
          )}
          <div style={{background:C.tealLight,border:`0.5px solid ${C.teal}`,borderRadius:10,padding:"12px 14px",fontSize:12,color:C.tealDeep,marginBottom:16}}>
            Contractor participation fee: <strong>RM {Math.round(((aiResult.totalMin+aiResult.totalMax)/2)*0.005).toLocaleString()}</strong> (0.5% of AI estimate) — no markup from us.
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <Btn variant="solar" full onClick={()=>setAgreed(true)}>Agree & open solar bidding — free</Btn>
            <Btn variant="ghost" full onClick={()=>{setStep(1);setTier(null);setBill("");setAiResult(null);}}>Start over</Btn>
          </div>
          <p style={{textAlign:"center",fontSize:11,color:C.textSec,marginTop:12}}>No fair quote? You pay nothing. Ever.</p>
        </div>
      )}
    </div>
  );
}

function RenoCalculator({onBack,isRepair}){
  const [step,setStep]=useState(1);
  const [selectedCat,setSelectedCat]=useState(isRepair?"repair":null);
  const [selectedItems,setSelectedItems]=useState([]);
  const [size,setSize]=useState("medium");
  const [quality,setQuality]=useState("standard");
  const [aiResult,setAiResult]=useState(null);
  const [loading,setLoading]=useState(false);
  const [notes,setNotes]=useState("");
  const [media,setMedia]=useState([]);

  const sizeM={small:0.7,medium:1,large:1.4};
  const qualityM={budget:0.75,standard:1,premium:1.4};
  const calcRange=()=>{
    let mn=0,mx=0;
    selectedItems.forEach(item=>{const[lo,hi]=BASE_COST[item]||[0,0];mn+=lo;mx+=hi;});
    return[Math.round(mn*sizeM[size]*qualityM[quality]),Math.round(mx*sizeM[size]*qualityM[quality])];
  };
  const[estMin,estMax]=calcRange();

  const handleMedia=e=>{
    const files=Array.from(e.target.files);
    setMedia(prev=>[...prev,...files.map(f=>({name:f.name,url:URL.createObjectURL(f),type:f.type.startsWith("video")?"video":"image"}))]);
  };
  const removeMedia=i=>setMedia(prev=>prev.filter((_,idx)=>idx!==i));
  const toggleItem=item=>setSelectedItems(prev=>prev.includes(item)?prev.filter(x=>x!==item):[...prev,item]);

  const runAI=async()=>{
    setLoading(true);
    const cat=RENO_SCOPES.find(s=>s.id===selectedCat);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`Malaysian renovation cost estimator. Respond ONLY JSON: totalMin (number), totalMax (number), timeline (string), breakdown (array of {item,minCost,maxCost}), tips (array of 2 strings), urgency ("standard" or "urgent"). No markdown.\nCategory: ${cat?.label}\nItems: ${selectedItems.join(", ")}\nSize: ${size}\nQuality: ${quality}\nNotes: ${notes||"none"}`}]})});
      const d=await res.json();
      setAiResult(JSON.parse(d.content.map(i=>i.text||"").join("").replace(/```json|```/g,"").trim()));
    }catch{
      setAiResult({totalMin:estMin,totalMax:estMax,timeline:selectedCat==="repair"?"1–3 days":"3–6 weeks",breakdown:selectedItems.map(item=>({item,minCost:BASE_COST[item]?.[0]||0,maxCost:BASE_COST[item]?.[1]||0})),tips:["Get at least 3 quotes before deciding","Ask about material warranty"],urgency:selectedCat==="repair"?"urgent":"standard"});
    }
    setLoading(false);
    setStep(isRepair?3:4);
  };

  const reset=()=>{setStep(1);setSelectedCat(isRepair?"repair":null);setSelectedItems([]);setSize("medium");setQuality("standard");setAiResult(null);setNotes("");setMedia([]);};
  const totalSteps=isRepair?3:4;

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:C.teal,fontWeight:500,padding:0,fontSize:13}}>← Back</button>
        <span style={{fontSize:13,color:C.textSec}}>Step {step} of {totalSteps}</span>
      </div>
      <div style={{display:"flex",gap:5,marginBottom:20}}>
        {Array.from({length:totalSteps},(_,i)=>i+1).map(n=><div key={n} style={{flex:1,height:4,borderRadius:4,background:step>=n?C.teal:"var(--color-border-tertiary)"}}/>)}
      </div>

      {step===1&&!isRepair&&(
        <div>
          <p style={{fontWeight:500,fontSize:15,marginBottom:4,color:C.text}}>What area needs work?</p>
          <p style={{fontSize:13,color:C.textSec,marginBottom:16}}>Select the area of your home</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {RENO_SCOPES.map(s=>(
              <div key={s.id} onClick={()=>{setSelectedCat(s.id);setSelectedItems([]);}} style={{border:`${selectedCat===s.id?"2px":"0.5px"} solid ${selectedCat===s.id?C.teal:"var(--color-border-tertiary)"}`,borderRadius:12,padding:"14px",cursor:"pointer",background:selectedCat===s.id?C.tealLight:"var(--color-background-primary)"}}>
                <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
                <div style={{fontWeight:500,fontSize:13,color:selectedCat===s.id?C.tealDeep:C.text}}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:16}}><Btn full onClick={()=>setStep(2)} disabled={!selectedCat}>Next — choose scope</Btn></div>
        </div>
      )}

      {((step===2&&!isRepair)||(step===1&&isRepair))&&(
        <div>
          <p style={{fontWeight:500,fontSize:15,marginBottom:4,color:C.text}}>What's included?</p>
          <p style={{fontSize:13,color:C.textSec,marginBottom:16}}>Select all that apply</p>
          {RENO_SCOPES.find(s=>s.id===selectedCat)?.items.map(item=>(
            <div key={item} onClick={()=>toggleItem(item)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",border:`${selectedItems.includes(item)?"1.5px":"0.5px"} solid ${selectedItems.includes(item)?C.teal:"var(--color-border-tertiary)"}`,borderRadius:10,padding:"12px 14px",marginBottom:8,cursor:"pointer",background:selectedItems.includes(item)?C.tealLight:"var(--color-background-primary)"}}>
              <span style={{fontSize:14,color:selectedItems.includes(item)?C.tealDeep:C.text,fontWeight:selectedItems.includes(item)?500:400}}>{item}</span>
              <div style={{width:18,height:18,borderRadius:"50%",border:`1.5px solid ${selectedItems.includes(item)?C.teal:"#ccc"}`,background:selectedItems.includes(item)?C.teal:"none",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {selectedItems.includes(item)&&<span style={{color:"#fff",fontSize:11}}>✓</span>}
              </div>
            </div>
          ))}
          {(selectedCat==="repair"||isRepair)&&(
            <div style={{marginTop:16}}>
              <div style={{background:C.coralLight,border:`1px solid ${C.coral}`,borderRadius:10,padding:"12px 14px",marginBottom:14}}>
                <p style={{fontWeight:500,fontSize:13,color:C.coral,margin:"0 0 4px"}}>⚠ Photo & video required for repair jobs</p>
                <p style={{fontSize:12,color:"#7a2e15",margin:0,lineHeight:1.5}}>Upload clear photos or videos of the damage so contractors can assess and quote accurately — no site visit needed upfront.</p>
              </div>
              <label style={{fontSize:12,color:C.textSec,display:"block",marginBottom:8}}>Upload photos & videos <span style={{color:C.coral,fontWeight:500}}>*</span></label>
              <label style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:`2px dashed ${media.length>0?C.teal:"#ccc"}`,borderRadius:12,padding:"20px",cursor:"pointer",background:media.length>0?C.tealLight:"var(--color-background-secondary)",marginBottom:10}}>
                <input type="file" accept="image/*,video/*" multiple onChange={handleMedia} style={{display:"none"}}/>
                <div style={{fontSize:28,marginBottom:8}}>📷</div>
                <p style={{fontSize:13,fontWeight:500,color:media.length>0?C.tealDeep:C.textSec,margin:"0 0 4px"}}>{media.length>0?`${media.length} file(s) added — tap to add more`:"Tap to upload photos or videos"}</p>
                <p style={{fontSize:11,color:C.textSec,margin:0}}>JPG, PNG, MP4, MOV · Multiple files allowed</p>
              </label>
              {media.length>0&&(
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
                  {media.map((m,i)=>(
                    <div key={i} style={{position:"relative",borderRadius:10,overflow:"hidden",border:"0.5px solid var(--color-border-tertiary)",aspectRatio:"1",background:"#000"}}>
                      {m.type==="image"?<img src={m.url} alt={m.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                        :<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#1a1a1a"}}><span style={{fontSize:24}}>🎥</span><span style={{fontSize:9,color:"#aaa",marginTop:4,padding:"0 4px",textAlign:"center",wordBreak:"break-all"}}>{m.name}</span></div>}
                      <button onClick={()=>removeMedia(i)} style={{position:"absolute",top:4,right:4,width:20,height:20,borderRadius:"50%",background:"rgba(0,0,0,0.6)",border:"none",color:"#fff",fontSize:12,cursor:"pointer",lineHeight:1}}>×</button>
                    </div>
                  ))}
                </div>
              )}
              {["Show the full area, not just the damaged spot","Multiple angles for leaks or cracks","For electrical faults, show the switch/circuit breaker"].map(t=><p key={t} style={{fontSize:11,color:C.textSec,margin:"0 0 3px"}}>• {t}</p>)}
            </div>
          )}
          <div style={{marginTop:12}}>
            <label style={{fontSize:12,color:C.textSec,display:"block",marginBottom:6}}>Additional notes (optional)</label>
            <textarea rows={2} placeholder="Specific requirements, existing condition, special requests..." value={notes} onChange={e=>setNotes(e.target.value)} style={{width:"100%",resize:"vertical",padding:"9px 12px",borderRadius:8,border:"0.5px solid #ccc",fontSize:13,boxSizing:"border-box"}}/>
          </div>
          <div style={{marginTop:14}}>
            {isRepair
              ?<Btn full onClick={runAI} disabled={loading||selectedItems.length===0||media.length===0}>{loading?"AI is calculating...":media.length===0?"Please upload at least 1 photo or video":"Get AI estimate — free"}</Btn>
              :<Btn full onClick={()=>setStep(3)} disabled={selectedItems.length===0||(selectedCat==="repair"&&media.length===0)}>
                {selectedCat==="repair"&&media.length===0?"Please upload at least 1 photo or video":"Next — size & quality"}
              </Btn>}
          </div>
        </div>
      )}

      {step===3&&!isRepair&&(
        <div>
          <p style={{fontWeight:500,fontSize:15,marginBottom:16,color:C.text}}>Size & quality</p>
          <div style={{marginBottom:20}}>
            <p style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:10}}>Space size</p>
            <div style={{display:"flex",gap:8}}>
              {[["small","Small","< 100 sqft"],["medium","Medium","100–300 sqft"],["large","Large","> 300 sqft"]].map(([k,l,sub])=>(
                <div key={k} onClick={()=>setSize(k)} style={{flex:1,border:`${size===k?"2px":"0.5px"} solid ${size===k?C.teal:"var(--color-border-tertiary)"}`,borderRadius:10,padding:"10px 8px",cursor:"pointer",textAlign:"center",background:size===k?C.tealLight:"var(--color-background-primary)"}}>
                  <div style={{fontWeight:500,fontSize:13,color:size===k?C.tealDeep:C.text}}>{l}</div>
                  <div style={{fontSize:11,color:C.textSec,marginTop:2}}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginBottom:20}}>
            <p style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:10}}>Material quality</p>
            <div style={{display:"flex",gap:8}}>
              {[["budget","Budget","Affordable"],["standard","Standard","Good quality"],["premium","Premium","High-end"]].map(([k,l,sub])=>(
                <div key={k} onClick={()=>setQuality(k)} style={{flex:1,border:`${quality===k?"2px":"0.5px"} solid ${quality===k?C.teal:"var(--color-border-tertiary)"}`,borderRadius:10,padding:"10px 8px",cursor:"pointer",textAlign:"center",background:quality===k?C.tealLight:"var(--color-background-primary)"}}>
                  <div style={{fontWeight:500,fontSize:13,color:quality===k?C.tealDeep:C.text}}>{l}</div>
                  <div style={{fontSize:11,color:C.textSec,marginTop:2}}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
          <Card style={{background:C.tealLight,border:`0.5px solid ${C.teal}`,marginBottom:16}}>
            <p style={{fontSize:12,color:C.tealDeep,margin:"0 0 4px",fontWeight:500}}>Pre-AI estimate</p>
            <p style={{fontSize:20,fontWeight:500,color:C.tealDeep,margin:0}}>RM {estMin.toLocaleString()} – {estMax.toLocaleString()}</p>
          </Card>
          <Btn full onClick={runAI} disabled={loading}>{loading?"AI is calculating...":"Get AI-powered estimate"}</Btn>
        </div>
      )}

      {((step===4&&!isRepair)||(step===3&&isRepair))&&aiResult&&(
        <div>
          {aiResult.urgency==="urgent"&&<div style={{background:C.coralLight,color:C.coral,borderRadius:8,padding:"8px 14px",fontSize:13,fontWeight:500,marginBottom:12}}>⚡ Urgent repair — fast-track quotes available</div>}
          <Card style={{background:C.tealLight,border:`1px solid ${C.teal}`,marginBottom:16,textAlign:"center"}}>
            <p style={{fontSize:12,color:C.tealDeep,margin:"0 0 4px"}}>AI estimate</p>
            <p style={{fontSize:24,fontWeight:500,color:C.tealDeep,margin:"0 0 4px"}}>RM {aiResult.totalMin?.toLocaleString()} – {aiResult.totalMax?.toLocaleString()}</p>
            <p style={{fontSize:13,color:C.tealDark,margin:0}}>Timeline: {aiResult.timeline}</p>
          </Card>
          <p style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:10}}>Breakdown</p>
          {aiResult.breakdown?.map(b=>(
            <div key={b.item} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
              <span style={{fontSize:13,color:C.text}}>{b.item}</span>
              <span style={{fontSize:13,fontWeight:500,color:C.tealDark}}>RM {b.minCost.toLocaleString()} – {b.maxCost.toLocaleString()}</span>
            </div>
          ))}
          {aiResult.tips?.length>0&&(
            <div style={{background:C.amberLight,borderRadius:10,padding:"12px 14px",marginTop:14,marginBottom:16}}>
              <p style={{fontSize:12,fontWeight:500,color:C.amber,margin:"0 0 6px"}}>Money-saving tips</p>
              {aiResult.tips.map((t,i)=><p key={i} style={{fontSize:12,color:C.amber,margin:"0 0 4px"}}>• {t}</p>)}
            </div>
          )}
          <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:16}}>
            <Btn full>Submit as renovation request — free</Btn>
            <Btn variant="ghost" full onClick={reset}>Start new estimate</Btn>
          </div>
          <p style={{textAlign:"center",fontSize:11,color:C.textSec,marginTop:12}}>No markup from us — contractors quote their best price openly, and you decide what's worth it.</p>
        </div>
      )}
    </div>
  );
}

function LoginModal({onLogin,onClose}){
  const [step,setStep]=useState("choose");
  const [role,setRole]=useState(null);
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const roles=[
    {key:"homeowner",label:"Homeowner",desc:"Submit & track requests",icon:"🏠"},
    {key:"contractor",label:"Contractor / Installer",desc:"Browse jobs & submit quotes",icon:"🔨"},
    {key:"estimator",label:"Estimator / Admin",desc:"Manage projects & shortlisting",icon:"📋"},
  ];
  return(
    <div style={{minHeight:360,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:12,padding:20}}>
      <div style={{background:"var(--color-background-primary)",borderRadius:16,padding:"28px 22px",width:"100%"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <span style={{fontWeight:500,fontSize:17,color:C.teal}}>Tauke Reno</span>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#aaa"}}>×</button>
        </div>
        {step==="choose"&&(
          <>
            <p style={{fontSize:14,fontWeight:500,marginBottom:14,color:C.text}}>Log in as</p>
            {roles.map(r=>(
              <div key={r.key} onClick={()=>{setRole(r.key);setStep("login");}} style={{display:"flex",alignItems:"center",gap:12,border:"0.5px solid var(--color-border-secondary)",borderRadius:10,padding:"12px 14px",marginBottom:10,cursor:"pointer"}}>
                <span style={{fontSize:20}}>{r.icon}</span>
                <div><div style={{fontWeight:500,fontSize:14,color:C.text}}>{r.label}</div><div style={{fontSize:12,color:C.textSec}}>{r.desc}</div></div>
              </div>
            ))}
          </>
        )}
        {step==="login"&&(
          <>
            <button onClick={()=>setStep("choose")} style={{background:"none",border:"none",cursor:"pointer",color:C.teal,fontWeight:500,marginBottom:16,padding:0,fontSize:13}}>← Back</button>
            <p style={{fontSize:14,fontWeight:500,marginBottom:16,color:C.text}}>Login as {roles.find(r=>r.key===role)?.label}</p>
            {[["Email","email","your@email.com","email"],["Password","password","••••••••","password"]].map(([l,k,ph,type])=>(
              <div key={k} style={{marginBottom:14}}>
                <label style={{fontSize:12,color:C.textSec,display:"block",marginBottom:4}}>{l}</label>
                <input type={type} placeholder={ph} value={k==="email"?email:pass} onChange={e=>k==="email"?setEmail(e.target.value):setPass(e.target.value)} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"0.5px solid #ccc",fontSize:14,boxSizing:"border-box"}}/>
              </div>
            ))}
            <div style={{marginTop:18}}><Btn full onClick={()=>onLogin({name:role==="homeowner"?"Homeowner":role==="contractor"?"Contractor":"Admin",role})}>Log in</Btn></div>
          </>
        )}
      </div>
    </div>
  );
}

function Landing({onShowLogin,onShowCalc,onShowSolar}){
  const steps=[
    {n:"01",t:"Submit your request",d:"Fill in your project details in minutes. Free, always."},
    {n:"02",t:"Get AI estimate",d:"Instantly see a realistic budget range before anyone quotes."},
    {n:"03",t:"Contractors compete",d:"Verified contractors submit blind quotes — they fight for your job."},
    {n:"04",t:"We shortlist, you decide",d:"We filter the noise and hand you only the best options."},
  ];
  return(
    <div>
      <div style={{background:C.teal,borderRadius:14,padding:"36px 24px 32px",marginBottom:20,textAlign:"center"}}>
        <div style={{background:"rgba(255,255,255,0.22)",display:"inline-block",padding:"4px 16px",borderRadius:20,fontSize:12,fontWeight:500,color:"#fff",marginBottom:16}}>100% transparent · No hidden cost ever</div>
        <h1 style={{fontSize:26,fontWeight:500,color:"#fff",margin:"0 0 12px",lineHeight:1.3}}>Transparent quotes for every home service</h1>
        <p style={{fontSize:14,color:"rgba(255,255,255,0.88)",margin:"0 0 12px",lineHeight:1.7}}>Renovation, repair, solar and more — all on one platform. Open bidding. Transparent pricing. What providers quote is exactly what you see.</p>
        <div style={{background:"rgba(255,255,255,0.15)",borderRadius:10,padding:"10px 16px",marginBottom:22,display:"inline-block"}}>
          <span style={{color:"#fff",fontSize:13,fontWeight:500}}>No fair quote? You pay nothing. We filter out the noise, shortlist only the best, and let you decide — stress-free.</span>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={onShowCalc} style={{background:"#fff",color:C.teal,border:"none",borderRadius:8,padding:"12px 22px",fontWeight:500,fontSize:14,cursor:"pointer"}}>Renovation calculator</button>
          <button onClick={onShowSolar} style={{background:"rgba(255,255,255,0.15)",color:"#fff",border:"1.5px solid rgba(255,255,255,0.6)",borderRadius:8,padding:"12px 22px",fontWeight:500,fontSize:14,cursor:"pointer"}}>☀️ Solar estimate</button>
        </div>
      </div>

      <div style={{background:C.coralLight,border:`1px solid ${C.coral}`,borderRadius:12,padding:"14px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:14}}>
        <span style={{fontSize:24,flexShrink:0}}>⚡</span>
        <div>
          <p style={{fontWeight:500,fontSize:14,color:C.coral,margin:"0 0 2px"}}>Urgent repair? We move fast.</p>
          <p style={{fontSize:12,color:"#7a2e15",margin:0,lineHeight:1.5}}>Leaking pipe, electrical fault, roof leak — flag it urgent and get contractor quotes within hours, not days.</p>
        </div>
      </div>

      <p style={{fontWeight:500,fontSize:15,marginBottom:14,color:C.text}}>Our services</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
        {CATEGORIES.map(cat=>(
          <div key={cat.id} onClick={cat.soon?undefined:cat.id==="solar"?onShowSolar:onShowCalc} style={{border:`0.5px solid ${cat.soon?"var(--color-border-tertiary)":cat.color}`,borderRadius:12,padding:"14px",cursor:cat.soon?"not-allowed":"pointer",background:cat.soon?"var(--color-background-secondary)":cat.light,opacity:cat.soon?0.6:1,position:"relative"}}>
            <div style={{fontSize:22,marginBottom:6}}>{cat.icon}</div>
            <div style={{fontWeight:500,fontSize:13,color:cat.soon?C.textSec:cat.color,marginBottom:3}}>{cat.label}</div>
            <div style={{fontSize:11,color:C.textSec,lineHeight:1.5}}>{cat.desc}</div>
            {cat.soon&&<span style={{position:"absolute",top:8,right:8,background:"#e5e5e5",color:"#888",fontSize:10,padding:"2px 7px",borderRadius:20,fontWeight:500}}>Coming soon</span>}
            {cat.urgent&&<span style={{position:"absolute",top:8,right:8,background:C.coralLight,color:C.coral,fontSize:10,padding:"2px 7px",borderRadius:20,fontWeight:500}}>Urgent ⚡</span>}
          </div>
        ))}
      </div>

      <p style={{fontWeight:500,fontSize:15,marginBottom:14,color:C.text}}>How it works</p>
      {steps.map(s=>(
        <div key={s.n} style={{display:"flex",gap:14,marginBottom:14,alignItems:"flex-start"}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:C.tealLight,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:500,fontSize:13,color:C.tealDeep,flexShrink:0}}>{s.n}</div>
          <div style={{paddingTop:4}}>
            <p style={{fontWeight:500,fontSize:14,color:C.text,margin:"0 0 3px"}}>{s.t}</p>
            <p style={{fontSize:12,color:C.textSec,margin:0}}>{s.d}</p>
          </div>
        </div>
      ))}

      <Card style={{background:C.tealLight,border:`0.5px solid ${C.teal}`,marginTop:20,marginBottom:8}}>
        <p style={{fontWeight:500,fontSize:14,color:C.tealDeep,margin:"0 0 10px"}}>Our promise to you</p>
        {["Open bidding — service providers see no one else's price","No markup from us — contractors quote their best price openly, and you decide what's worth it.","AI estimate before bidding opens — know if a quote is fair","Admin-shortlisted quotes only — we filter out the noise for you"].map(t=>(
          <div key={t} style={{display:"flex",gap:8,marginBottom:7,alignItems:"flex-start"}}>
            <div style={{width:16,height:16,borderRadius:"50%",background:C.teal,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
              <span style={{color:"#fff",fontSize:9,fontWeight:500}}>✓</span>
            </div>
            <span style={{fontSize:13,color:C.tealDeep,lineHeight:1.5}}>{t}</span>
          </div>
        ))}
      </Card>

      <div style={{textAlign:"center",padding:"20px 0 8px"}}>
        <p style={{fontSize:13,color:C.textSec,marginBottom:14}}>Ready to get fair, transparent quotes?</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <Btn onClick={onShowCalc}>Estimate my renovation cost</Btn>
          <Btn variant="outline" onClick={onShowLogin}>Submit a request</Btn>
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const [user,setUser]=useState(null);
  const [showLogin,setShowLogin]=useState(false);
  const [page,setPage]=useState("home");

  const handleLogin=u=>{setUser(u);setShowLogin(false);setPage("dashboard");};
  const handleLogout=()=>{setUser(null);setPage("home");};

  const Nav=()=>(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:"0.5px solid var(--color-border-tertiary)",marginBottom:20}}>
      <span onClick={()=>setPage("home")} style={{fontWeight:500,fontSize:17,color:C.teal,cursor:"pointer"}}>Tauke Reno</span>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {user?(
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:C.tealLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:500,color:C.tealDeep}}>{user.name[0]}</div>
            <button onClick={handleLogout} style={{background:"none",border:"0.5px solid #ddd",borderRadius:8,padding:"5px 12px",fontSize:12,cursor:"pointer",color:C.textSec}}>Log out</button>
          </div>
        ):(
          <button onClick={()=>setShowLogin(true)} style={{background:C.teal,color:"#fff",border:"none",borderRadius:8,padding:"8px 16px",fontWeight:500,fontSize:13,cursor:"pointer"}}>Log in</button>
        )}
      </div>
    </div>
  );

  if(showLogin) return(
    <div style={{maxWidth:520,margin:"0 auto"}}>
      <Nav/>
      <div style={{padding:"0 16px 24px"}}><LoginModal onLogin={handleLogin} onClose={()=>setShowLogin(false)}/></div>
    </div>
  );

  return(
    <div style={{maxWidth:520,margin:"0 auto"}}>
      <Nav/>
      <div style={{padding:"0 16px 32px"}}>
        {page==="home"&&<Landing onShowLogin={()=>setShowLogin(true)} onShowCalc={()=>setPage("calc")} onShowSolar={()=>setPage("solar")}/>}
        {page==="calc"&&<RenoCalculator onBack={()=>setPage("home")} isRepair={false}/>}
        {page==="solar"&&<SolarCalculator onBack={()=>setPage("home")}/>}
        {page==="dashboard"&&user?.role==="homeowner"&&(
          <div>
            <p style={{fontSize:15,fontWeight:500,color:C.text,margin:"0 0 2px"}}>Welcome back</p>
            <p style={{fontSize:13,color:C.textSec,margin:"0 0 20px"}}>Track your requests here</p>
            <div style={{background:C.tealLight,border:`0.5px solid ${C.teal}`,borderRadius:10,padding:"12px 16px",marginBottom:20,fontSize:13,color:C.tealDeep,lineHeight:1.6}}>No markup from us — contractors quote their best price openly, and you decide what's worth it.</div>
            <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
              <Btn small onClick={()=>setPage("calc")}>+ Renovation request</Btn>
              <Btn small variant="solar" onClick={()=>setPage("solar")}>☀️ Solar request</Btn>
            </div>
            <div style={{background:"var(--color-background-secondary)",borderRadius:10,padding:"24px",textAlign:"center"}}>
              <p style={{color:C.textSec,fontSize:13,margin:"0 0 14px"}}>No active requests. Submit your first one — it's free.</p>
            </div>
          </div>
        )}
        {page==="dashboard"&&user?.role==="contractor"&&(
          <div>
            <p style={{fontSize:15,fontWeight:500,color:C.text,margin:"0 0 16px"}}>Contractor dashboard</p>
            <div style={{background:C.amberLight,borderRadius:10,padding:"12px 14px",marginBottom:16,fontSize:13,color:C.amber,lineHeight:1.5}}>Blind bidding — your quote is private. Participation fee = 0.5% of AI estimate per job.</div>
            <div style={{background:"var(--color-background-secondary)",borderRadius:10,padding:"24px",textAlign:"center"}}>
              <p style={{color:C.textSec,fontSize:13,margin:0}}>Open jobs will appear here once homeowners submit and confirm their requests.</p>
            </div>
          </div>
        )}
        {page==="dashboard"&&user?.role==="estimator"&&(
          <div>
            <p style={{fontSize:15,fontWeight:500,color:C.text,margin:"0 0 16px"}}>Estimator dashboard</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
              {[["Total projects","0"],["Open bidding","0"],["Total quotes","0"]].map(([l,v])=>(
                <div key={l} style={{background:"var(--color-background-secondary)",borderRadius:10,padding:"12px"}}>
                  <div style={{fontSize:11,color:C.textSec,marginBottom:4}}>{l}</div>
                  <div style={{fontSize:20,fontWeight:500,color:C.teal}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{background:"var(--color-background-secondary)",borderRadius:10,padding:"24px",textAlign:"center"}}>
              <p style={{color:C.textSec,fontSize:13,margin:0}}>Projects will appear here as requests come in.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
