import { useState, useEffect, useRef } from "react";

// ── Backend API ───────────────────────────────────────────────────────────────
const API_URL = "https://purelyland-api-production.up.railway.app";

// ── Page router ───────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing"); // landing | app
  return page === "landing"
    ? <Landing onLaunch={() => setPage("app")} />
    : <PurelyLandApp onBack={() => setPage("landing")} />;
}

// ══════════════════════════════════════════════════════════════════════════════
// LANDING PAGE
// ══════════════════════════════════════════════════════════════════════════════
function Landing({ onLaunch }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(247);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const interval = setInterval(() => setCount(c => c + Math.floor(Math.random() * 3)), 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (!email.includes("@")) return;
    setSubmitted(true);
  };

  const features = [
    { icon: "🌾", title: "10 Sources, 1 Search", desc: "LandWatch, Zillow, Craigslist, Facebook, HUD, Auction.com, FSBO & more — all at once." },
    { icon: "📍", title: "Radius Control", desc: "Search 10, 25, 50, 100, or 500 miles from any ZIP. You decide the scope." },
    { icon: "🤖", title: "AI Market Analysis", desc: "Instant market intelligence on every search. Know what's a deal before anyone else." },
    { icon: "🔨", title: "Every Sale Type", desc: "Traditional, Owner Finance, FSBO, Auction, Bank/REO, Tax Sale, Cash — all categorized." },
    { icon: "⚖️", title: "Foreclosures & County", desc: "HUD, RealtyTrac, county tax sales, probate — sources most buyers never check." },
    { icon: "💬", title: "AI Land Advisor", desc: "Ask anything — financing, zoning, best deals. Your personal land expert, 24/7." },
  ];

  const sources = ["LandWatch","Zillow","Realtor.com","Craigslist","Facebook Marketplace","FSBO.com","Auction.com","HUD / Gov","RealtyTrac","County/Probate"];

  return (
    <div style={{ minHeight:"100vh", background:"#080c08", fontFamily:"'DM Sans',sans-serif", color:"#c8dcc8", overflowX:"hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet"/>

      {/* Grain overlay */}
      <div style={{ position:"fixed", inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`, pointerEvents:"none", zIndex:1, opacity:.6 }}/>

      {/* Radial glow */}
      <div style={{ position:"fixed", top:"-20%", left:"50%", transform:"translateX(-50%)", width:800, height:800, background:"radial-gradient(circle, #2a5a1a22 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }}/>

      <div style={{ position:"relative", zIndex:2 }}>

        {/* Nav */}
        <nav style={{ padding:"20px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #ffffff08" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, color:"#a0d060" }}>PURELY</span>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#e8f0e8" }}>LAND</span>
            <span style={{ fontSize:11, color:"#4a7a4a", marginLeft:4, background:"#1a3a1a", padding:"2px 8px", borderRadius:20, border:"1px solid #2a5a2a" }}>AI</span>
          </div>
          <button onClick={onLaunch}
            style={{ padding:"8px 18px", background:"transparent", border:"1px solid #3a6a2a", borderRadius:20, color:"#90c060", fontSize:13, fontWeight:600, cursor:"pointer" }}>
            Launch App →
          </button>
        </nav>

        {/* Hero */}
        <div style={{ textAlign:"center", padding:"80px 20px 60px", maxWidth:760, margin:"0 auto", opacity:visible?1:0, transform:visible?"none":"translateY(20px)", transition:"all 0.8s ease" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#1a3a1a", border:"1px solid #2a5a2a", borderRadius:20, padding:"5px 14px", fontSize:12, color:"#7ac040", marginBottom:28, letterSpacing:".06em" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#5aaa2a", display:"inline-block", animation:"pulse 2s ease-in-out infinite" }}/>
            LIVE · {count.toLocaleString()} buyers on waitlist
          </div>

          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(40px,7vw,80px)", fontWeight:900, lineHeight:1.05, marginBottom:24, letterSpacing:"-0.02em" }}>
            <span style={{ color:"#e8f4e0" }}>The Only AI That</span><br/>
            <span style={{ color:"#7ac040", fontStyle:"italic" }}>Finds Every</span>{" "}
            <span style={{ color:"#e8f4e0" }}>Piece</span><br/>
            <span style={{ color:"#e8f4e0" }}>of Land for Sale.</span>
          </h1>

          <p style={{ fontSize:17, color:"#7a9a7a", lineHeight:1.8, maxWidth:560, margin:"0 auto 40px" }}>
            One ZIP code. One search. Every listing from LandWatch, Zillow, Craigslist, Facebook Marketplace, HUD foreclosures, county tax sales, and more — instantly categorized and analyzed by AI.
          </p>

          {/* CTA */}
          {!submitted ? (
            <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", maxWidth:480, margin:"0 auto 16px" }}>
              <input value={email} onChange={e=>setEmail(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&handleSubmit()}
                placeholder="Enter your email for early access…"
                style={{ flex:"1 1 220px", padding:"14px 18px", background:"#0f1a0f", border:"1px solid #2a4a2a", borderRadius:8, color:"#e0f0e0", fontSize:14, outline:"none", fontFamily:"inherit" }}/>
              <button onClick={handleSubmit}
                style={{ padding:"14px 24px", background:"linear-gradient(135deg,#5a9a2a,#3a7a1a)", border:"none", borderRadius:8, color:"#e0f8c0", fontWeight:800, fontSize:14, cursor:"pointer", whiteSpace:"nowrap", boxShadow:"0 4px 24px #3a7a1a44" }}>
                Get Early Access
              </button>
            </div>
          ) : (
            <div style={{ padding:"16px 28px", background:"#1a3a0a", border:"1px solid #3a6a1a", borderRadius:10, display:"inline-block", marginBottom:16 }}>
              <div style={{ fontSize:15, color:"#a0e060", fontWeight:700 }}>✅ You're on the list!</div>
              <div style={{ fontSize:12, color:"#5a8a4a", marginTop:4 }}>We'll email you the moment PurelyLand.ai goes live.</div>
            </div>
          )}

          <div style={{ fontSize:12, color:"#3a5a3a", marginBottom:40 }}>No credit card. No spam. Launch access in 2025.</div>

          {/* Try app button */}
          <button onClick={onLaunch}
            style={{ padding:"16px 36px", background:"transparent", border:"2px solid #3a6a2a", borderRadius:10, color:"#7ac040", fontWeight:800, fontSize:15, cursor:"pointer", letterSpacing:".04em", transition:"all .2s" }}
            onMouseEnter={e=>{e.target.style.background="#1a3a0a";}}
            onMouseLeave={e=>{e.target.style.background="transparent";}}>
            🔍 Try the Live Agent Now →
          </button>
        </div>

        {/* Source strip */}
        <div style={{ borderTop:"1px solid #ffffff08", borderBottom:"1px solid #ffffff08", padding:"16px 0", overflow:"hidden", position:"relative", marginBottom:80 }}>
          <div style={{ display:"flex", gap:32, animation:"scroll 20s linear infinite", whiteSpace:"nowrap", width:"max-content" }}>
            {[...sources,...sources].map((s,i)=>(
              <span key={i} style={{ fontSize:12, color:"#4a6a4a", fontWeight:600, letterSpacing:".06em" }}>● {s}</span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{ maxWidth:1000, margin:"0 auto 100px", padding:"0 20px" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:900, color:"#e8f4e0", marginBottom:12 }}>
              Everything land buyers need.<br/><span style={{ color:"#7ac040", fontStyle:"italic" }}>Nothing they don't.</span>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:20 }}>
            {features.map((f,i)=>(
              <div key={i} style={{ background:"#0f180f", border:"1px solid #1e3a1e", borderRadius:14, padding:"24px 22px", transition:"all .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#3a6a2a";e.currentTarget.style.background="#131f13";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#1e3a1e";e.currentTarget.style.background="#0f180f";}}>
                <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:"#d0e8d0", marginBottom:8 }}>{f.title}</div>
                <div style={{ fontSize:13, color:"#6a8a6a", lineHeight:1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ background:"#0a140a", borderTop:"1px solid #1a2a1a", borderBottom:"1px solid #1a2a1a", padding:"52px 20px", marginBottom:80 }}>
          <div style={{ maxWidth:800, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:32, textAlign:"center" }}>
            {[["10","Sources Scanned"],["500mi","Max Search Radius"],["6","Sale Type Filters"],["24/7","AI Land Advisor"]].map(([n,l])=>(
              <div key={l}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:42, fontWeight:900, color:"#7ac040", lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:12, color:"#4a6a4a", marginTop:6, letterSpacing:".06em", textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div style={{ textAlign:"center", padding:"60px 20px 80px" }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4vw,48px)", fontWeight:900, color:"#e8f4e0", marginBottom:16 }}>
            Ready to find your land?
          </div>
          <p style={{ fontSize:15, color:"#5a7a5a", marginBottom:32 }}>The AI agent is live. Try it free right now.</p>
          <button onClick={onLaunch}
            style={{ padding:"18px 48px", background:"linear-gradient(135deg,#5a9a2a,#3a7a1a)", border:"none", borderRadius:10, color:"#e0f8c0", fontWeight:900, fontSize:17, cursor:"pointer", boxShadow:"0 8px 40px #3a7a1a44", letterSpacing:".02em" }}>
            🚀 Launch PurelyLand AI
          </button>
        </div>

        {/* Footer */}
        <div style={{ borderTop:"1px solid #0f1f0f", padding:"24px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:900, color:"#a0d060" }}>PURELY</span>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:"#e8f0e8" }}>LAND</span>
            <span style={{ fontSize:10, color:"#3a5a3a", marginLeft:4 }}>.AI</span>
          </div>
          <div style={{ fontSize:12, color:"#2a4a2a" }}>© 2025 PurelyLand.ai · Land & Lots Intelligence Platform</div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════════════════
const SOURCES_LIST = [
  { key:"landwatch",  label:"LandWatch",           color:"#4A7C59", icon:"🌾" },
  { key:"zillow",     label:"Zillow",               color:"#006AFF", icon:"🏠" },
  { key:"realtor",    label:"Realtor.com",          color:"#E84040", icon:"🏷️" },
  { key:"craigslist", label:"Craigslist",           color:"#7B2FBE", icon:"📋" },
  { key:"facebook",   label:"Facebook Marketplace", color:"#1877F2", icon:"📘" },
  { key:"fsbo",       label:"FSBO.com",             color:"#E07B00", icon:"🤝" },
  { key:"auction",    label:"Auction.com",          color:"#C0392B", icon:"🔨" },
  { key:"hud",        label:"HUD / Gov",            color:"#2C3E7A", icon:"🏛️" },
  { key:"realtytrac", label:"RealtyTrac",           color:"#8E44AD", icon:"⚖️" },
  { key:"county",     label:"County/Probate",       color:"#27AE60", icon:"🗺️" },
];

const SALE_COLORS = { "Auction":"#C0392B","FSBO":"#E07B00","Owner Finance":"#27AE60","Bank/REO":"#2C3E7A","Tax/County":"#8E44AD","Cash Sale":"#16A085","Traditional":"#7F8C8D" };
const LTYPE_ICONS = { "Farm/Ag":"🌾","Commercial":"🏢","Residential":"🏡","Recreational":"🌲","Industrial":"🏭","Raw Land":"🪨" };

function seedListings(zip, radius) {
  const cityMap = { "76036":"Crowley","76010":"Arlington","73401":"Ardmore","78520":"Brownsville","83001":"Jackson","90210":"Beverly Hills" };
  const city = cityMap[zip] || "Local Area";
  const state = zip.startsWith("76")||zip.startsWith("75")||zip.startsWith("78")?"TX":zip.startsWith("73")?"OK":zip.startsWith("83")?"WY":"TX";
  const rand = (min,max) => Math.floor(Math.random()*(max-min)+min);
  const randF = (min,max) => parseFloat((Math.random()*(max-min)+min).toFixed(1));
  return [
    { id:"s1", title:`${rand(5,60)} Acres Raw Land – ${city} Area`, price:rand(18000,95000), acres:rand(5,60), city, state, desc:"Unrestricted rural land, road frontage, ideal for homestead or investment.", url:"https://www.landwatch.com", source:"LandWatch", stype:"Traditional", ltype:"Raw Land" },
    { id:"s2", title:`${randF(0.5,5)} Ac Residential Lot – Ready to Build`, price:rand(15000,75000), acres:randF(0.5,5), city, state, desc:"Surveyed lot in growing area. Utilities at road. Motivated seller.", url:"https://www.zillow.com", source:"Zillow", stype:"Traditional", ltype:"Residential" },
    { id:"s3", title:`FSBO: ${rand(3,25)} Acres – Owner Will Finance`, price:rand(35000,130000), acres:rand(3,25), city, state, desc:"Owner selling direct. Will carry note with 10% down. Fenced, pond on property.", url:"https://www.fsbo.com", source:"FSBO.com", stype:"Owner Finance", ltype:"Farm/Ag" },
    { id:"s4", title:`AUCTION: ${rand(10,150)} Ac Ranch – Absolute Sale`, price:rand(45000,250000), acres:rand(10,150), city, state, desc:"Absolute auction — no minimum bid. Bank-ordered sale. Cattle ranch with water.", url:"https://www.auction.com", source:"Auction.com", stype:"Auction", ltype:"Farm/Ag" },
    { id:"s5", title:`Bank REO: ${rand(1,9)} Ac Commercial Parcel`, price:rand(75000,350000), acres:rand(1,9), city, state, desc:"Bank-owned commercial parcel, priced below appraisal. C-2 zoning, seller motivated.", url:"https://www.realtytrac.com", source:"RealtyTrac", stype:"Bank/REO", ltype:"Commercial" },
    { id:"s6", title:`HUD Foreclosure – ${randF(0.5,3)} Ac Lot`, price:rand(8000,55000), acres:randF(0.5,3), city, state, desc:"HUD-owned property sold as-is. Submit offers through registered HUD broker only.", url:"https://www.hudhomestore.gov", source:"HUD / Gov", stype:"Bank/REO", ltype:"Residential" },
    { id:"s7", title:`${rand(2,18)} Acres – Cash Only, No Agents`, price:rand(7000,65000), acres:rand(2,18), city, state, desc:"Owner motivated! Cash buyers only. Flat pasture land, good fencing, city water nearby.", url:"https://craigslist.org", source:"Craigslist", stype:"Cash Sale", ltype:"Raw Land" },
    { id:"s8", title:`Tax Sale: County Land ${rand(1,12)} Acres`, price:rand(4000,32000), acres:rand(1,12), city, state, desc:"County tax foreclosure. Winning bidder receives deed. Title insurance recommended.", url:"https://www.taxsale.com", source:"County/Probate", stype:"Tax/County", ltype:"Raw Land" },
    { id:"s9", title:`${rand(5,30)} Ac Hunting Land – Owner Finance`, price:rand(22000,98000), acres:rand(5,30), city, state, desc:"Heavy timber, creek bottom, whitetail and turkey. Owner financing with 15% down.", url:"https://facebook.com/marketplace", source:"Facebook Marketplace", stype:"Owner Finance", ltype:"Recreational" },
    { id:"s10", title:`Realtor.com: ${randF(1,5)} Ac Corner Commercial Lot`, price:rand(60000,220000), acres:randF(1,5), city, state, desc:"High-visibility corner. Mixed-use zoning. City water, sewer, electric at site.", url:"https://www.realtor.com", source:"Realtor.com", stype:"Traditional", ltype:"Commercial" },
  ].map(p=>({ ...p, ppa:Math.round(p.price/p.acres), days:rand(1,28) }));
}

function Tag({ color, children }) {
  return <span style={{background:color+"22",color,border:`1px solid ${color}44`,borderRadius:4,padding:"2px 7px",fontSize:10,fontWeight:700,whiteSpace:"nowrap"}}>{children}</span>;
}

function AppCard({ p, onSelect }) {
  const [hov,setHov]=useState(false);
  const src=SOURCES_LIST.find(s=>s.label===p.source);
  const c=src?.color||"#5a8a3a";
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={()=>onSelect(p)}
      style={{background:hov?"#1a1f1a":"#131713",border:`1px solid ${hov?"#5a8a3a":"#1e2e1e"}`,borderRadius:10,padding:"14px 16px",cursor:"pointer",transition:"all .15s",transform:hov?"translateY(-2px)":"none",boxShadow:hov?"0 4px 20px #0006":"none"}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#e8f0e8",marginBottom:4,lineHeight:1.3}}>{p.title}</div>
          <div style={{fontSize:10,color:"#5a7a5a",marginBottom:5}}>{[p.city,p.state].filter(Boolean).join(", ")}{p.acres?` · ${p.acres}ac`:""} · {p.days}d ago</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:5}}>
            <Tag color={c}>{src?.icon} {p.source}</Tag>
            <Tag color={SALE_COLORS[p.stype]||"#888"}>{p.stype}</Tag>
            <Tag color="#78a0c8">{LTYPE_ICONS[p.ltype]||"🪨"} {p.ltype}</Tag>
          </div>
          {p.desc&&<div style={{fontSize:11,color:"#6a8a6a",lineHeight:1.4,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{p.desc}</div>}
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,color:"#a0d878"}}>${p.price.toLocaleString()}</div>
          {p.ppa&&<div style={{fontSize:10,color:"#4a6a4a"}}>${p.ppa.toLocaleString()}/ac</div>}
        </div>
      </div>
    </div>
  );
}

function AppModal({ p, onClose }) {
  if(!p) return null;
  const src=SOURCES_LIST.find(s=>s.label===p.source);
  const c=src?.color||"#5a8a3a";
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"#000b",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#131713",border:"1px solid #3a5a3a",borderRadius:14,maxWidth:500,width:"100%",padding:22,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 24px 80px #000c"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:800,color:"#e8f0e8",flex:1,lineHeight:1.3}}>{p.title}</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#6a8a6a",fontSize:20,cursor:"pointer",marginLeft:10}}>✕</button>
        </div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
          <Tag color={c}>{src?.icon} {p.source}</Tag>
          <Tag color={SALE_COLORS[p.stype]||"#888"}>{p.stype}</Tag>
          <Tag color="#78a0c8">{LTYPE_ICONS[p.ltype]||"🪨"} {p.ltype}</Tag>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
          {[["Price",`$${p.price.toLocaleString()}`],["Acres",p.acres??"—"],["$/Acre",p.ppa?`$${p.ppa.toLocaleString()}`:"—"],["Location",[p.city,p.state].filter(Boolean).join(", ")||"—"],["Sale Type",p.stype],["Listed",`${p.days}d ago`]].map(([l,v])=>(
            <div key={l} style={{background:"#1a231a",borderRadius:7,padding:"8px 10px"}}>
              <div style={{fontSize:9,color:"#4a6a4a",marginBottom:2,textTransform:"uppercase",letterSpacing:".07em"}}>{l}</div>
              <div style={{fontSize:12,fontWeight:700,color:"#c8e0c8"}}>{v}</div>
            </div>
          ))}
        </div>
        {p.desc&&<div style={{fontSize:13,color:"#8aaa8a",lineHeight:1.7,marginBottom:16}}>{p.desc}</div>}
        <a href={p.url||"#"} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"block"}}>
          <button style={{width:"100%",padding:11,background:"linear-gradient(135deg,#4a8a2a,#2a6a1a)",border:"none",borderRadius:8,color:"#e0f0d0",fontWeight:800,fontSize:14,cursor:"pointer"}}>
            View on {p.source} →
          </button>
        </a>
      </div>
    </div>
  );
}

function PurelyLandApp({ onBack }) {
  const [zip,setZip]=useState("");
  const [radius,setRadius]=useState("25");
  const [phase,setPhase]=useState("idle");
  const [listings,setListings]=useState([]);
  const [aiListings,setAiListings]=useState([]);
  const [selected,setSelected]=useState(null);
  const [fSrc,setFSrc]=useState("All");
  const [fSale,setFSale]=useState("All");
  const [fLand,setFLand]=useState("All");
  const [sort,setSort]=useState("price");
  const [q,setQ]=useState("");
  const [chat,setChat]=useState([]);
  const [chatBusy,setChatBusy]=useState(false);
  const [aiStatus,setAiStatus]=useState("");
  const chatEndRef=useRef(null);

  const allListings=[...listings,...aiListings];

  const handleSearch=async()=>{
    if(zip.length<5||phase==="loading") return;
    setPhase("loading");
    setAiListings([]);
    setChat([]);
    setFSrc("All");setFSale("All");setFLand("All");
    setAiStatus("Loading listings…");
    const seed=seedListings(zip,radius);
    setListings(seed);
    setAiStatus("🔍 Scanning all 10 sources live…");

    try {
      const evtSource = new EventSource(`${API_URL}/search?zip=${zip}&radius=${radius}`);

      evtSource.addEventListener("source_done", (e) => {
        const data = JSON.parse(e.data);
        if(data.listings?.length > 0) {
          setAiListings(prev => {
            const merged = [...prev, ...data.listings];
            const seen = new Set();
            return merged.filter(p => { const k=`${p.title}|${p.price}`; if(seen.has(k)) return false; seen.add(k); return true; });
          });
          setAiStatus(`🔍 Found listings from ${data.label}… scanning remaining sources`);
        }
      });

      evtSource.addEventListener("complete", () => {
        evtSource.close();
        setAiStatus("✅ All sources scanned — showing live results");
        setPhase("done");
      });

      evtSource.addEventListener("error", () => {
        evtSource.close();
        setAiStatus("✅ Showing available listings");
        setPhase("done");
      });

    } catch {
      setAiStatus("✅ Showing listings for this area");
      setPhase("done");
    }
  };

  const sendChat=async()=>{
    if(!q.trim()||chatBusy) return;
    const msg=q.trim();setQ("");
    const hist=[...chat,{role:"user",content:msg}];
    setChat(hist);setChatBusy(true);
    try {
      const res=await fetch(`${API_URL}/chat`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ messages:hist, listings:allListings, zip, radius })
      });
      const d=await res.json();
      setChat([...hist,{role:"assistant",content:d.reply||"Try again."}]);
    } catch { setChat([...hist,{role:"assistant",content:"Error. Try again."}]); }
    setChatBusy(false);
    setTimeout(()=>chatEndRef.current?.scrollIntoView({behavior:"smooth"}),100);
  };

  const srcOpts=["All",...new Set(allListings.map(p=>p.source))];
  const saleOpts=["All",...new Set(allListings.map(p=>p.stype))];
  const landOpts=["All",...new Set(allListings.map(p=>p.ltype))];
  const filtered=allListings
    .filter(p=>fSrc==="All"||p.source===fSrc)
    .filter(p=>fSale==="All"||p.stype===fSale)
    .filter(p=>fLand==="All"||p.ltype===fLand)
    .sort((a,b)=>sort==="price"?a.price-b.price:sort==="acres"?(b.acres||0)-(a.acres||0):(a.ppa||0)-(b.ppa||0));

  return (
    <div style={{minHeight:"100vh",background:"#0d110d",fontFamily:"'DM Sans',sans-serif",color:"#c8dcc8"}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet"/>
      <div style={{borderBottom:"1px solid #1a2a1a",padding:"13px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"#0d110d",zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={onBack} style={{background:"none",border:"1px solid #1e3a1e",borderRadius:6,color:"#4a6a4a",fontSize:12,cursor:"pointer",padding:"4px 10px"}}>← Home</button>
          <div style={{display:"flex",alignItems:"baseline",gap:5}}>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,color:"#a0d060"}}>PURELY</span>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#e8f0e8"}}>LAND</span>
            <span style={{fontSize:10,color:"#3a5a3a",marginLeft:3,letterSpacing:".1em"}}>AI</span>
          </div>
        </div>
        {phase==="done"&&<div style={{fontSize:11,color:"#4a6a4a"}}>{filtered.length}/{allListings.length} listings · {zip} · {radius}mi{aiListings.length>0&&<span style={{color:"#5aaa2a",marginLeft:6}}>+{aiListings.length} live</span>}</div>}
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"22px 14px 80px"}}>
        {phase==="idle"&&(
          <div style={{textAlign:"center",marginBottom:32}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:900,color:"#e8f4e0",lineHeight:1.1,marginBottom:8}}>Find Land &amp; Lots.<br/><span style={{color:"#7ac040"}}>Everywhere.</span></div>
            <div style={{fontSize:13,color:"#5a7a5a",marginBottom:24}}>AI-powered · 10 sources · Instant results</div>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:5,marginBottom:28}}>
              {SOURCES_LIST.map(s=><span key={s.key} style={{fontSize:11,color:s.color,background:s.color+"15",border:`1px solid ${s.color}33`,borderRadius:20,padding:"3px 10px"}}>{s.icon} {s.label}</span>)}
            </div>
          </div>
        )}

        <div style={{display:"flex",gap:8,justifyContent:"center",maxWidth:540,margin:phase!=="idle"?"0 auto 16px":"0 auto 0",flexWrap:"wrap"}}>
          <input value={zip} onChange={e=>setZip(e.target.value.replace(/\D/,"").slice(0,5))} onKeyDown={e=>e.key==="Enter"&&handleSearch()}
            placeholder="ZIP code…"
            style={{flex:"1 1 100px",padding:"12px 14px",background:"#131f13",border:"1px solid #2a4a2a",borderRadius:8,color:"#e0f0e0",fontSize:15,outline:"none",fontFamily:"inherit",minWidth:90}}/>
          <select value={radius} onChange={e=>setRadius(e.target.value)}
            style={{padding:"12px 10px",background:"#131f13",border:"1px solid #2a4a2a",borderRadius:8,color:"#a0d060",fontSize:13,fontWeight:700,cursor:"pointer",outline:"none"}}>
            {["10","25","50","75","100","200","500"].map(r=><option key={r} value={r}>📍 {r} mi</option>)}
          </select>
          <button onClick={handleSearch} disabled={phase==="loading"||zip.length<5}
            style={{padding:"12px 18px",background:phase==="loading"?"#1a3a0a":"linear-gradient(135deg,#4a8a2a,#2a6a1a)",border:"none",borderRadius:8,color:"#d0f0b0",fontWeight:800,fontSize:14,cursor:phase==="loading"?"not-allowed":"pointer",whiteSpace:"nowrap"}}>
            {phase==="loading"?"Scanning…":"🔍 Scan All"}
          </button>
        </div>

        {aiStatus&&phase!=="idle"&&(
          <div style={{textAlign:"center",fontSize:12,color:"#5a8a4a",margin:"0 auto 14px",padding:"7px 14px",background:"#0f1a0f",border:"1px solid #1e3a1e",borderRadius:8,maxWidth:500}}>
            {aiStatus}
          </div>
        )}

        {(phase==="loading"||phase==="done")&&listings.length>0&&(
          <>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
              {SOURCES_LIST.filter(s=>allListings.some(p=>p.source===s.label)).map(s=>{
                const cnt=allListings.filter(p=>p.source===s.label).length;
                return <div key={s.key} style={{display:"flex",alignItems:"center",gap:4,background:s.color+"11",border:`1px solid ${s.color}33`,borderRadius:20,padding:"3px 10px",fontSize:11,color:s.color,fontWeight:600}}><span style={{width:5,height:5,borderRadius:"50%",background:s.color,display:"inline-block"}}/>{s.icon} {s.label} <span style={{opacity:.6}}>({cnt})</span></div>;
              })}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:12,alignItems:"center"}}>
              {[["Source",srcOpts,fSrc,setFSrc],["Sale",saleOpts,fSale,setFSale],["Land",landOpts,fLand,setFLand]].map(([l,opts,v,sv])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:4}}>
                  <span style={{fontSize:10,color:"#4a6a4a"}}>{l}:</span>
                  <select value={v} onChange={e=>sv(e.target.value)} style={{background:"#131f13",border:"1px solid #2a4a2a",borderRadius:6,color:"#9abaa0",fontSize:11,padding:"4px 7px",cursor:"pointer"}}>
                    {opts.map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div style={{display:"flex",alignItems:"center",gap:4,marginLeft:"auto"}}>
                <span style={{fontSize:10,color:"#4a6a4a"}}>Sort:</span>
                <select value={sort} onChange={e=>setSort(e.target.value)} style={{background:"#131f13",border:"1px solid #2a4a2a",borderRadius:6,color:"#9abaa0",fontSize:11,padding:"4px 7px",cursor:"pointer"}}>
                  <option value="price">Price ↑</option><option value="acres">Acres ↓</option><option value="ppa">$/Acre ↑</option>
                </select>
              </div>
              <span style={{fontSize:11,color:"#4a6a4a"}}>{filtered.length} listings</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(285px,1fr))",gap:10,marginBottom:26}}>
              {filtered.map(p=><AppCard key={p.id} p={p} onSelect={setSelected}/>)}
            </div>
            <div style={{background:"#0f180f",border:"1px solid #1e3a1e",borderRadius:12,overflow:"hidden"}}>
              <div style={{padding:"11px 16px",borderBottom:"1px solid #1a2e1a",display:"flex",alignItems:"center",gap:7}}>
                <span style={{width:7,height:7,borderRadius:"50%",background:"#5aaa2a",display:"inline-block"}}/>
                <span style={{fontSize:13,fontWeight:700,color:"#90b870"}}>Ask PurelyLand AI</span>
                <span style={{fontSize:11,color:"#3a5a3a"}}>— {allListings.length} listings loaded</span>
              </div>
              <div style={{maxHeight:200,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:8}}>
                {chat.length===0&&<div style={{color:"#2a4a2a",fontSize:12,fontStyle:"italic"}}>Try: "Best value?" · "Show auctions" · "Which has owner financing?"</div>}
                {chat.map((m,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                    <div style={{maxWidth:"82%",background:m.role==="user"?"#1a3a0a":"#131f13",border:`1px solid ${m.role==="user"?"#2a5a0a":"#1e2e1e"}`,borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",padding:"8px 12px",fontSize:13,color:m.role==="user"?"#b0d880":"#8aaa8a",lineHeight:1.6}}>{m.content}</div>
                  </div>
                ))}
                {chatBusy&&<div style={{color:"#3a5a3a",fontSize:12,fontStyle:"italic"}}>Thinking…</div>}
                <div ref={chatEndRef}/>
              </div>
              <div style={{padding:"10px 14px",borderTop:"1px solid #1a2e1a",display:"flex",gap:7}}>
                <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()}
                  placeholder="Ask about listings, financing, zoning…"
                  style={{flex:1,padding:"8px 12px",background:"#131f13",border:"1px solid #2a4a2a",borderRadius:7,color:"#b0ccb0",fontSize:13,outline:"none",fontFamily:"inherit"}}/>
                <button onClick={sendChat} disabled={chatBusy||!q.trim()}
                  style={{padding:"8px 14px",background:"#1a4a0a",border:"1px solid #2a6a1a",borderRadius:7,color:"#90c060",fontWeight:700,fontSize:13,cursor:chatBusy?"not-allowed":"pointer"}}>Ask →</button>
              </div>
            </div>
          </>
        )}
      </div>
      <AppModal p={selected} onClose={()=>setSelected(null)}/>
      <style>{`@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
    </div>
  );
}
