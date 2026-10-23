const products = [
  {name:"Modern Habesha Dress", designer:"Sample designer profile", category:"Traditional Ethiopian", price:2400, colors:["#9d4b3e","#c9b99c"], tag:"SAMPLE"},
  {name:"Everyday Linen Set", designer:"Sample designer profile", category:"Women's fashion", price:1800, colors:["#a7a58b","#d9cbb5"], tag:"SAMPLE"},
  {name:"Kids Celebration Dress", designer:"Sample designer profile", category:"Children's clothing", price:1250, colors:["#b77b83","#e5c6b0"], tag:"SAMPLE"},
  {name:"Minimal Streetwear Shirt", designer:"Sample designer profile", category:"Men's fashion", price:950, colors:["#62685b","#c4c0b2"], tag:"SAMPLE"},
  {name:"Handmade Shoulder Bag", designer:"Sample designer profile", category:"Accessories", price:700, colors:["#b67d50","#e1d1ba"], tag:"SAMPLE"},
  {name:"Classic Cotton Dress", designer:"Sample designer profile", category:"Women's fashion", price:1450, colors:["#77806a","#cfc7b7"], tag:"SAMPLE"},
  {name:"Traditional Kids Outfit", designer:"Sample designer profile", category:"Children's clothing", price:1100, colors:["#d1b45f","#eee0bd"], tag:"SAMPLE"},
  {name:"Tailored Casual Shirt", designer:"Sample designer profile", category:"Men's fashion", price:1150, colors:["#7c8b91","#d7d9d4"], tag:"SAMPLE"}
];
const grid = document.getElementById("productGrid");
const search = document.getElementById("searchInput");
const filter = document.getElementById("categoryFilter");
function renderProducts(){
  const q = search.value.trim().toLowerCase();
  const cat = filter.value;
  const matches = products.filter(p => (cat === "all" || p.category === cat) && `${p.name} ${p.designer} ${p.category}`.toLowerCase().includes(q));
  grid.innerHTML = "";
  if(!matches.length){grid.innerHTML='<div class="empty-state">No designs found. Try another search or category.</div>';return;}
  matches.forEach((p,i)=>{
    const card=document.createElement("article");card.className="product-card";
    const art=document.createElement("div");art.className="product-art";art.style.setProperty("--fabric",p.colors[0]);
    art.innerHTML='<span class="sample-tag">SAMPLE DESIGN</span>';
    const info=document.createElement("div");info.className="product-info";
    info.innerHTML=`<div class="product-category">${p.category}</div><h3>${p.name}</h3><p>By ${p.designer}</p><div class="product-price">${p.price.toLocaleString("en-US")} ETB</div>`;
    card.append(art,info);grid.append(card);
  });
}
search.addEventListener("input",renderProducts);filter.addEventListener("change",renderProducts);
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("joinButton").addEventListener("click",()=>{
  const name=document.getElementById("designerName").value.trim();
  const contact=document.getElementById("designerContact").value.trim();
  const type=document.getElementById("designerType").value;
  if(!name||!contact){alert("Please enter your name and contact details first.");return;}
  const body=`Hello YEAB Fashion Marketplace! I would like to apply as a designer.\\nName/brand: ${name}\\nContact: ${contact}\\nCategory: ${type}\\nPlease tell me how to join.`;
  const blob=new Blob([body],{type:"text/plain;charset=utf-8"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="yeab-designer-application.txt";a.click();URL.revokeObjectURL(url);
  alert("Your application message was downloaded. Send it to your marketplace contact. This demo does not submit or store applications online.");
});
renderProducts();