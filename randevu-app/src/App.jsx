import { useState, useEffect, useRef } from "react";
import {
  Search, MapPin, Star, Clock, ChevronLeft, ChevronRight,
  Check, Scissors, Stethoscope, Dumbbell, Sparkles, Coffee,
  X, SlidersHorizontal, Navigation, Calendar, User, Home,
  Heart, Bell, LogOut, Plus, Trash2, Edit3, List, CheckCircle,
  AlertCircle, ChevronDown, Phone, Mail, Info
} from "lucide-react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  bg: "#F7F5F2", bgCard: "#FFFFFF",
  ink: "#1A1714", inkMid: "#6B6560", inkLight: "#B5B0AA",
  accent: "#E8521A", accentLight: "#FFF0EB",
  border: "#EEEBE7", map1: "#E8E4DC", map2: "#D4CFC6",
  success: "#2D9B5A", successLight: "#E8F7EE",
  warning: "#D97706", warningLight: "#FEF3C7",
};

// ─── i18n ────────────────────────────────────────────────────────────────────
const T = {
  tr: {
    appName:"Randevu", save:"Kaydet", cancel:"İptal", delete:"Sil",
    edit:"Düzenle", add:"Ekle", confirm:"Onayla", back:"Geri",
    continue:"Devam", close:"Kapat",
    location:"İstanbul, Türkiye", greeting:"Merhaba",
    searchPlaceholder:"Berber, klinik, salon ara...",
    featured:"Öne Çıkanlar", featuredSub:"En çok tercih edilenler",
    nearby:"Yakınınızdakiler",
    all:"Tümü", barber:"Berber", clinic:"Klinik", gym:"Spor", beauty:"Güzellik", cafe:"Kafe",
    bookAppointment:"Randevu Al", duration:"Süre", price:"Fiyat",
    service:"Hizmet", services:"Hizmetler", team:"Ekibimiz",
    reviews:"değerlendirme", open:"Şu an açık", closed:"Kapalı", min:"dk",
    selectService:"Hizmet Seç", selectStaff:"Uzman Seç", selectTime:"Zaman Seç",
    anyStaff:"Uygun Uzman", anyStaffSub:"İlk müsait uzmana ata",
    notAvailableToday:"Bugün müsait değil", step1:"Hizmet", step2:"Uzman", step3:"Zaman",
    continueWith:"ile devam et", selectOne:"Bir hizmet seçin", selectStaffBtn:"Uzman seçin",
    thisWeek:"Bu hafta", weekOffset:(n)=>n>0?`+${n} hafta`:`${n} hafta`,
    selectedTime:"Seçilen zaman", confirmBtn:"Onayla →",
    appointmentBooked:"Randevu Alındı!", availableStaff:"Uygun uzman",
    home:"Ana Sayfa", newAppointment:"Yeni Randevu",
    navHome:"Ana Sayfa", navExplore:"Keşfet", navBookings:"Randevularım", navProfile:"Profil",
    days:["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"],
    months:["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],
    loginTitle:"Hoş Geldiniz", loginSub:"Mail adresinizle giriş yapın",
    emailLabel:"E-posta", passwordLabel:"Şifre", loginBtn:"Giriş Yap",
    logoutBtn:"Çıkış Yap", noAccount:"Hesabınız yok mu?", registerLink:"Kayıt Ol",
    haveAccount:"Zaten hesabınız var mı?", loginLink:"Giriş Yap",
    registerTitle:"Hesap Oluştur", registerSub:"Mail adresinizle kayıt olun",
    nameLabel:"Ad Soyad", userTypeLabel:"Hesap Türü",
    userTypeCustomer:"Müşteri (Randevu almak istiyorum)",
    userTypeBusiness:"İşletme (Hizmet vermek istiyorum)",
    registerBtn:"Kayıt Ol",
    myBookings:"Randevularım", noBookings:"Henüz randevunuz yok",
    upcoming:"Yaklaşan", past:"Geçmiş",
    rateService:"Hizmeti Puanla", yourRating:"Puanınız",
    submitRating:"Gönder", thankYouRating:"Teşekkürler!", rated:"Puanlandı",
    businessDashboard:"İşletme Paneli",
    businessAppointments:"Randevular", businessPriceList:"Fiyat Listesi",
    businessAvailability:"Uygunluk", businessStaff:"Ekip",
    addService:"Hizmet Ekle", serviceName:"Hizmet Adı",
    serviceDuration:"Süre (dk)", servicePrice:"Fiyat (₺)",
    totalToday:"Bugün", totalWeek:"Bu Hafta",
    confirmedLabel:"Onaylı", pendingLabel:"Bekleyen",
    approve:"Onayla", reject:"Reddet",
    availabilityTitle:"Uygunluk Ayarları",
    workDays:"Çalışma Günleri", workHours:"Çalışma Saatleri",
    slotDuration:"Randevu Süresi", staffUnavailable:"Müsait Değil Günler",
    addUnavailable:"Gün Ekle", noUnavailable:"Tüm günler müsait",
    searchPlaceholderFull:"Yer, hizmet veya kategori...",
    resultsFound:(n)=>`${n} sonuç bulundu`,
    noResults:(q)=>`"${q}" için sonuç bulunamadı`,
    profileTitle:"Profil", language:"Dil", member:"Üye",
    rateTitle:"Hizmet Değerlendirmesi", rateSub:"Aldığınız hizmeti puanlayın",
    shopDescription:"İşletme Hakkında",
    addStaff:"Çalışan Ekle", staffName:"Ad Soyad", staffTitle:"Ünvan",
    editShopInfo:"İşletme Bilgileri",
    phone:"Telefon", about:"Hakkında",
    locationPermission:"Konumunuzu paylaşmak ister misiniz?",
    locating:"Konum alınıyor...",
    nearbyYou:"Size yakın",
    myLocation:"Benim konumum",
  },
  en: {
    appName:"Randevu", save:"Save", cancel:"Cancel", delete:"Delete",
    edit:"Edit", add:"Add", confirm:"Confirm", back:"Back",
    continue:"Continue", close:"Close",
    location:"Istanbul, Turkey", greeting:"Hello",
    searchPlaceholder:"Search barber, clinic, salon...",
    featured:"Featured", featuredSub:"Most preferred",
    nearby:"Nearby",
    all:"All", barber:"Barber", clinic:"Clinic", gym:"Gym", beauty:"Beauty", cafe:"Café",
    bookAppointment:"Book Appointment", duration:"Duration", price:"Price",
    service:"Service", services:"Services", team:"Our Team",
    reviews:"reviews", open:"Open now", closed:"Closed", min:"min",
    selectService:"Select Service", selectStaff:"Select Staff", selectTime:"Select Time",
    anyStaff:"Any Available", anyStaffSub:"Assign to first available",
    notAvailableToday:"Not available today", step1:"Service", step2:"Expert", step3:"Time",
    continueWith:"continue with", selectOne:"Select a service", selectStaffBtn:"Select an expert",
    thisWeek:"This week", weekOffset:(n)=>n>0?`+${n} weeks`:`${n} weeks`,
    selectedTime:"Selected time", confirmBtn:"Confirm →",
    appointmentBooked:"Appointment Booked!", availableStaff:"Available expert",
    home:"Home", newAppointment:"New Appointment",
    navHome:"Home", navExplore:"Explore", navBookings:"My Bookings", navProfile:"Profile",
    days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    loginTitle:"Welcome Back", loginSub:"Sign in with your email",
    emailLabel:"Email", passwordLabel:"Password", loginBtn:"Sign In",
    logoutBtn:"Sign Out", noAccount:"Don't have an account?", registerLink:"Register",
    haveAccount:"Already have an account?", loginLink:"Sign In",
    registerTitle:"Create Account", registerSub:"Sign up with your email",
    nameLabel:"Full Name", userTypeLabel:"Account Type",
    userTypeCustomer:"Customer (I want to book appointments)",
    userTypeBusiness:"Business (I provide services)",
    registerBtn:"Register",
    myBookings:"My Bookings", noBookings:"No appointments yet",
    upcoming:"Upcoming", past:"Past",
    rateService:"Rate Service", yourRating:"Your Rating",
    submitRating:"Submit", thankYouRating:"Thank you!", rated:"Rated",
    businessDashboard:"Business Dashboard",
    businessAppointments:"Appointments", businessPriceList:"Price List",
    businessAvailability:"Availability", businessStaff:"Team",
    addService:"Add Service", serviceName:"Service Name",
    serviceDuration:"Duration (min)", servicePrice:"Price (₺)",
    totalToday:"Today", totalWeek:"This Week",
    confirmedLabel:"Confirmed", pendingLabel:"Pending",
    approve:"Approve", reject:"Reject",
    availabilityTitle:"Availability Settings",
    workDays:"Working Days", workHours:"Working Hours",
    slotDuration:"Slot Duration", staffUnavailable:"Unavailable Days",
    addUnavailable:"Add Day", noUnavailable:"All days available",
    searchPlaceholderFull:"Place, service or category...",
    resultsFound:(n)=>`${n} results found`,
    noResults:(q)=>`No results for "${q}"`,
    profileTitle:"Profile", language:"Language", member:"Member",
    rateTitle:"Rate Service", rateSub:"Rate the service you received",
    shopDescription:"About",
    addStaff:"Add Staff", staffName:"Full Name", staffTitle:"Title",
    editShopInfo:"Business Info",
    phone:"Phone", about:"About",
    locationPermission:"Share your location?",
    locating:"Getting location...",
    nearbyYou:"Near you",
    myLocation:"My location",
  }
};

// ─── TIME ────────────────────────────────────────────────────────────────────
function formatTime(h, m, lang) {
  const mm = String(m).padStart(2,"0");
  if (lang==="en") {
    const ap = h<12?"AM":"PM"; const hh=h%12===0?12:h%12;
    return `${hh}:${mm} ${ap}`;
  }
  return `${String(h).padStart(2,"0")}:${mm}`;
}
function genSlots(min, lang) {
  const s=[]; let h=9,m=0;
  while(h<18){ s.push(formatTime(h,m,lang)); m+=min; if(m>=60){h++;m-=60;} }
  return s;
}
function weekDates(off) {
  const t=new Date(), sw=new Date(t);
  sw.setDate(t.getDate()-t.getDay()+off*7);
  return Array.from({length:7},(_,i)=>{ const d=new Date(sw); d.setDate(sw.getDate()+i); return d; });
}
function dateKey(d) { return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; }

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const CATS = ["all","barber","clinic","gym","beauty","cafe"];
const CAT_ICONS = { all:Sparkles, barber:Scissors, clinic:Stethoscope, gym:Dumbbell, beauty:Sparkles, cafe:Coffee };

const SHOPS_INIT = [
  {
    id:1, cat:"barber", name:"Maestro Kuaför", rating:4.9, reviews:312,
    address:"Bağcılar, İstanbul", lat:41.0410, lng:28.8553,
    distance:"0.3 km", wait:{tr:"Hemen müsait",en:"Available now"},
    slotMin:30, price:"₺150–300", open:true, featured:true,
    tag:{tr:"En popüler",en:"Most popular"},
    phone:"+90 212 000 0001",
    description:{tr:"İstanbul'un en köklü berberlerinden biri. 20 yıllık deneyim.",en:"One of Istanbul's most established barbers. 20 years of experience."},
    x:42, y:38,
    services:[
      {id:"s1",name:{tr:"Saç Kesimi",en:"Haircut"},duration:30,price:150},
      {id:"s2",name:{tr:"Sakal Düzeltme",en:"Beard Trim"},duration:20,price:100},
      {id:"s3",name:{tr:"Saç + Sakal",en:"Hair + Beard"},duration:50,price:230},
      {id:"s4",name:{tr:"Fön & Şekil",en:"Blow Dry & Style"},duration:25,price:120},
    ],
    staff:[
      {id:101,name:"Mehmet Usta",title:{tr:"Baş Berber",en:"Head Barber"},rating:5.0,img:"MU",avail:true},
      {id:102,name:"Kemal Bey",title:{tr:"Berber",en:"Barber"},rating:4.8,img:"KB",avail:true},
      {id:103,name:"Selin H.",title:{tr:"Stilist",en:"Stylist"},rating:4.7,img:"SH",avail:false},
    ],
  },
  {
    id:2, cat:"clinic", name:"Sağlık Merkezi Plus", rating:4.8, reviews:540,
    address:"Şişli, İstanbul", lat:41.0602, lng:28.9877,
    distance:"1.1 km", wait:{tr:"Bugün müsait",en:"Available today"},
    slotMin:15, price:"₺200–600", open:true, featured:true,
    tag:{tr:"Hızlı randevu",en:"Quick booking"},
    phone:"+90 212 000 0002",
    description:{tr:"Modern tıp ekipmanları ile poliklinik hizmetleri.",en:"Polyclinic services with modern medical equipment."},
    x:62, y:28,
    services:[
      {id:"s5",name:{tr:"Genel Muayene",en:"General Check-up"},duration:15,price:250},
      {id:"s6",name:{tr:"Dermatoloji",en:"Dermatology"},duration:30,price:400},
      {id:"s7",name:{tr:"Beslenme Danışmanlığı",en:"Nutrition Consulting"},duration:45,price:350},
    ],
    staff:[
      {id:201,name:"Dr. Ayşe Kaya",title:{tr:"Pratisyen",en:"GP"},rating:4.9,img:"AK",avail:true},
      {id:202,name:"Dr. Murat Demir",title:{tr:"Dermatolog",en:"Dermatologist"},rating:4.8,img:"MD",avail:true},
    ],
  },
  {
    id:3, cat:"gym", name:"FitZone Spor Merkezi", rating:4.6, reviews:188,
    address:"Kadıköy, İstanbul", lat:40.9911, lng:29.0300,
    distance:"2.4 km", wait:{tr:"Yarın müsait",en:"Available tomorrow"},
    slotMin:60, price:"₺100–250", open:true, featured:false,
    tag:null, phone:"+90 216 000 0003",
    description:{tr:"Profesyonel fitness ekipmanları ve uzman kadromuzla hizmetinizdeyiz.",en:"At your service with professional fitness equipment and expert staff."},
    x:25, y:58,
    services:[
      {id:"s8",name:{tr:"PT Seansı",en:"PT Session"},duration:60,price:200},
      {id:"s9",name:{tr:"Grup Dersi",en:"Group Class"},duration:45,price:100},
      {id:"s10",name:{tr:"Beslenme Planı",en:"Nutrition Plan"},duration:30,price:150},
    ],
    staff:[
      {id:301,name:"Ali Koç",title:{tr:"Personal Trainer",en:"Personal Trainer"},rating:4.7,img:"AK",avail:true},
      {id:302,name:"Zeynep T.",title:{tr:"Yoga Eğitmeni",en:"Yoga Instructor"},rating:4.8,img:"ZT",avail:true},
    ],
  },
  {
    id:4, cat:"beauty", name:"Glam Studio", rating:4.7, reviews:225,
    address:"Beşiktaş, İstanbul", lat:41.0422, lng:29.0083,
    distance:"1.8 km", wait:{tr:"Hemen müsait",en:"Available now"},
    slotMin:45, price:"₺200–800", open:false, featured:false,
    tag:null, phone:"+90 212 000 0004",
    description:{tr:"Güzellik ve bakım alanında İstanbul'un en iyi stüdyolarından.",en:"One of Istanbul's best studios in beauty and care."},
    x:73, y:55,
    services:[
      {id:"s11",name:{tr:"Manikür",en:"Manicure"},duration:45,price:200},
      {id:"s12",name:{tr:"Pedikür",en:"Pedicure"},duration:60,price:250},
      {id:"s13",name:{tr:"Kaş Dizayn",en:"Eyebrow Design"},duration:30,price:150},
    ],
    staff:[
      {id:401,name:"Elif Şahin",title:{tr:"Güzellik Uzmanı",en:"Beauty Expert"},rating:4.9,img:"ES",avail:true},
    ],
  },
];

const BOOKED_INIT = [[0,2],[1,4],[2,1],[3,6],[4,3],[5,0],[6,5],[0,7],[2,9],[4,11]];

// ─── SHARED UI ───────────────────────────────────────────────────────────────
function Avatar({ini,size=44,bg="#E8E4DC",color=C.ink}) {
  return <div style={{width:size,height:size,borderRadius:"50%",background:bg,color,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontSize:size*0.32,fontWeight:700,flexShrink:0,letterSpacing:0.5}}>{ini}</div>;
}
function Pill({children,active,onClick,small}) {
  return <button onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:5,padding:small?"5px 12px":"7px 16px",borderRadius:99,background:active?C.accent:C.bgCard,border:`1.5px solid ${active?C.accent:C.border}`,color:active?"#fff":C.inkMid,fontSize:small?12:13,fontFamily:"'Sora',sans-serif",fontWeight:active?600:400,cursor:"pointer",transition:"all 0.18s ease",whiteSpace:"nowrap",flexShrink:0}}>{children}</button>;
}
function RatingStars({r}) {
  return <span style={{display:"inline-flex",alignItems:"center",gap:3}}><Star size={11} fill={C.accent} color={C.accent}/><span style={{fontSize:12,fontWeight:600,color:C.ink,fontFamily:"'Sora',sans-serif"}}>{r}</span></span>;
}
function BackBtn({onPress}) {
  return <button onClick={onPress} style={{display:"flex",alignItems:"center",justifyContent:"center",width:36,height:36,borderRadius:12,background:C.bgCard,border:`1px solid ${C.border}`,cursor:"pointer",flexShrink:0}}><ChevronLeft size={18} color={C.ink}/></button>;
}
function StarRating({value,onChange,size=28}) {
  const [hover,setHover]=useState(0);
  return <div style={{display:"flex",gap:4}}>{[1,2,3,4,5].map(i=><Star key={i} size={size} fill={i<=(hover||value)?C.accent:"none"} color={i<=(hover||value)?C.accent:C.inkLight} style={{cursor:"pointer",transition:"all 0.12s"}} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(0)} onClick={()=>onChange(i)}/>)}</div>;
}
function shopEmoji(cat){return cat==="barber"?"✂️":cat==="clinic"?"🏥":cat==="gym"?"💪":"✨";}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({onLogin,t,users,setUsers}) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [mode,setMode]=useState("login");
  const [name,setName]=useState("");
  const [userType,setUserType]=useState("customer");
  const [shopName,setShopName]=useState("");
  const [shopCat,setShopCat]=useState("barber");
  const [shopAddress,setShopAddress]=useState("");
  const [shopPhone,setShopPhone]=useState("");
  const [shopDesc,setShopDesc]=useState("");
  const [shopSlot,setShopSlot]=useState(30);
  const [error,setError]=useState("");

  const inp={width:"100%",padding:"12px 14px",border:`1.5px solid ${C.border}`,borderRadius:14,fontSize:14,fontFamily:"'Sora',sans-serif",color:C.ink,background:C.bgCard,outline:"none"};

  const handleSubmit=()=>{
    setError("");
    if(!email){setError("E-posta gerekli");return;}
    if(mode==="login"){
      const found=users.find(u=>u.email===email&&u.password===password);
      if(!found){setError(t.lang==="en"?"Wrong email or password":"E-posta veya şifre hatalı");return;}
      onLogin(found);
    } else {
      if(!name){setError(t.lang==="en"?"Name required":"Ad gerekli");return;}
      if(users.find(u=>u.email===email)){setError(t.lang==="en"?"Email already registered":"Bu e-posta zaten kayıtlı");return;}
      const newUser={email,password,name,type:userType,id:`u${Date.now()}`};
      if(userType==="business"){
        newUser.shopId=`shop_${Date.now()}`;
        newUser.shopData={id:newUser.shopId,cat:shopCat,name:shopName||name,address:shopAddress||"İstanbul",lat:41.0082,lng:28.9784,rating:0,reviews:0,wait:{tr:"Kayıt yeni",en:"New listing"},slotMin:shopSlot,price:"₺-",open:true,featured:false,tag:null,phone:shopPhone,description:{tr:shopDesc,en:shopDesc},x:Math.floor(Math.random()*70)+15,y:Math.floor(Math.random()*60)+15,services:[],staff:[]};
      }
      setUsers(prev=>[...prev,newUser]);
      onLogin(newUser);
    }
  };

  const catOptions=[["barber","✂️ Berber"],["clinic","🏥 Klinik"],["gym","💪 Spor"],["beauty","✨ Güzellik"],["cafe","☕ Kafe"]];

  return (
    <div style={{flex:1,overflowY:"auto",background:C.bg,display:"flex",flexDirection:"column"}}>
      <div style={{height:160,background:`linear-gradient(160deg,#1A1714,#2A2520)`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8}}>
        <div style={{width:56,height:56,borderRadius:18,background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 8px 24px ${C.accent}55`}}><Calendar size={28} color="#fff"/></div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#fff",letterSpacing:0.5}}>Randevu</div>
      </div>
      <div style={{padding:"28px 24px",flex:1}}>
        <div style={{marginBottom:24}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:C.ink,marginBottom:4}}>{mode==="login"?t.loginTitle:t.registerTitle}</div>
          <div style={{fontSize:13,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{mode==="login"?t.loginSub:t.registerSub}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {mode==="register"&&<>
            <div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:6,fontWeight:600}}>{t.nameLabel}</div><input style={inp} value={name} onChange={e=>setName(e.target.value)} placeholder="Ahmet Yılmaz"/></div>
          </>}
          <div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:6,fontWeight:600}}>{t.emailLabel}</div><input style={inp} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="ornek@mail.com"/></div>
          <div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:6,fontWeight:600}}>{t.passwordLabel}</div><input style={inp} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></div>
          {mode==="register"&&<>
            <div>
              <div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:8,fontWeight:600}}>{t.userTypeLabel}</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {["customer","business"].map(type=>(
                  <div key={type} onClick={()=>setUserType(type)} style={{padding:"12px 14px",borderRadius:14,cursor:"pointer",border:`1.5px solid ${userType===type?C.accent:C.border}`,background:userType===type?C.accentLight:C.bgCard,display:"flex",alignItems:"center",gap:10,transition:"all 0.18s"}}>
                    <div style={{width:20,height:20,borderRadius:"50%",flexShrink:0,border:`2px solid ${userType===type?C.accent:C.inkLight}`,background:userType===type?C.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{userType===type&&<Check size={10} color="#fff" strokeWidth={3}/>}</div>
                    <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.ink,fontFamily:"'Sora',sans-serif"}}>{type==="customer"?(t.lang==="en"?"Customer":"Müşteri"):(t.lang==="en"?"Business":"İşletme")}</div><div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{type==="customer"?t.userTypeCustomer:t.userTypeBusiness}</div></div>
                  </div>
                ))}
              </div>
            </div>
            {userType==="business"&&<>
              <div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:6,fontWeight:600}}>{t.lang==="en"?"Business Name":"İşletme Adı"}</div><input style={inp} value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="Maestro Kuaför"/></div>
              <div>
                <div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:8,fontWeight:600}}>{t.lang==="en"?"Category":"Kategori"}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {catOptions.map(([val,label])=>(
                    <button key={val} onClick={()=>setShopCat(val)} style={{padding:"6px 12px",borderRadius:10,border:`1.5px solid ${shopCat===val?C.accent:C.border}`,background:shopCat===val?C.accentLight:C.bgCard,fontSize:12,fontFamily:"'Sora',sans-serif",cursor:"pointer",color:shopCat===val?C.accent:C.inkMid,fontWeight:shopCat===val?600:400}}>{label}</button>
                  ))}
                </div>
              </div>
              <div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:6,fontWeight:600}}>{t.lang==="en"?"Address":"Adres"}</div><input style={inp} value={shopAddress} onChange={e=>setShopAddress(e.target.value)} placeholder="Şişli, İstanbul"/></div>
              <div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:6,fontWeight:600}}>{t.lang==="en"?"Phone":"Telefon"}</div><input style={inp} type="tel" value={shopPhone} onChange={e=>setShopPhone(e.target.value)} placeholder="+90 212 000 0000"/></div>
              <div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:6,fontWeight:600}}>{t.lang==="en"?"About / Description":"İşletme Açıklaması"}</div><textarea style={{...inp,resize:"vertical",minHeight:72,lineHeight:1.5}} value={shopDesc} onChange={e=>setShopDesc(e.target.value)} placeholder={t.lang==="en"?"Tell customers about your business...":"İşletmeniz hakkında kısa bir açıklama..."}/></div>
              <div>
                <div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:8,fontWeight:600}}>{t.lang==="en"?"Appointment Slot":"Randevu Süresi"}</div>
                <div style={{display:"flex",gap:6}}>
                  {[15,30,45,60].map(m=><button key={m} type="button" onClick={()=>setShopSlot(m)} style={{flex:1,padding:"8px 0",borderRadius:10,border:`1.5px solid ${shopSlot===m?C.accent:C.border}`,background:shopSlot===m?C.accentLight:C.bgCard,fontSize:12,fontFamily:"'Sora',sans-serif",cursor:"pointer",color:shopSlot===m?C.accent:C.inkMid,fontWeight:shopSlot===m?700:400}}>{m} dk</button>)}
                </div>
              </div>
            </>}
          </>}
          {error&&<div style={{fontSize:12,color:"#E05252",fontFamily:"'Sora',sans-serif",background:"#FEE8E8",padding:"8px 12px",borderRadius:10}}>{error}</div>}
          <button onClick={handleSubmit} style={{width:"100%",background:C.accent,color:"#fff",border:"none",borderRadius:14,padding:"14px 0",fontSize:14,fontWeight:700,fontFamily:"'Sora',sans-serif",cursor:"pointer",marginTop:4,boxShadow:`0 6px 20px ${C.accent}44`}}>
            {mode==="login"?t.loginBtn:t.registerBtn}
          </button>
        </div>
        <div style={{marginTop:24,textAlign:"center",fontSize:13,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>
          {mode==="login"?t.noAccount:t.haveAccount}{" "}
          <span onClick={()=>{setMode(mode==="login"?"register":"login");setError("");}} style={{color:C.accent,fontWeight:600,cursor:"pointer"}}>{mode==="login"?t.registerLink:t.loginLink}</span>
        </div>
        <div style={{marginTop:20,padding:14,background:"#F0EDE8",borderRadius:14}}>
          <div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:8,fontWeight:600}}>Demo Giriş:</div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>onLogin({email:"musteri@demo.com",name:"Ahmet Yılmaz",type:"customer",id:"demo_c"})} style={{flex:1,padding:"8px 0",background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:10,fontSize:11,fontFamily:"'Sora',sans-serif",cursor:"pointer",color:C.ink,fontWeight:600}}>👤 Müşteri</button>
            <button onClick={()=>onLogin({email:"isletme@demo.com",name:"Maestro Kuaför",type:"business",shopId:1,id:"demo_b"})} style={{flex:1,padding:"8px 0",background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:10,fontSize:11,fontFamily:"'Sora',sans-serif",cursor:"pointer",color:C.ink,fontWeight:600}}>🏪 İşletme</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────
function ProfileScreen({user,onLogout,lang,setLang,t}) {
  const [section,setSection]=useState(null);
  const [editInfo,setEditInfo]=useState({name:user?.name||"",phone:user?.phone||"",email:user?.email||""});
  const [savedInfo,setSavedInfo]=useState({name:user?.name||"",phone:user?.phone||"",email:user?.email||""});
  const [favorites,setFavorites]=useState([SHOPS_INIT[0],SHOPS_INIT[1]]);
  const [payments,setPayments]=useState([
    {id:"p1",type:"visa",last4:"4242",name:"Ahmet Yılmaz",exp:"12/27"},
    {id:"p2",type:"mastercard",last4:"8891",name:"Ahmet Yılmaz",exp:"08/26"},
  ]);
  const [addingCard,setAddingCard]=useState(false);
  const [newCard,setNewCard]=useState({number:"",name:"",exp:"",cvv:""});
  const inp={width:"100%",padding:"11px 13px",border:`1.5px solid ${C.border}`,borderRadius:12,fontSize:13,fontFamily:"'Sora',sans-serif",color:C.ink,background:C.bg,outline:"none"};

  if(section==="info") return (
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      <div style={{padding:"18px 20px 0"}}>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:20}}><BackBtn onPress={()=>setSection(null)}/><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:C.ink}}>{t.lang==="en"?"Personal Info":"Kişisel Bilgiler"}</div></div>
        <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
          <div style={{position:"relative"}}><Avatar ini={savedInfo.name?.charAt(0)||"U"} size={72} bg={C.accentLight} color={C.accent}/><div style={{position:"absolute",bottom:0,right:0,width:24,height:24,borderRadius:"50%",background:C.accent,border:`2px solid ${C.bg}`,display:"flex",alignItems:"center",justifyContent:"center"}}><Edit3 size={11} color="#fff"/></div></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[{key:"name",label:t.lang==="en"?"Full Name":"Ad Soyad",type:"text"},{key:"phone",label:t.lang==="en"?"Phone":"Telefon",type:"tel"},{key:"email",label:"Email",type:"email"}].map(f=>(
            <div key={f.key}><div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:6,fontWeight:600}}>{f.label}</div><input style={inp} type={f.type} value={editInfo[f.key]} onChange={e=>setEditInfo(p=>({...p,[f.key]:e.target.value}))}/></div>
          ))}
          <button onClick={()=>{setSavedInfo({...editInfo});setSection(null);}} style={{width:"100%",background:C.accent,color:"#fff",border:"none",borderRadius:13,padding:"13px 0",fontSize:14,fontWeight:700,fontFamily:"'Sora',sans-serif",cursor:"pointer",boxShadow:`0 6px 20px ${C.accent}44`}}>{t.save}</button>
        </div>
      </div>
    </div>
  );
  if(section==="favorites") return (
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      <div style={{padding:"18px 20px 0"}}>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:20}}><BackBtn onPress={()=>setSection(null)}/><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:C.ink}}>{t.lang==="en"?"Favorites":"Favorilerim"}</div></div>
        {favorites.length===0?<div style={{textAlign:"center",padding:48,color:C.inkLight,fontFamily:"'Sora',sans-serif",fontSize:13}}><Heart size={36} color={C.inkLight} style={{marginBottom:12}}/><div>{t.lang==="en"?"No favorites yet":"Henüz favori yok"}</div></div>:
        <div style={{display:"flex",flexDirection:"column",gap:10}}>{favorites.map(shop=>(
          <div key={shop.id} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"12px 14px",display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:48,height:48,borderRadius:13,background:C.map1,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{shopEmoji(shop.cat)}</div>
            <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:C.ink}}>{shop.name}</div><div style={{display:"flex",gap:6,alignItems:"center",marginTop:3}}><RatingStars r={shop.rating}/><span style={{fontSize:11,color:C.inkLight}}>{shop.distance}</span></div></div>
            <button onClick={()=>setFavorites(p=>p.filter(f=>f.id!==shop.id))} style={{width:32,height:32,borderRadius:9,background:"#FEE8E8",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Heart size={14} fill="#E05252" color="#E05252"/></button>
          </div>
        ))}</div>}
      </div>
    </div>
  );
  if(section==="payments") return (
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      <div style={{padding:"18px 20px 0"}}>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:20}}><BackBtn onPress={()=>setSection(null)}/><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:C.ink}}>{t.lang==="en"?"Payment Methods":"Ödeme Yöntemleri"}</div></div>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
          {payments.map(card=>(
            <div key={card.id} style={{background:`linear-gradient(135deg,#2A2520,#3D3530)`,borderRadius:18,padding:"18px 20px",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",right:-20,top:-20,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
              <div style={{position:"absolute",right:20,top:10,fontSize:12,fontWeight:700,color:card.type==="visa"?"#4A90D9":"#EB001B",fontFamily:"'Sora',sans-serif",letterSpacing:1}}>{card.type.toUpperCase()}</div>
              <div style={{fontSize:16,color:"rgba(255,255,255,0.5)",fontFamily:"'Sora',sans-serif",letterSpacing:3,marginBottom:16,marginTop:8}}>•••• •••• •••• {card.last4}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                <div><div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontFamily:"'Sora',sans-serif",marginBottom:2}}>{t.lang==="en"?"CARD HOLDER":"KART SAHİBİ"}</div><div style={{fontSize:13,color:"#fff",fontFamily:"'Sora',sans-serif",fontWeight:600}}>{card.name}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontFamily:"'Sora',sans-serif",marginBottom:2}}>{t.lang==="en"?"EXPIRES":"SON TRH"}</div><div style={{fontSize:13,color:"#fff",fontFamily:"'Sora',sans-serif",fontWeight:600}}>{card.exp}</div></div>
              </div>
              <button onClick={()=>setPayments(p=>p.filter(c=>c.id!==card.id))} style={{position:"absolute",top:14,right:48,background:"rgba(255,255,255,0.1)",border:"none",borderRadius:7,padding:"4px 8px",cursor:"pointer",fontSize:10,color:"rgba(255,255,255,0.5)",fontFamily:"'Sora',sans-serif"}}>{t.delete}</button>
            </div>
          ))}
        </div>
        {addingCard?(
          <div style={{background:C.bgCard,border:`1.5px solid ${C.accent}`,borderRadius:16,padding:"16px"}}>
            <div style={{fontSize:13,fontWeight:700,fontFamily:"'Playfair Display',serif",color:C.ink,marginBottom:14}}>{t.lang==="en"?"New Card":"Yeni Kart"}</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <input style={inp} placeholder={t.lang==="en"?"Card Number":"Kart No"} maxLength={19} value={newCard.number} onChange={e=>setNewCard(p=>({...p,number:e.target.value}))}/>
              <input style={inp} placeholder={t.lang==="en"?"Cardholder Name":"Kart Sahibi"} value={newCard.name} onChange={e=>setNewCard(p=>({...p,name:e.target.value}))}/>
              <div style={{display:"flex",gap:10}}>
                <input style={{...inp,width:"50%"}} placeholder="MM/YY" maxLength={5} value={newCard.exp} onChange={e=>setNewCard(p=>({...p,exp:e.target.value}))}/>
                <input style={{...inp,width:"50%"}} placeholder="CVV" maxLength={3} type="password" value={newCard.cvv} onChange={e=>setNewCard(p=>({...p,cvv:e.target.value}))}/>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setAddingCard(false)} style={{flex:1,padding:"10px 0",background:C.bg,border:`1px solid ${C.border}`,borderRadius:11,cursor:"pointer",fontSize:12,fontFamily:"'Sora',sans-serif",color:C.inkMid}}>{t.cancel}</button>
                <button onClick={()=>{if(!newCard.number||!newCard.name)return;const l4=newCard.number.replace(/\s/g,"").slice(-4);setPayments(p=>[...p,{id:`p${Date.now()}`,type:"visa",last4:l4,name:newCard.name,exp:newCard.exp}]);setAddingCard(false);setNewCard({number:"",name:"",exp:"",cvv:""}); }} style={{flex:1,padding:"10px 0",background:C.accent,border:"none",borderRadius:11,cursor:"pointer",fontSize:12,fontFamily:"'Sora',sans-serif",color:"#fff",fontWeight:700}}>{t.save}</button>
              </div>
            </div>
          </div>
        ):(
          <button onClick={()=>setAddingCard(true)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:C.bgCard,border:`1.5px dashed ${C.border}`,borderRadius:14,padding:"13px 0",cursor:"pointer"}}>
            <Plus size={16} color={C.accent}/><span style={{fontSize:13,fontWeight:600,color:C.accent,fontFamily:"'Sora',sans-serif"}}>{t.lang==="en"?"Add New Card":"Yeni Kart Ekle"}</span>
          </button>
        )}
      </div>
    </div>
  );

  const menuItems=[
    {id:"info",icon:"👤",label:t.lang==="en"?"Personal Info":"Kişisel Bilgiler",sub:savedInfo.name||user?.name},
    {id:"favorites",icon:"❤️",label:t.lang==="en"?"Favorites":"Favorilerim",sub:t.lang==="en"?`${favorites.length} saved`:`${favorites.length} kayıtlı`},
    {id:"payments",icon:"💳",label:t.lang==="en"?"Payment Methods":"Ödeme Yöntemleri",sub:t.lang==="en"?`${payments.length} cards`:`${payments.length} kart`},
  ];
  return (
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      <div style={{padding:"24px 20px"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:C.ink,marginBottom:20}}>{t.profileTitle}</div>
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:20,padding:"20px",marginBottom:16,display:"flex",gap:14,alignItems:"center"}}>
          <Avatar ini={savedInfo.name?.charAt(0)||"U"} size={56} bg={C.accentLight} color={C.accent}/>
          <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:C.ink}}>{savedInfo.name}</div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{savedInfo.email||user?.email}</div><div style={{display:"inline-block",background:C.map1,color:C.inkMid,fontSize:10,fontWeight:600,fontFamily:"'Sora',sans-serif",padding:"3px 9px",borderRadius:99,marginTop:6}}>{t.member}</div></div>
        </div>
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,overflow:"hidden",marginBottom:14}}>
          {menuItems.map((item,i)=>(
            <div key={item.id} onClick={()=>setSection(item.id)} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",cursor:"pointer",borderBottom:i<menuItems.length-1?`1px solid ${C.border}`:"none"}} onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{width:38,height:38,borderRadius:12,background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{item.icon}</div>
              <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.ink,fontFamily:"'Sora',sans-serif"}}>{item.label}</div>{item.sub&&<div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{item.sub}</div>}</div>
              <ChevronDown size={16} color={C.inkLight} style={{transform:"rotate(-90deg)"}}/>
            </div>
          ))}
        </div>
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"14px 16px",marginBottom:14}}>
          <div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:10,fontWeight:600}}>🌐 {t.language}</div>
          <div style={{display:"flex",gap:8}}>
            {["tr","en"].map(l=><button key={l} onClick={()=>setLang(l)} style={{flex:1,padding:"9px 0",borderRadius:12,background:lang===l?C.accent:C.bg,color:lang===l?"#fff":C.inkMid,border:`1.5px solid ${lang===l?C.accent:C.border}`,fontSize:13,fontFamily:"'Sora',sans-serif",fontWeight:lang===l?700:400,cursor:"pointer"}}>{l==="tr"?"🇹🇷 Türkçe":"🇬🇧 English"}</button>)}
          </div>
        </div>
        <button onClick={onLogout} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:"13px 0",cursor:"pointer"}}>
          <LogOut size={16} color="#E05252"/><span style={{fontSize:13,fontWeight:600,color:"#E05252",fontFamily:"'Sora',sans-serif"}}>{t.logoutBtn}</span>
        </button>
      </div>
    </div>
  );
}

// ─── BOOKINGS SCREEN ──────────────────────────────────────────────────────────
function BookingsScreen({goto,t,bookings,onRate}) {
  const [tab,setTab]=useState("upcoming");
  const [ratingModal,setRatingModal]=useState(null);
  const [ratingValue,setRatingValue]=useState(0);
  const [submitted,setSubmitted]=useState({});

  const allBookings=bookings.length>0?bookings:[
    {id:"b1",shop:SHOPS_INIT[0],service:SHOPS_INIT[0].services[0],staff:SHOPS_INIT[0].staff[0],date:"Pzt, 24 Şub",time:"10:00",status:"upcoming",price:150},
    {id:"b2",shop:SHOPS_INIT[1],service:SHOPS_INIT[1].services[0],staff:SHOPS_INIT[1].staff[0],date:"Sal, 18 Şub",time:"14:30",status:"past",price:250},
  ];
  const filtered=allBookings.filter(b=>b.status===tab);

  return (
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      <div style={{padding:"20px 20px 0"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:C.ink,marginBottom:16}}>{t.myBookings}</div>
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {["upcoming","past"].map(tk=><Pill key={tk} active={tab===tk} onClick={()=>setTab(tk)}>{tk==="upcoming"?t.upcoming:t.past}</Pill>)}
        </div>
      </div>
      <div style={{padding:"0 20px 24px",display:"flex",flexDirection:"column",gap:12}}>
        {filtered.length===0?<div style={{textAlign:"center",padding:48,color:C.inkLight,fontFamily:"'Sora',sans-serif",fontSize:13}}><Calendar size={40} color={C.inkLight} style={{marginBottom:12}}/><div>{t.noBookings}</div></div>:
        filtered.map(bk=>{
          const svcName=typeof bk.service.name==="object"?(t.lang==="en"?bk.service.name.en:bk.service.name.tr):bk.service.name;
          const shopRated=submitted[bk.id]||bk.rated;
          return (
            <div key={bk.id} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:18,overflow:"hidden",boxShadow:"0 2px 10px rgba(0,0,0,0.04)"}}>
              <div style={{background:bk.status==="upcoming"?C.accentLight:C.map1,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:11,fontWeight:700,color:bk.status==="upcoming"?C.accent:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{bk.status==="upcoming"?(t.lang==="en"?"UPCOMING":"YAKLAŞAN"):(t.lang==="en"?"COMPLETED":"TAMAMLANDI")}</div>
                <div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{bk.date} · {bk.time}</div>
              </div>
              <div style={{padding:"14px 16px"}}>
                <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:bk.status==="past"?12:0}}>
                  <div style={{fontSize:28}}>{shopEmoji(bk.shop.cat)}</div>
                  <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:C.ink}}>{bk.shop.name}</div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{svcName}</div></div>
                  <div style={{fontSize:15,fontWeight:700,color:C.accent,fontFamily:"'Sora',sans-serif"}}>₺{bk.price}</div>
                </div>
                {bk.status==="past"&&<div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  {shopRated?<div style={{display:"flex",alignItems:"center",gap:6}}><Star size={14} fill={C.accent} color={C.accent}/><span style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{t.rated}: {shopRated}/5</span></div>:
                  <button onClick={()=>setRatingModal(bk)} style={{display:"flex",alignItems:"center",gap:6,background:C.accentLight,border:`1px solid ${C.accent}44`,borderRadius:10,padding:"8px 14px",cursor:"pointer"}}><Star size={13} color={C.accent}/><span style={{fontSize:12,color:C.accent,fontFamily:"'Sora',sans-serif",fontWeight:600}}>{t.rateService}</span></button>}
                  <button onClick={()=>goto("shop",{shop:bk.shop})} style={{fontSize:12,color:C.accent,fontFamily:"'Sora',sans-serif",fontWeight:600,background:"none",border:"none",cursor:"pointer"}}>{t.lang==="en"?"Book Again":"Tekrar →"}</button>
                </div>}
              </div>
            </div>
          );
        })}
      </div>
      {ratingModal&&(
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"flex-end",zIndex:100}} onClick={()=>setRatingModal(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.bgCard,borderRadius:"24px 24px 0 0",padding:"28px 24px",width:"100%"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:C.ink,marginBottom:4}}>{t.rateTitle}</div>
            <div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:20}}>{t.rateSub}</div>
            <div style={{marginBottom:8,fontSize:13,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{typeof ratingModal.service.name==="object"?ratingModal.service.name.tr:ratingModal.service.name} — {ratingModal.shop.name}</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:24}}><StarRating value={ratingValue} onChange={setRatingValue} size={36}/></div>
            <button disabled={ratingValue===0} onClick={()=>{if(ratingValue>0){onRate(ratingModal.id,ratingValue);setSubmitted(p=>({...p,[ratingModal.id]:ratingValue}));setRatingModal(null);setRatingValue(0);}}} style={{width:"100%",background:ratingValue>0?C.accent:"#E0DDD9",color:ratingValue>0?"#fff":"#B5B0AA",border:"none",borderRadius:14,padding:"14px 0",fontSize:14,fontWeight:700,fontFamily:"'Sora',sans-serif",cursor:ratingValue>0?"pointer":"default"}}>{t.submitRating}</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({goto,t,user,enrichShop,userLocation,allShops}) {
  const [cat,setCat]=useState("all");
  const shops=allShops||SHOPS_INIT;
  const featured=shops.filter(s=>s.featured);
  return (
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      <div style={{padding:"20px 20px 0",background:C.bg}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <div style={{fontSize:13,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:2}}>📍 {userLocation?t.nearbyYou:t.location}</div>
            <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,color:C.ink,lineHeight:1.2}}>{t.greeting}, {user?.name?.split(" ")[0]||"Ahmet"} 👋</div>
          </div>
          <button style={{width:40,height:40,borderRadius:14,background:C.bgCard,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative"}}>
            <Bell size={18} color={C.ink}/><div style={{position:"absolute",top:8,right:8,width:7,height:7,borderRadius:"50%",background:C.accent,border:`2px solid ${C.bg}`}}/>
          </button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,background:C.bgCard,border:`1.5px solid ${C.border}`,borderRadius:16,padding:"12px 16px",marginBottom:18,boxShadow:"0 2px 12px rgba(0,0,0,0.04)",cursor:"pointer"}} onClick={()=>goto("search",{})}>
          <Search size={17} color={C.inkLight}/><span style={{flex:1,fontSize:14,color:C.inkLight,fontFamily:"'Sora',sans-serif"}}>{t.searchPlaceholder}</span>
          <div style={{width:34,height:34,borderRadius:10,background:C.accentLight,display:"flex",alignItems:"center",justifyContent:"center"}}><SlidersHorizontal size={15} color={C.accent}/></div>
        </div>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,marginBottom:20}}>
          {CATS.map(cKey=>{const Icon=CAT_ICONS[cKey];return(
            <button key={cKey} onClick={()=>goto("search",{cat:cKey})} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"10px 14px",borderRadius:16,flexShrink:0,background:cat===cKey?C.accent:C.bgCard,border:`1.5px solid ${cat===cKey?C.accent:C.border}`,cursor:"pointer",transition:"all 0.18s"}}>
              <Icon size={18} color={cat===cKey?"#fff":C.inkMid}/><span style={{fontSize:11,fontFamily:"'Sora',sans-serif",fontWeight:500,color:cat===cKey?"#fff":C.inkMid,whiteSpace:"nowrap"}}>{t[cKey]}</span>
            </button>
          );})}
        </div>
      </div>
      <div style={{padding:"0 20px"}}>
        <div style={{marginBottom:12}}><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:18,color:C.ink}}>{t.featured}</div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{t.featuredSub}</div></div>
        <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:4,marginBottom:24}}>
          {featured.map(shop=>{
            const tagLabel=shop.tag?(t.lang==="en"?shop.tag.en:shop.tag.tr):null;
            const waitLabel=t.lang==="en"?shop.wait.en:shop.wait.tr;
            return(
              <div key={shop.id} onClick={()=>goto("shop",{shop:enrichShop(shop)})} style={{width:220,flexShrink:0,borderRadius:20,background:C.bgCard,border:`1px solid ${C.border}`,overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.06)"}}>
                <div style={{height:100,background:`linear-gradient(135deg,#E8E4DC,#D4CFC6)`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {tagLabel&&<div style={{position:"absolute",top:10,left:10,background:C.accent,color:"#fff",fontSize:10,fontWeight:700,fontFamily:"'Sora',sans-serif",padding:"3px 9px",borderRadius:99}}>{tagLabel}</div>}
                  <div style={{width:56,height:56,borderRadius:16,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,0,0,0.12)",fontSize:22}}>{shopEmoji(shop.cat)}</div>
                </div>
                <div style={{padding:"12px 14px"}}>
                  <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:15,color:C.ink,marginBottom:4}}>{shop.name}</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><RatingStars r={shop.rating}/><span style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{shop.distance}</span></div>
                  <div style={{marginTop:8,fontSize:11,color:shop.open?C.accent:"#999",fontFamily:"'Sora',sans-serif",fontWeight:600}}>{shop.open?`● ${t.open}`:`● ${t.closed}`} · {waitLabel}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{marginBottom:12}}><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:18,color:C.ink}}>{t.nearby}</div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{t.resultsFound(shops.length)}</div></div>
        <div style={{display:"flex",flexDirection:"column",gap:10,paddingBottom:24}}>
          {shops.map(shop=>{const waitLabel=typeof shop.wait==="object"?(t.lang==="en"?shop.wait.en:shop.wait.tr):shop.wait||"";return(
            <div key={shop.id} onClick={()=>goto("shop",{shop:enrichShop(shop)})} style={{display:"flex",gap:12,alignItems:"center",background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"12px 14px",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
              <div style={{width:52,height:52,borderRadius:14,background:C.map1,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{shopEmoji(shop.cat)}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:15,color:C.ink,marginBottom:2}}>{shop.name}</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}><RatingStars r={shop.rating}/><span style={{fontSize:11,color:C.inkLight}}>({shop.reviews})</span><span style={{fontSize:11,color:C.inkLight}}>·</span><span style={{fontSize:11,color:C.inkLight}}>{shop.distance}</span></div>
                <div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:3}}>{shop.price} · {waitLabel}</div>
              </div>
              <ChevronDown size={16} color={C.inkLight} style={{transform:"rotate(-90deg)"}}/>
            </div>
          );})}
        </div>
      </div>
    </div>
  );
}

// ─── SEARCH SCREEN ────────────────────────────────────────────────────────────
function SearchScreen({goto,params,t,enrichShop,userLocation,allShops}) {
  const [query,setQuery]=useState(params?.q||"");
  const [cat,setCat]=useState(params?.cat||"all");
  const [view,setView]=useState("map");
  const [activePin,setActivePin]=useState(null);

  const handleCatChange=(c)=>{setCat(c);setActivePin(null);};
  const shops=allShops||SHOPS_INIT;
  const results=shops.filter(s=>(cat==="all"||s.cat===cat)&&(query===""||s.name.toLowerCase().includes(query.toLowerCase())));

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.bg,overflow:"hidden"}}>
      <div style={{padding:"14px 16px 12px",background:C.bg,flexShrink:0}}>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:12}}>
          <BackBtn onPress={()=>goto("home",{})}/>
          <div style={{flex:1,display:"flex",alignItems:"center",gap:8,background:C.bgCard,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"10px 14px"}}>
            <Search size={15} color={C.inkLight}/>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.searchPlaceholderFull} autoFocus style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:13,color:C.ink,fontFamily:"'Sora',sans-serif"}}/>
            {query&&<X size={14} color={C.inkLight} style={{cursor:"pointer"}} onClick={()=>setQuery("")}/>}
          </div>
          <div style={{display:"flex",borderRadius:12,overflow:"hidden",border:`1px solid ${C.border}`}}>
            {["map","list"].map(v=><button key={v} onClick={()=>setView(v)} style={{padding:"8px 12px",background:view===v?C.accent:C.bgCard,border:"none",cursor:"pointer",fontSize:11,color:view===v?"#fff":C.inkMid}}>{v==="map"?"🗺️":"☰"}</button>)}
          </div>
        </div>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:2}}>
          {CATS.map(cKey=><Pill key={cKey} active={cat===cKey} onClick={()=>handleCatChange(cKey)} small>{t[cKey]}</Pill>)}
        </div>
      </div>

      {view==="map"&&(
        <div style={{position:"relative",height:240,flexShrink:0,background:C.map1,overflow:"hidden"}}>
          <svg width="100%" height="100%" style={{position:"absolute",inset:0}}>
            <rect width="100%" height="100%" fill="#E8E4DC"/>
            <line x1="0" y1="40%" x2="100%" y2="38%" stroke="#D4CFC6" strokeWidth="12"/>
            <line x1="0" y1="65%" x2="100%" y2="67%" stroke="#D4CFC6" strokeWidth="8"/>
            <line x1="30%" y1="0" x2="28%" y2="100%" stroke="#D4CFC6" strokeWidth="10"/>
            <line x1="65%" y1="0" x2="67%" y2="100%" stroke="#D4CFC6" strokeWidth="8"/>
            <rect x="5%" y="5%" width="22%" height="28%" rx="4" fill="#DEDAD1"/>
            <rect x="32%" y="5%" width="30%" height="28%" rx="4" fill="#DEDAD1"/>
            <rect x="70%" y="5%" width="25%" height="30%" rx="4" fill="#DEDAD1"/>
            <ellipse cx="82%" cy="80%" rx="10%" ry="12%" fill="#C8DCC0"/>
          </svg>
          {results.map(shop=><button key={shop.id} onClick={()=>setActivePin(activePin?.id===shop.id?null:shop)} style={{position:"absolute",left:`${shop.x}%`,top:`${shop.y}%`,transform:"translate(-50%,-100%)",background:activePin?.id===shop.id?C.accent:C.bgCard,color:activePin?.id===shop.id?"#fff":C.ink,border:`2px solid ${activePin?.id===shop.id?C.accent:C.border}`,borderRadius:12,padding:"5px 10px",fontSize:11,fontFamily:"'Sora',sans-serif",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:activePin?.id===shop.id?10:1}}>{shop.price.split("–")[0]}</button>)}
          <div style={{position:"absolute",left:"50%",top:"52%",transform:"translate(-50%,-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div style={{width:16,height:16,borderRadius:"50%",background:userLocation?"#2563EB":C.accent,border:"3px solid #fff",boxShadow:`0 0 0 6px ${userLocation?"rgba(37,99,235,0.2)":"rgba(232,82,26,0.2)"}`}}/>
              <div style={{background:userLocation?"rgba(37,99,235,0.9)":"rgba(232,82,26,0.8)",color:"#fff",fontSize:8,fontFamily:"'Sora',sans-serif",fontWeight:600,padding:"2px 6px",borderRadius:6,whiteSpace:"nowrap"}}>{userLocation?t.myLocation:(t.lang==="en"?"İstanbul":"İstanbul")}</div>
            </div>
          {activePin&&(
            <div onClick={()=>goto("shop",{shop:enrichShop?enrichShop(activePin):activePin})} style={{position:"absolute",bottom:12,left:12,right:12,background:C.bgCard,borderRadius:16,padding:"12px 14px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",display:"flex",gap:10,alignItems:"center",cursor:"pointer",border:`1px solid ${C.border}`}}>
              <div style={{fontSize:24}}>{shopEmoji(activePin.cat)}</div>
              <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:C.ink}}>{activePin.name}</div><div style={{display:"flex",gap:8,marginTop:3}}><RatingStars r={activePin.rating}/><span style={{fontSize:11,color:C.inkMid}}>{activePin.distance}</span></div></div>
              <div style={{background:C.accent,color:"#fff",fontSize:11,fontWeight:700,padding:"6px 12px",borderRadius:10,fontFamily:"'Sora',sans-serif"}}>{t.lang==="en"?"Book":"Randevu"}</div>
            </div>
          )}
        </div>
      )}

      <div style={{flex:1,overflowY:"auto",padding:"14px 16px"}}>
        <div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:10}}>{t.resultsFound(results.length)}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {results.map(shop=>{const waitLabel=t.lang==="en"?shop.wait.en:shop.wait.tr;return(
            <div key={shop.id} onClick={()=>goto("shop",{shop:enrichShop(shop)})} style={{display:"flex",gap:12,alignItems:"center",background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"12px 14px",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
              <div style={{width:52,height:52,borderRadius:14,background:C.map1,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{shopEmoji(shop.cat)}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:15,color:C.ink,marginBottom:2}}>{shop.name}</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}><RatingStars r={shop.rating}/><span style={{fontSize:11,color:C.inkLight}}>({shop.reviews})</span><span style={{fontSize:11,color:C.inkLight}}>·</span><span style={{fontSize:11,color:C.inkLight}}>{shop.distance}</span></div>
                <div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:3}}>{shop.price} · {waitLabel}</div>
              </div>
              <ChevronDown size={16} color={C.inkLight} style={{transform:"rotate(-90deg)"}}/>
            </div>
          );})}
          {results.length===0&&<div style={{textAlign:"center",padding:40,color:C.inkLight,fontFamily:"'Sora',sans-serif",fontSize:13}}>{t.noResults(query)}</div>}
        </div>
      </div>
    </div>
  );
}

// ─── SHOP SCREEN ──────────────────────────────────────────────────────────────
function ShopScreen({goto,params,t}) {
  const shop=params.shop;
  const descText=typeof shop.description==="object"?(t.lang==="en"?shop.description.en:shop.description.tr):shop.description||"";
  const waitLabel=typeof shop.wait==="object"?(t.lang==="en"?shop.wait.en:shop.wait.tr):shop.wait;
  const tagLabel=shop.tag?(typeof shop.tag==="object"?(t.lang==="en"?shop.tag.en:shop.tag.tr):shop.tag):null;
  const serviceCount=`${shop.services.length} ${t.lang==="en"?"types":"çeşit"}`;
  return (
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      <div style={{height:180,background:`linear-gradient(160deg,#E8E4DC,#C8C4BB)`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{position:"absolute",top:16,left:16}}><BackBtn onPress={()=>goto("search",{})}/></div>
        <button style={{position:"absolute",top:16,right:16,width:36,height:36,borderRadius:12,background:"rgba(255,255,255,0.9)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Heart size={17} color={C.inkMid}/></button>
        <div style={{fontSize:64}}>{shopEmoji(shop.cat)}</div>
      </div>
      <div style={{padding:"0 20px 24px"}}>
        <div style={{background:C.bgCard,borderRadius:20,padding:"16px 18px",marginTop:-24,marginBottom:16,position:"relative",border:`1px solid ${C.border}`,boxShadow:"0 4px 20px rgba(0,0,0,0.06)"}}>
          {tagLabel&&<div style={{display:"inline-block",background:C.accentLight,color:C.accent,fontSize:10,fontWeight:700,fontFamily:"'Sora',sans-serif",padding:"3px 9px",borderRadius:99,marginBottom:8}}>{tagLabel}</div>}
          <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:20,color:C.ink,marginBottom:6}}>{shop.name}</div>
          <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}><RatingStars r={shop.rating}/><span style={{fontSize:12,color:C.inkLight,fontFamily:"'Sora',sans-serif"}}>({shop.reviews} {t.reviews})</span></div>
          <div style={{display:"flex",gap:16,marginTop:12}}>
            <div style={{display:"flex",gap:5,alignItems:"center"}}><MapPin size={13} color={C.inkMid}/><span style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{shop.address}</span></div>
            {shop.phone&&<div style={{display:"flex",gap:5,alignItems:"center"}}><Phone size={13} color={C.inkMid}/><span style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{shop.phone}</span></div>}
          </div>
          <div style={{marginTop:10,fontSize:12,fontFamily:"'Sora',sans-serif",fontWeight:600,color:shop.open?C.accent:"#999"}}>{shop.open?`● ${t.open}`:`● ${t.closed}`} · {waitLabel}</div>
        </div>

        {descText?(
          <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"14px 16px",marginBottom:12}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}><Info size={14} color={C.inkMid}/><span style={{fontSize:13,fontWeight:600,color:C.ink,fontFamily:"'Sora',sans-serif"}}>{t.shopDescription}</span></div>
            <div style={{fontSize:13,color:C.inkMid,fontFamily:"'Sora',sans-serif",lineHeight:1.6}}>{descText}</div>
          </div>
        ):null}

        <button onClick={()=>goto("service",{shop})} style={{width:"100%",background:C.accent,color:"#fff",border:"none",borderRadius:16,padding:"15px 0",fontSize:15,fontWeight:700,fontFamily:"'Sora',sans-serif",cursor:"pointer",boxShadow:`0 6px 20px ${C.accent}44`,marginBottom:12}}>
          {t.bookAppointment} →
        </button>

        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {[{label:t.duration,val:`${shop.slotMin} ${t.min}`},{label:t.price,val:shop.price},{label:t.service,val:serviceCount}].map(info=>(
            <div key={info.label} style={{flex:1,background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:"10px 12px",textAlign:"center"}}>
              <div style={{fontSize:14,fontWeight:700,fontFamily:"'Sora',sans-serif",color:C.ink}}>{info.val}</div>
              <div style={{fontSize:10,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{info.label}</div>
            </div>
          ))}
        </div>

        {shop.services.length>0&&<>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:C.ink,marginBottom:12}}>{t.lang==="en"?"Price List":"Fiyat Listesi"}</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
            {shop.services.map(svc=>{
              const svcName=typeof svc.name==="object"?(t.lang==="en"?svc.name.en:svc.name.tr):svc.name;
              return(
                <div key={svc.id} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:C.ink}}>{svcName}</div><div style={{display:"flex",alignItems:"center",gap:4,marginTop:3}}><Clock size={11} color={C.inkMid}/><span style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{svc.duration} {t.min}</span></div></div>
                  <div style={{fontSize:15,fontWeight:700,color:C.accent,fontFamily:"'Sora',sans-serif"}}>₺{svc.price}</div>
                </div>
              );
            })}
          </div>
        </>}

        {shop.staff.length>0&&<>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:C.ink,marginBottom:12}}>{t.team}</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:4}}>
            {shop.staff.map(member=>{
              const memberTitle=typeof member.title==="object"?(t.lang==="en"?member.title.en:member.title.tr):member.title;
              return(
                <div key={member.id} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 14px",display:"flex",gap:12,alignItems:"center"}}>
                  <Avatar ini={member.img||member.name?.charAt(0)} size={44} bg={`hsl(${member.id*53%360},25%,85%)`}/>
                  <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:C.ink}}>{member.name}</div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{memberTitle}</div></div>
                  <RatingStars r={member.rating}/>
                </div>
              );
            })}
          </div>
        </>}
      </div>
    </div>
  );
}

// ─── SERVICE / STAFF / CALENDAR ───────────────────────────────────────────────
function ProgressBar({step,t}) {
  const steps=[t.step1,t.step2,t.step3];
  return (
    <div style={{display:"flex",alignItems:"center",gap:4,marginTop:14}}>
      {steps.map((s,i)=>(
        <>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
            <div style={{width:22,height:22,borderRadius:"50%",background:i<step?C.accent:i===step?"#fff":C.bg,border:`2px solid ${i<=step?C.accent:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:i<step?"#fff":i===step?C.accent:C.inkLight,fontFamily:"'Sora',sans-serif"}}>
              {i<step?<Check size={11} strokeWidth={3}/>:i+1}
            </div>
            <div style={{fontSize:9,color:i<=step?C.accent:C.inkLight,fontFamily:"'Sora',sans-serif",fontWeight:i===step?600:400}}>{s}</div>
          </div>
          {i<steps.length-1&&<div style={{flex:1,height:2,background:i<step?C.accent:C.border,borderRadius:99,marginBottom:12}}/>}
        </>
      ))}
    </div>
  );
}

function ServiceScreen({goto,params,t}) {
  const {shop}=params; const [sel,setSel]=useState(null);
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.bg,overflow:"hidden"}}>
      <div style={{padding:"16px 16px 14px",flexShrink:0,borderBottom:`1px solid ${C.border}`,background:C.bg}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}><BackBtn onPress={()=>goto("shop",{shop})}/><div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:C.ink}}>{t.selectService}</div><div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{shop.name}</div></div></div>
        <ProgressBar step={1} t={t}/>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 0"}}>
        <div style={{display:"flex",flexDirection:"column",gap:10,paddingBottom:16}}>
          {shop.services.map(svc=>{
            const active=sel?.id===svc.id;
            const svcName=typeof svc.name==="object"?(t.lang==="en"?svc.name.en:svc.name.tr):svc.name;
            return(
              <div key={svc.id} onClick={()=>setSel(svc)} style={{background:C.bgCard,border:`1.5px solid ${active?C.accent:C.border}`,borderRadius:16,padding:"14px 16px",cursor:"pointer",boxShadow:active?`0 4px 16px ${C.accent}22`:"0 2px 8px rgba(0,0,0,0.04)",transition:"all 0.18s",position:"relative"}}>
                {active&&<div style={{position:"absolute",top:12,right:12,width:22,height:22,borderRadius:"50%",background:C.accent,display:"flex",alignItems:"center",justifyContent:"center"}}><Check size={13} color="#fff" strokeWidth={3}/></div>}
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:C.ink,marginBottom:6}}>{svcName}</div>
                <div style={{display:"flex",gap:16}}><div style={{display:"flex",gap:5,alignItems:"center"}}><Clock size={12} color={C.inkMid}/><span style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{svc.duration} {t.min}</span></div><div style={{fontSize:13,fontWeight:700,color:C.accent,fontFamily:"'Sora',sans-serif"}}>₺{svc.price}</div></div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${C.border}`,background:C.bg}}>
        <button disabled={!sel} onClick={()=>goto("staff",{shop,service:sel})} style={{width:"100%",background:sel?C.accent:"#E0DDD9",color:sel?"#fff":"#B5B0AA",border:"none",borderRadius:14,padding:"14px 0",fontSize:14,fontWeight:700,fontFamily:"'Sora',sans-serif",cursor:sel?"pointer":"default"}}>
          {sel?`${t.continue} — ${typeof sel.name==="object"?(t.lang==="en"?sel.name.en:sel.name.tr):sel.name}`:t.selectOne}
        </button>
      </div>
    </div>
  );
}

function StaffScreen({goto,params,t,shopAvailability}) {
  const {shop,service}=params; const [sel,setSel]=useState(null);
  const svcName=typeof service.name==="object"?(t.lang==="en"?service.name.en:service.name.tr):service.name;
  const avail=shopAvailability?.[shop.id]||{};
  const today=new Date(); const todayKey=dateKey(today);

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.bg,overflow:"hidden"}}>
      <div style={{padding:"16px 16px 14px",flexShrink:0,borderBottom:`1px solid ${C.border}`,background:C.bg}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}><BackBtn onPress={()=>goto("service",{shop})}/><div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:C.ink}}>{t.selectStaff}</div><div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{svcName} · {service.duration} {t.min}</div></div></div>
        <ProgressBar step={2} t={t}/>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 0"}}>
        <div onClick={()=>setSel({id:"any",name:t.anyStaff,img:"?"})} style={{background:C.bgCard,border:`1.5px solid ${sel?.id==="any"?C.accent:C.border}`,borderRadius:16,padding:"12px 16px",cursor:"pointer",marginBottom:10,display:"flex",gap:12,alignItems:"center",boxShadow:sel?.id==="any"?`0 4px 16px ${C.accent}22`:"0 2px 8px rgba(0,0,0,0.04)"}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:C.accentLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🎲</div>
          <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:C.ink}}>{t.anyStaff}</div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{t.anyStaffSub}</div></div>
          {sel?.id==="any"&&<Check size={18} color={C.accent}/>}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10,paddingBottom:16}}>
          {shop.staff.map(member=>{
            const active=sel?.id===member.id;
            const memberTitle=typeof member.title==="object"?(t.lang==="en"?member.title.en:member.title.tr):member.title;
            const staffAvail=avail[member.id]||{};
            const isUnavailToday=staffAvail.unavailableDates?.includes(todayKey);
            const isAvail=member.avail&&!isUnavailToday;
            return(
              <div key={member.id} onClick={()=>isAvail&&setSel(member)} style={{background:C.bgCard,border:`1.5px solid ${active?C.accent:C.border}`,borderRadius:16,padding:"14px 16px",cursor:isAvail?"pointer":"default",opacity:isAvail?1:0.5,display:"flex",gap:12,alignItems:"center",boxShadow:active?`0 4px 16px ${C.accent}22`:"0 2px 8px rgba(0,0,0,0.04)"}}>
                <Avatar ini={member.img||member.name?.charAt(0)} size={48} bg={`hsl(${member.id*53%360},25%,85%)`}/>
                <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:C.ink}}>{member.name}</div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{memberTitle}</div><div style={{display:"flex",gap:8,marginTop:4,alignItems:"center"}}><RatingStars r={member.rating}/>{!isAvail&&<span style={{fontSize:11,color:"#ccc",fontFamily:"'Sora',sans-serif"}}>{t.notAvailableToday}</span>}</div></div>
                {active&&<div style={{width:24,height:24,borderRadius:"50%",background:C.accent,display:"flex",alignItems:"center",justifyContent:"center"}}><Check size={14} color="#fff" strokeWidth={3}/></div>}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${C.border}`,background:C.bg}}>
        <button disabled={!sel} onClick={()=>goto("calendar",{shop,service,staff:sel})} style={{width:"100%",background:sel?C.accent:"#E0DDD9",color:sel?"#fff":"#B5B0AA",border:"none",borderRadius:14,padding:"14px 0",fontSize:14,fontWeight:700,fontFamily:"'Sora',sans-serif",cursor:sel?"pointer":"default"}}>
          {sel&&sel.id!=="any"?`${sel.name} ${t.continueWith} →`:t.selectStaffBtn}
        </button>
      </div>
    </div>
  );
}

function CalendarScreen({goto,params,t,addBooking,shopAvailability}) {
  const {shop,service,staff}=params;
  const [weekOff,setWeekOff]=useState(0);
  const [picked,setPicked]=useState(null);
  const [confirmed,setConfirmed]=useState(false);
  const [didAdd,setDidAdd]=useState(false);

  const slots=genSlots(shop.slotMin,t.lang);
  const today=new Date();
  const dates=weekDates(weekOff);

  const avail=shopAvailability?.[shop.id]||{};
  const workDays=avail.workDays||[false,true,true,true,true,true,false];
  const staffAvail=staff.id!=="any"?(avail[staff.id]||{}):{};
  const staffUnavDates=staffAvail.unavailableDates||[];

  const isBooked=(d,s)=>BOOKED_INIT.some(([bd,bs])=>bd===d&&bs===s);
  const isPast=(date)=>date<new Date(today.toDateString());
  const isDayOff=(date)=>!workDays[date.getDay()];
  const isStaffUnavail=(date)=>staffUnavDates.includes(dateKey(date));

  const monthLabel=()=>{const f=dates[0],l=dates[6];return f.getMonth()===l.getMonth()?`${t.months[f.getMonth()]} ${f.getFullYear()}`:`${t.months[f.getMonth()]} – ${t.months[l.getMonth()]}`;};
  const svcName=typeof service.name==="object"?(t.lang==="en"?service.name.en:service.name.tr):service.name;

  useEffect(()=>{
    if(confirmed&&picked&&!didAdd){
      const [dIdx,sIdx]=picked; const d=dates[dIdx];
      if(addBooking){
        addBooking({id:`b${Date.now()}`,shop,service,staff,date:`${t.days[d.getDay()]}, ${d.getDate()} ${t.months[d.getMonth()]}`,time:slots[sIdx],status:"pending",price:service.price});
        setDidAdd(true);
      }
    }
  },[confirmed]);

  if(confirmed&&picked){
    const [dIdx,sIdx]=picked; const d=dates[dIdx];
    return (
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:32,background:C.bg,textAlign:"center"}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:C.accentLight,border:`2px solid ${C.accent}`,display:"flex",alignItems:"center",justifyContent:"center",animation:"pop 0.5s cubic-bezier(.4,0,.2,1)"}}><Check size={36} color={C.accent} strokeWidth={2.5}/></div>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,color:C.ink,marginBottom:8}}>{t.appointmentBooked}</div>
          <div style={{fontSize:13,color:C.inkMid,fontFamily:"'Sora',sans-serif",lineHeight:1.7}}><strong>{shop.name}</strong><br/>{svcName} · {staff.id==="any"?t.availableStaff:staff.name}<br/>{t.days[d.getDay()]}, {d.getDate()} {t.months[d.getMonth()]} · {slots[sIdx]}<br/><span style={{color:C.accent,fontWeight:600}}>₺{service.price}</span></div>
          <div style={{marginTop:12,display:"inline-flex",alignItems:"center",gap:6,background:C.warningLight,border:`1px solid ${C.warning}44`,borderRadius:10,padding:"8px 14px"}}><AlertCircle size={13} color={C.warning}/><span style={{fontSize:12,color:C.warning,fontFamily:"'Sora',sans-serif",fontWeight:600}}>{t.lang==="en"?"Awaiting business approval":"İşletme onayı bekleniyor"}</span></div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>goto("bookings",{})} style={{background:C.bgCard,color:C.ink,border:`1px solid ${C.border}`,borderRadius:12,padding:"11px 20px",cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"'Sora',sans-serif"}}>{t.myBookings}</button>
          <button onClick={()=>goto("home",{})} style={{background:C.accent,color:"#fff",border:"none",borderRadius:12,padding:"11px 20px",cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"'Sora',sans-serif"}}>{t.home}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.bg,overflow:"hidden"}}>
      <div style={{padding:"16px 16px 12px",flexShrink:0,borderBottom:`1px solid ${C.border}`,background:C.bg}}>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:12}}><BackBtn onPress={()=>goto("staff",{shop,service})}/><div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:C.ink}}>{t.selectTime}</div><div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{svcName} · {staff.id==="any"?t.availableStaff:staff.name}</div></div></div>
        <ProgressBar step={3} t={t}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12}}>
          <button onClick={()=>setWeekOff(w=>w-1)} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:10,padding:"7px 10px",cursor:"pointer",color:C.ink,display:"flex",alignItems:"center"}}><ChevronLeft size={16}/></button>
          <div style={{textAlign:"center"}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:C.ink}}>{monthLabel()}</div><div style={{fontSize:10,color:C.inkLight,fontFamily:"'Sora',sans-serif"}}>{weekOff===0?t.thisWeek:t.weekOffset(weekOff)}</div></div>
          <button onClick={()=>setWeekOff(w=>w+1)} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:10,padding:"7px 10px",cursor:"pointer",color:C.ink,display:"flex",alignItems:"center"}}><ChevronRight size={16}/></button>
        </div>
      </div>
      <div style={{flex:1,overflow:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"52px repeat(7,1fr)",minWidth:340}}>
          <div style={{padding:"10px 0"}}/>
          {dates.map((d,i)=>{
            const isT=d.toDateString()===today.toDateString();
            const iP=isPast(d)||isDayOff(d)||isStaffUnavail(d);
            return(
              <div key={i} style={{padding:"10px 4px 8px",textAlign:"center",borderBottom:`2px solid ${isT?C.accent:C.border}`,opacity:iP?0.35:1}}>
                <div style={{fontSize:10,color:isT?C.accent:C.inkMid,fontFamily:"'Sora',sans-serif",fontWeight:600}}>{t.days[d.getDay()]}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:isT?C.accent:C.ink}}>{d.getDate()}</div>
                {(isDayOff(d)||isStaffUnavail(d))&&!isPast(d)&&<div style={{fontSize:7,color:"#999",fontFamily:"'Sora',sans-serif",lineHeight:1}}>kapalı</div>}
              </div>
            );
          })}
          {slots.map((slot,sIdx)=>(
            <React.Fragment key={sIdx}>
              <div style={{height:42,display:"flex",alignItems:"center",justifyContent:"flex-end",fontSize:9,color:C.inkLight,fontFamily:"'Sora',sans-serif",borderBottom:`1px solid ${C.border}`,padding:"0 6px 0 2px"}}>{slot}</div>
              {dates.map((date,dIdx)=>{
                const booked=isBooked(dIdx,sIdx);
                const past=isPast(date)||isDayOff(date)||isStaffUnavail(date);
                const isSel=picked&&picked[0]===dIdx&&picked[1]===sIdx;
                const disabled=booked||past;
                return(
                  <div key={`${dIdx}-${sIdx}`} onClick={()=>!disabled&&setPicked([dIdx,sIdx])} style={{height:42,cursor:disabled?"default":"pointer",background:isSel?C.accent:booked?"#F0EDE8":"transparent",borderBottom:`1px solid ${C.border}`,borderLeft:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",opacity:past?0.25:1}} onMouseEnter={e=>{if(!disabled&&!isSel)e.currentTarget.style.background="#FFF0EB";}} onMouseLeave={e=>{if(!disabled&&!isSel)e.currentTarget.style.background="transparent";}}>
                    {booked&&<div style={{width:5,height:5,borderRadius:"50%",background:"#C8C4BB"}}/>}
                    {isSel&&<Check size={13} color="#fff" strokeWidth={3}/>}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
      {picked&&(
        <div style={{padding:"12px 16px",borderTop:`1px solid ${C.border}`,background:C.bg,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{t.selectedTime}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:C.ink}}>{t.days[dates[picked[0]].getDay()]}, {dates[picked[0]].getDate()} {t.months[dates[picked[0]].getMonth()]} · {slots[picked[1]]}</div>
            <div style={{fontSize:12,color:C.accent,fontFamily:"'Sora',sans-serif",fontWeight:600}}>₺{service.price}</div>
          </div>
          <button onClick={()=>setConfirmed(true)} style={{background:C.accent,color:"#fff",border:"none",borderRadius:14,padding:"12px 22px",cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"'Sora',sans-serif",boxShadow:`0 4px 16px ${C.accent}44`}}>{t.confirmBtn}</button>
        </div>
      )}
    </div>
  );
}

// ─── BUSINESS DASHBOARD ───────────────────────────────────────────────────────
function BusinessDashboard({goto,user,onLogout,lang,setLang,t,shopServices,setShopServices,shopStaff,setShopStaff,shopAvailability,setShopAvailability,allBookings,setAllBookings,customShops,setCustomShops}) {
  const [tab,setTab]=useState("appointments");
  // Hem SHOPS_INIT'te hem customShops'ta ara
  const shopBase=SHOPS_INIT.find(s=>s.id===user.shopId)||customShops?.find(s=>s.id===user.shopId)||SHOPS_INIT[0];
  const liveShop={...shopBase,services:shopServices[shopBase.id]||shopBase.services,staff:shopStaff[shopBase.id]||shopBase.staff};

  const tabs=[
    {id:"appointments",label:t.businessAppointments,icon:Calendar},
    {id:"pricelist",label:t.businessPriceList,icon:List},
    {id:"staff",label:t.businessStaff,icon:User},
    {id:"availability",label:t.businessAvailability,icon:Clock},
    {id:"shopinfo",label:t.lang==="en"?"Info":"Bilgiler",icon:Info},
    {id:"profile",label:t.profileTitle,icon:User},
  ];
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:C.bg,overflow:"hidden"}}>
      <div style={{padding:"18px 20px 12px",background:C.bgCard,borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:C.ink}}>{liveShop.name}</div><div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{t.businessDashboard}</div></div>
          <button onClick={onLogout} style={{width:36,height:36,borderRadius:12,background:C.bg,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><LogOut size={15} color={C.inkMid}/></button>
        </div>
      </div>
      <div style={{display:"flex",background:C.bgCard,borderBottom:`1px solid ${C.border}`,flexShrink:0,overflowX:"auto"}}>
        {tabs.map(tab_=>{const Icon=tab_.icon;const active=tab===tab_.id;return(
          <button key={tab_.id} onClick={()=>setTab(tab_.id)} style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 4px 12px",border:"none",background:"transparent",borderBottom:`2px solid ${active?C.accent:"transparent"}`,cursor:"pointer"}}>
            <Icon size={17} color={active?C.accent:C.inkLight}/><span style={{fontSize:9,fontFamily:"'Sora',sans-serif",fontWeight:active?600:400,color:active?C.accent:C.inkLight,whiteSpace:"nowrap"}}>{tab_.label}</span>
          </button>
        );})}
      </div>
      <div style={{flex:1,overflowY:"auto"}}>
        {tab==="appointments"&&<BizAppointments shop={liveShop} t={t} allBookings={allBookings} setAllBookings={setAllBookings}/>}
        {tab==="pricelist"&&<BizPriceList shop={liveShop} t={t} shopServices={shopServices} setShopServices={setShopServices}/>}
        {tab==="staff"&&<BizStaff shop={liveShop} t={t} shopStaff={shopStaff} setShopStaff={setShopStaff}/>}
        {tab==="availability"&&<BizAvailability shop={liveShop} t={t} lang={lang} shopStaff={shopStaff} shopAvailability={shopAvailability} setShopAvailability={setShopAvailability}/>}
        {tab==="shopinfo"&&<BizShopInfo shop={liveShop} t={t} customShops={customShops} setCustomShops={setCustomShops} shopBase={shopBase}/>}
        {tab==="profile"&&<ProfileScreen user={user} onLogout={onLogout} lang={lang} setLang={setLang} t={t}/>}
      </div>
    </div>
  );
}

function BizAppointments({shop,t,allBookings,setAllBookings}) {
  const shopBookings=allBookings.filter(b=>b.shop?.id===shop.id||b.shop?.name===shop.name);
  const pending=shopBookings.filter(b=>b.status==="pending");
  const confirmed=shopBookings.filter(b=>b.status==="upcoming");

  const approve=(id)=>setAllBookings(p=>p.map(b=>b.id===id?{...b,status:"upcoming"}:b));
  const reject=(id)=>setAllBookings(p=>p.map(b=>b.id===id?{...b,status:"rejected"}:b));

  const mockAppts=[
    {id:"ma1",customer:"Ahmet Y.",service:shop.services[0],time:"10:00",status:"pending",date:t.lang==="en"?"Today":"Bugün"},
    {id:"ma2",customer:"Mehmet K.",service:shop.services[1]||shop.services[0],time:"11:30",status:"confirmed",date:t.lang==="en"?"Today":"Bugün"},
    {id:"ma3",customer:"Fatma S.",service:shop.services[0],time:"14:00",status:"confirmed",date:t.lang==="en"?"Tomorrow":"Yarın"},
  ];
  const displayAppts=[...pending.map(b=>({id:b.id,customer:b.staff?.id==="any"?"Müşteri":b.staff?.name||"Müşteri",service:b.service,time:b.time,status:"pending",date:b.date,real:true})),...confirmed.map(b=>({id:b.id,customer:"Müşteri",service:b.service,time:b.time,status:"confirmed",date:b.date,real:true})),...(shopBookings.length===0?mockAppts:[])];

  return (
    <div style={{padding:"16px"}}>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        {[{label:t.totalToday,val:String(displayAppts.filter(a=>a.date===(t.lang==="en"?"Today":"Bugün")).length||"2"),color:C.accent},{label:t.confirmedLabel,val:String(confirmed.length||"6"),color:C.success},{label:t.pendingLabel,val:String(pending.length||"1"),color:C.warning}].map(s=>(
          <div key={s.label} style={{flex:1,background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:"10px 8px",textAlign:"center"}}>
            <div style={{fontSize:20,fontWeight:700,fontFamily:"'Playfair Display',serif",color:s.color}}>{s.val}</div>
            <div style={{fontSize:9,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2,lineHeight:1.2}}>{s.label}</div>
          </div>
        ))}
      </div>
      {pending.length>0&&<div style={{marginBottom:12}}>
        <div style={{fontSize:12,fontWeight:700,color:C.warning,fontFamily:"'Sora',sans-serif",marginBottom:8}}>⏳ {t.pendingLabel}</div>
        {pending.map(b=>{
          const svcName=typeof b.service.name==="object"?(t.lang==="en"?b.service.name.en:b.service.name.tr):b.service.name;
          return(
            <div key={b.id} style={{background:C.warningLight,border:`1px solid ${C.warning}44`,borderRadius:14,padding:"12px 14px",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <AlertCircle size={16} color={C.warning}/>
                <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:C.ink}}>Müşteri</div><div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{svcName} · {b.date} {b.time}</div></div>
                <div style={{fontSize:13,fontWeight:700,color:C.accent,fontFamily:"'Sora',sans-serif"}}>₺{b.price}</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>reject(b.id)} style={{flex:1,padding:"8px 0",background:"#FEE8E8",border:"none",borderRadius:10,cursor:"pointer",fontSize:12,fontFamily:"'Sora',sans-serif",color:"#E05252",fontWeight:600}}>{t.reject}</button>
                <button onClick={()=>approve(b.id)} style={{flex:1,padding:"8px 0",background:C.successLight,border:"none",borderRadius:10,cursor:"pointer",fontSize:12,fontFamily:"'Sora',sans-serif",color:C.success,fontWeight:600}}>{t.approve}</button>
              </div>
            </div>
          );
        })}
      </div>}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {(shopBookings.length===0?mockAppts:confirmed.map(b=>({id:b.id,customer:"Müşteri",service:b.service,time:b.time,status:"confirmed",date:b.date}))).map(appt=>{
          const svcName=typeof appt.service.name==="object"?appt.service.name.tr:appt.service.name;
          return(
            <div key={appt.id} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:40,height:40,borderRadius:12,background:C.successLight,display:"flex",alignItems:"center",justifyContent:"center"}}><CheckCircle size={18} color={C.success}/></div>
              <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:C.ink}}>{appt.customer}</div><div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{svcName}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,fontFamily:"'Sora',sans-serif",color:C.ink}}>{appt.time}</div><div style={{fontSize:10,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{appt.date}</div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BizPriceList({shop,t,shopServices,setShopServices}) {
  const services=shopServices?.[shop.id]??shop.services.map(s=>({...s,name:typeof s.name==="object"?s.name.tr:s.name}));
  const setServices=(updater)=>setShopServices(prev=>({...prev,[shop.id]:typeof updater==="function"?updater(prev[shop.id]??services):updater}));
  const [adding,setAdding]=useState(false);
  const [newSvc,setNewSvc]=useState({name:"",duration:"",price:""});
  const addService=()=>{if(!newSvc.name||!newSvc.price)return;setServices(prev=>[...prev,{id:`new${Date.now()}`,name:newSvc.name,duration:parseInt(newSvc.duration)||30,price:parseInt(newSvc.price)||0}]);setNewSvc({name:"",duration:"",price:""});setAdding(false);};
  const inp=(w)=>({padding:"8px 10px",border:`1.5px solid ${C.border}`,borderRadius:10,fontSize:12,fontFamily:"'Sora',sans-serif",color:C.ink,background:C.bgCard,outline:"none",width:w||"100%"});
  return (
    <div style={{padding:"16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:C.ink}}>{t.businessPriceList}</div>
        <button onClick={()=>setAdding(true)} style={{display:"flex",alignItems:"center",gap:5,background:C.accent,color:"#fff",border:"none",borderRadius:10,padding:"7px 12px",cursor:"pointer",fontSize:12,fontFamily:"'Sora',sans-serif",fontWeight:600}}><Plus size={13}/>{t.addService}</button>
      </div>
      {adding&&<div style={{background:C.bgCard,border:`1.5px solid ${C.accent}`,borderRadius:14,padding:"14px",marginBottom:12}}>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <input style={inp()} placeholder={t.serviceName} value={newSvc.name} onChange={e=>setNewSvc(p=>({...p,name:e.target.value}))}/>
          <div style={{display:"flex",gap:8}}><input style={inp("50%")} placeholder={t.serviceDuration} type="number" value={newSvc.duration} onChange={e=>setNewSvc(p=>({...p,duration:e.target.value}))}/><input style={inp("50%")} placeholder={t.servicePrice} type="number" value={newSvc.price} onChange={e=>setNewSvc(p=>({...p,price:e.target.value}))}/></div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setAdding(false)} style={{flex:1,padding:"9px 0",background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,cursor:"pointer",fontSize:12,fontFamily:"'Sora',sans-serif",color:C.inkMid}}>{t.cancel}</button>
            <button onClick={addService} style={{flex:1,padding:"9px 0",background:C.accent,border:"none",borderRadius:10,cursor:"pointer",fontSize:12,fontFamily:"'Sora',sans-serif",color:"#fff",fontWeight:700}}>{t.save}</button>
          </div>
        </div>
      </div>}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {services.map(svc=>(
          <div key={svc.id} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
            <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:C.ink}}>{svc.name}</div><div style={{display:"flex",gap:12,marginTop:4}}><div style={{display:"flex",gap:4,alignItems:"center"}}><Clock size={10} color={C.inkMid}/><span style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif"}}>{svc.duration} {t.min}</span></div><div style={{fontSize:12,fontWeight:700,color:C.accent,fontFamily:"'Sora',sans-serif"}}>₺{svc.price}</div></div></div>
            <button onClick={()=>setServices(prev=>prev.filter(s=>s.id!==svc.id))} style={{width:30,height:30,borderRadius:8,background:"#FEE8E8",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Trash2 size={13} color="#E05252"/></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BizStaff({shop,t,shopStaff,setShopStaff}) {
  const staff=shopStaff?.[shop.id]??shop.staff;
  const setStaff=(updater)=>setShopStaff(prev=>({...prev,[shop.id]:typeof updater==="function"?updater(prev[shop.id]??staff):updater}));
  const [adding,setAdding]=useState(false);
  const [newMember,setNewMember]=useState({name:"",title:"",rating:5});
  const addMember=()=>{if(!newMember.name)return;const initials=newMember.name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);setStaff(prev=>[...prev,{id:Date.now(),name:newMember.name,title:{tr:newMember.title,en:newMember.title},rating:parseFloat(newMember.rating)||5,img:initials,avail:true}]);setNewMember({name:"",title:"",rating:5});setAdding(false);};
  const inp=(w)=>({padding:"8px 10px",border:`1.5px solid ${C.border}`,borderRadius:10,fontSize:12,fontFamily:"'Sora',sans-serif",color:C.ink,background:C.bgCard,outline:"none",width:w||"100%"});
  return (
    <div style={{padding:"16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:C.ink}}>{t.businessStaff}</div>
        <button onClick={()=>setAdding(true)} style={{display:"flex",alignItems:"center",gap:5,background:C.accent,color:"#fff",border:"none",borderRadius:10,padding:"7px 12px",cursor:"pointer",fontSize:12,fontFamily:"'Sora',sans-serif",fontWeight:600}}><Plus size={13}/>{t.addStaff}</button>
      </div>
      {adding&&<div style={{background:C.bgCard,border:`1.5px solid ${C.accent}`,borderRadius:14,padding:"14px",marginBottom:12}}>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <input style={inp()} placeholder={t.staffName} value={newMember.name} onChange={e=>setNewMember(p=>({...p,name:e.target.value}))}/>
          <input style={inp()} placeholder={t.staffTitle} value={newMember.title} onChange={e=>setNewMember(p=>({...p,title:e.target.value}))}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setAdding(false)} style={{flex:1,padding:"9px 0",background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,cursor:"pointer",fontSize:12,fontFamily:"'Sora',sans-serif",color:C.inkMid}}>{t.cancel}</button>
            <button onClick={addMember} style={{flex:1,padding:"9px 0",background:C.accent,border:"none",borderRadius:10,cursor:"pointer",fontSize:12,fontFamily:"'Sora',sans-serif",color:"#fff",fontWeight:700}}>{t.save}</button>
          </div>
        </div>
      </div>}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {staff.map(member=>{
          const title=typeof member.title==="object"?member.title.tr:member.title;
          return(
            <div key={member.id} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 14px",display:"flex",gap:12,alignItems:"center"}}>
              <Avatar ini={member.img} size={44} bg={`hsl(${member.id*53%360},25%,85%)`}/>
              <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:C.ink}}>{member.name}</div><div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginTop:2}}>{title}</div><RatingStars r={member.rating}/></div>
              <button onClick={()=>setStaff(prev=>prev.filter(s=>s.id!==member.id))} style={{width:30,height:30,borderRadius:8,background:"#FEE8E8",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Trash2 size={13} color="#E05252"/></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BizAvailability({shop,t,lang,shopStaff,shopAvailability,setShopAvailability}) {
  const avail=shopAvailability?.[shop.id]||{};
  const setAvail=(updater)=>setShopAvailability(prev=>({...prev,[shop.id]:typeof updater==="function"?updater(prev[shop.id]||{}):updater}));

  const workDays=avail.workDays||[false,true,true,true,true,true,false];
  const startHour=avail.startHour??9;
  const endHour=avail.endHour??18;
  const slotMin=avail.slotMin??30;
  const dayKeys=lang==="en"?["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]:["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"];

  const setWorkDays=(i)=>setAvail(prev=>{const w=[...(prev.workDays||[false,true,true,true,true,true,false])];w[i]=!w[i];return{...prev,workDays:w};});
  const setStartHour=(h)=>setAvail(prev=>({...prev,startHour:h}));
  const setEndHour=(h)=>setAvail(prev=>({...prev,endHour:h}));
  const setSlotMin=(m)=>setAvail(prev=>({...prev,slotMin:m}));

  const staff=shopStaff?.[shop.id]||shop.staff;
  const [selStaff,setSelStaff]=useState(staff[0]?.id||null);
  const [newDate,setNewDate]=useState("");

  const staffAvail=(sid)=>avail[sid]||{unavailableDates:[]};
  const addUnavail=(sid,dateStr)=>{if(!dateStr)return;setAvail(prev=>{const sa=prev[sid]||{unavailableDates:[]};return{...prev,[sid]:{...sa,unavailableDates:[...(sa.unavailableDates||[]),dateStr].filter((v,i,a)=>a.indexOf(v)===i)}};});setNewDate("");};
  const removeUnavail=(sid,dateStr)=>setAvail(prev=>{const sa=prev[sid]||{unavailableDates:[]};return{...prev,[sid]:{...sa,unavailableDates:(sa.unavailableDates||[]).filter(d=>d!==dateStr)}};});

  const selStyle={padding:"8px 12px",border:`1.5px solid ${C.border}`,borderRadius:10,fontSize:13,fontFamily:"'Sora',sans-serif",color:C.ink,background:C.bgCard,outline:"none"};
  const fmtH=(h)=>lang==="en"?formatTime(h,0,"en"):`${String(h).padStart(2,"0")}:00`;

  return (
    <div style={{padding:"16px"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:C.ink,marginBottom:14}}>{t.availabilityTitle}</div>

      {/* Work days */}
      <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"14px 16px",marginBottom:12}}>
        <div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:12,fontWeight:600}}>{t.workDays}</div>
        <div style={{display:"flex",gap:6,justifyContent:"space-between"}}>
          {dayKeys.map((day,i)=><button key={i} onClick={()=>setWorkDays(i)} style={{width:36,height:36,borderRadius:10,background:workDays[i]?C.accent:C.bg,border:`1.5px solid ${workDays[i]?C.accent:C.border}`,color:workDays[i]?"#fff":C.inkMid,fontSize:11,fontFamily:"'Sora',sans-serif",fontWeight:workDays[i]?700:400,cursor:"pointer"}}>{day.slice(0,2)}</button>)}
        </div>
      </div>

      {/* Work hours */}
      <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"14px 16px",marginBottom:12}}>
        <div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:12,fontWeight:600}}>{t.workHours}</div>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <select value={startHour} onChange={e=>setStartHour(Number(e.target.value))} style={selStyle}>{Array.from({length:12},(_,i)=>i+6).map(h=><option key={h} value={h}>{fmtH(h)}</option>)}</select>
          <span style={{color:C.inkMid}}>–</span>
          <select value={endHour} onChange={e=>setEndHour(Number(e.target.value))} style={selStyle}>{Array.from({length:12},(_,i)=>i+12).map(h=><option key={h} value={h}>{fmtH(h)}</option>)}</select>
        </div>
      </div>

      {/* Slot duration */}
      <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"14px 16px",marginBottom:16}}>
        <div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:10,fontWeight:600}}>{t.slotDuration}</div>
        <div style={{display:"flex",gap:8}}>
          {[15,30,45,60].map(m=><button key={m} onClick={()=>setSlotMin(m)} style={{flex:1,padding:"9px 0",borderRadius:10,background:slotMin===m?C.accent:C.bg,color:slotMin===m?"#fff":C.inkMid,border:`1.5px solid ${slotMin===m?C.accent:C.border}`,fontSize:12,fontFamily:"'Sora',sans-serif",cursor:"pointer"}}>{m} {t.min}</button>)}
        </div>
      </div>

      {/* Per-staff unavailability */}
      <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"14px 16px",marginBottom:16}}>
        <div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:12,fontWeight:600}}>{t.staffUnavailable}</div>
        <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:14}}>
          {staff.map(m=><button key={m.id} onClick={()=>setSelStaff(m.id)} style={{padding:"6px 12px",borderRadius:10,border:`1.5px solid ${selStaff===m.id?C.accent:C.border}`,background:selStaff===m.id?C.accentLight:C.bg,fontSize:11,fontFamily:"'Sora',sans-serif",cursor:"pointer",color:selStaff===m.id?C.accent:C.inkMid,fontWeight:selStaff===m.id?600:400,whiteSpace:"nowrap"}}>{m.name}</button>)}
        </div>
        {selStaff&&<>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <input type="date" value={newDate} onChange={e=>setNewDate(e.target.value)} style={{flex:1,padding:"8px 10px",border:`1.5px solid ${C.border}`,borderRadius:10,fontSize:12,fontFamily:"'Sora',sans-serif",color:C.ink,background:C.bgCard,outline:"none"}}/>
            <button onClick={()=>addUnavail(selStaff,newDate)} style={{padding:"8px 14px",background:C.accent,color:"#fff",border:"none",borderRadius:10,cursor:"pointer",fontSize:12,fontFamily:"'Sora',sans-serif",fontWeight:600}}>{t.addUnavailable}</button>
          </div>
          {(staffAvail(selStaff).unavailableDates||[]).length===0?<div style={{fontSize:11,color:C.inkLight,fontFamily:"'Sora',sans-serif",textAlign:"center",padding:"8px 0"}}>{t.noUnavailable}</div>:
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {(staffAvail(selStaff).unavailableDates||[]).map(d=>(
              <div key={d} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:C.bg,borderRadius:10,border:`1px solid ${C.border}`}}>
                <span style={{fontSize:12,fontFamily:"'Sora',sans-serif",color:C.ink}}>{d}</span>
                <button onClick={()=>removeUnavail(selStaff,d)} style={{width:24,height:24,borderRadius:6,background:"#FEE8E8",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><X size={11} color="#E05252"/></button>
              </div>
            ))}
          </div>}
        </>}
      </div>
    </div>
  );
}

function BizShopInfo({shop,t,customShops,setCustomShops,shopBase}) {
  const [name,setName]=useState(shop.name||"");
  const [address,setAddress]=useState(shop.address||"");
  const [phone,setPhone]=useState(shop.phone||"");
  const [desc,setDesc]=useState(typeof shop.description==="object"?shop.description.tr:shop.description||"");
  const [saved,setSaved]=useState(false);

  const inp={width:"100%",padding:"10px 12px",border:`1.5px solid ${C.border}`,borderRadius:12,fontSize:13,fontFamily:"'Sora',sans-serif",color:C.ink,background:C.bg,outline:"none"};

  const handleSave=()=>{
    // customShops'ta varsa güncelle, yoksa SHOPS_INIT dükkanı (demo) — sadece customShops'takiler güncellenebilir
    setCustomShops(prev=>prev.map(s=>s.id===shop.id?{...s,name,address,phone,description:{tr:desc,en:desc}}:s));
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  };

  return (
    <div style={{padding:"16px"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:C.ink,marginBottom:14}}>
        {t.lang==="en"?"Business Info":"İşletme Bilgileri"}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div>
          <div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:6,fontWeight:600}}>{t.lang==="en"?"Business Name":"İşletme Adı"}</div>
          <input style={inp} value={name} onChange={e=>setName(e.target.value)} placeholder="Maestro Kuaför"/>
        </div>
        <div>
          <div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:6,fontWeight:600}}>{t.lang==="en"?"Address":"Adres"}</div>
          <input style={inp} value={address} onChange={e=>setAddress(e.target.value)} placeholder="Şişli, İstanbul"/>
        </div>
        <div>
          <div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:6,fontWeight:600}}>{t.lang==="en"?"Phone":"Telefon"}</div>
          <input style={inp} type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+90 212 000 0000"/>
        </div>
        <div>
          <div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:6,fontWeight:600}}>{t.lang==="en"?"About / Description":"Hakkında / Açıklama"}</div>
          <textarea style={{...inp,resize:"vertical",minHeight:88,lineHeight:1.6}} value={desc} onChange={e=>setDesc(e.target.value)} placeholder={t.lang==="en"?"Tell customers about your business...":"İşletmeniz hakkında kısa bir açıklama..."}/>
        </div>

        {/* Önizleme */}
        {(desc||phone)&&<div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 14px"}}>
          <div style={{fontSize:11,color:C.inkMid,fontFamily:"'Sora',sans-serif",marginBottom:8,fontWeight:600}}>
            👁 {t.lang==="en"?"Preview (customer view)":"Önizleme (müşteri görünümü)"}
          </div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:C.ink,marginBottom:4}}>{name}</div>
          {phone&&<div style={{display:"flex",gap:5,alignItems:"center",marginBottom:4}}><span style={{fontSize:11,color:C.inkMid}}>📞 {phone}</span></div>}
          {address&&<div style={{fontSize:11,color:C.inkMid,marginBottom:4}}>📍 {address}</div>}
          {desc&&<div style={{fontSize:12,color:C.inkMid,fontFamily:"'Sora',sans-serif",lineHeight:1.5,marginTop:6,paddingTop:6,borderTop:`1px solid ${C.border}`}}>{desc}</div>}
        </div>}

        <button onClick={handleSave} style={{
          width:"100%",background:saved?C.success:C.accent,color:"#fff",border:"none",
          borderRadius:13,padding:"13px 0",fontSize:14,fontWeight:700,
          fontFamily:"'Sora',sans-serif",cursor:"pointer",
          boxShadow:`0 6px 20px ${saved?C.success:C.accent}44`,
          transition:"background 0.3s",
        }}>
          {saved?(t.lang==="en"?"✓ Saved!":"✓ Kaydedildi!"):t.save}
        </button>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({screen,goto,t}) {
  const items=[{id:"home",label:t.navHome,icon:Home},{id:"search",label:t.navExplore,icon:Search},{id:"bookings",label:t.navBookings,icon:Calendar},{id:"profile",label:t.navProfile,icon:User}];
  return (
    <div style={{display:"flex",borderTop:`1px solid ${C.border}`,background:C.bgCard,flexShrink:0}}>
      {items.map(item=>{const Icon=item.icon;const isActive=screen===item.id;return(
        <button key={item.id} onClick={()=>goto(item.id,{})} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 0 12px",border:"none",background:"transparent",cursor:"pointer"}}>
          <Icon size={20} color={isActive?C.accent:C.inkLight} strokeWidth={isActive?2.5:1.5}/><span style={{fontSize:10,fontFamily:"'Sora',sans-serif",fontWeight:isActive?600:400,color:isActive?C.accent:C.inkLight}}>{item.label}</span>
        </button>
      );})}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
const DEMO_USERS = [
  {id:"demo_c",email:"musteri@demo.com",password:"demo",name:"Ahmet Yılmaz",type:"customer"},
  {id:"demo_b",email:"isletme@demo.com",password:"demo",name:"Maestro Kuaför",type:"business",shopId:1},
];


export default function App() {
  const [screen,setScreen]=useState("login");
  const [params,setParams]=useState({});
  const [user,setUser]=useState(null);
  const [lang,setLang]=useState("tr");
  const [users,setUsers]=useState(DEMO_USERS);
  const [allBookings,setAllBookings]=useState([]);
  const [userLocation,setUserLocation]=useState(null);

  const [shopServices,setShopServices]=useState(()=>{const m={};SHOPS_INIT.forEach(s=>{m[s.id]=s.services.map(svc=>({...svc,name:typeof svc.name==="object"?svc.name.tr:svc.name}));});return m;});
  const [shopStaff,setShopStaff]=useState(()=>{const m={};SHOPS_INIT.forEach(s=>{m[s.id]=s.staff;});return m;});
  const [shopAvailability,setShopAvailability]=useState(()=>{const m={};SHOPS_INIT.forEach(s=>{m[s.id]={workDays:[false,true,true,true,true,true,false],startHour:9,endHour:18,slotMin:s.slotMin};});return m;});
  // Yeni kaydolan işletmecilerin dükkan verileri
  const [customShops,setCustomShops]=useState([]);

  // Tüm dükkanlar = SHOPS_INIT + yeni oluşturulanlar
  const allShops=[...SHOPS_INIT,...customShops];

  const enrichShop=(shop)=>{
    const base=allShops.find(s=>s.id===shop.id)||shop;
    return {
      ...base,
      ...shop,
      services:shopServices[shop.id]??shop.services??base.services,
      staff:shopStaff[shop.id]??shop.staff??base.staff,
      phone:shop.phone||base.phone,
      description:shop.description||base.description,
    };
  };
  const enrichedParams=params?.shop?{...params,shop:enrichShop(params.shop)}:params;

  // Konum — iframe/sandbox'ta çalışmayabilir, sessizce fail et
  useEffect(()=>{
    try{
      if(typeof navigator!=="undefined"&&navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          pos=>setUserLocation({lat:pos.coords.latitude,lng:pos.coords.longitude}),
          ()=>setUserLocation(null),
          {timeout:8000,maximumAge:120000,enableHighAccuracy:false}
        );
      }
    }catch(e){}
  },[]);

  const t={...T[lang],lang};
  const goto=(s,p)=>{setScreen(s);setParams(p||{});};
  const handleLogin=(u)=>{
    setUser(u);
    // Yeni işletmeci kaydolunca shopData'sını state'e ekle
    if(u.type==="business"&&u.shopData){
      const sd=u.shopData;
      setCustomShops(prev=>{
        if(prev.find(s=>s.id===sd.id)) return prev;
        return [...prev,sd];
      });
      setShopServices(prev=>prev[sd.id]?prev:{...prev,[sd.id]:sd.services||[]});
      setShopStaff(prev=>prev[sd.id]?prev:{...prev,[sd.id]:sd.staff||[]});
      setShopAvailability(prev=>prev[sd.id]?prev:{...prev,[sd.id]:{workDays:[false,true,true,true,true,true,false],startHour:9,endHour:18,slotMin:30}});
    }
    setScreen(u.type==="business"?"business":"home");
  };
  const handleLogout=()=>{setUser(null);setScreen("login");};
  const addBooking=(b)=>setAllBookings(prev=>[b,...prev]);
  const handleRate=(id,rating)=>setAllBookings(prev=>prev.map(b=>b.id===id?{...b,rated:rating}:b));

  const showNav=["home","search","bookings","profile"].includes(screen);

  const renderScreen=()=>{
    if(screen==="login") return <LoginScreen onLogin={handleLogin} t={t} users={users} setUsers={setUsers}/>;
    if(screen==="business") return <BusinessDashboard goto={goto} user={user} onLogout={handleLogout} lang={lang} setLang={setLang} t={t} shopServices={shopServices} setShopServices={setShopServices} shopStaff={shopStaff} setShopStaff={setShopStaff} shopAvailability={shopAvailability} setShopAvailability={setShopAvailability} allBookings={allBookings} setAllBookings={setAllBookings} customShops={customShops} setCustomShops={setCustomShops}/>;
    switch(screen){
      case "home":     return <HomeScreen goto={goto} t={t} user={user} enrichShop={enrichShop} userLocation={userLocation} allShops={allShops}/>;
      case "search":   return <SearchScreen goto={goto} params={params} t={t} enrichShop={enrichShop} userLocation={userLocation} allShops={allShops}/>;
      case "shop":     return <ShopScreen goto={goto} params={enrichedParams} t={t}/>;
      case "service":  return <ServiceScreen goto={goto} params={enrichedParams} t={t}/>;
      case "staff":    return <StaffScreen goto={goto} params={enrichedParams} t={t} shopAvailability={shopAvailability}/>;
      case "calendar": return <CalendarScreen goto={goto} params={enrichedParams} t={t} addBooking={addBooking} shopAvailability={shopAvailability}/>;
      case "bookings": return <BookingsScreen goto={goto} t={t} bookings={allBookings} onRate={handleRate}/>;
      case "profile":  return <ProfileScreen user={user} onLogout={handleLogout} lang={lang} setLang={l=>setLang(l)} t={t}/>;
      default:         return <HomeScreen goto={goto} t={t} user={user} enrichShop={enrichShop} userLocation={userLocation} allShops={allShops}/>;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Sora:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#2A2520;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:#DDD9D4;border-radius:4px;}
        @keyframes pop{0%{transform:scale(0.5);opacity:0;}70%{transform:scale(1.15);}100%{transform:scale(1);opacity:1;}}
        @keyframes slideUp{from{transform:translateY(12px);opacity:0;}to{transform:translateY(0);opacity:1;}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
        select{-webkit-appearance:auto;}
      `}</style>
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#2A2520 0%,#1A1512 100%)",padding:16,fontFamily:"'Sora',sans-serif"}}>
        <div style={{width:393,height:812,background:C.bg,borderRadius:48,border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 50px 100px rgba(0,0,0,0.6)",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative",animation:"fadeIn 0.5s ease"}}>
          <div style={{padding:"16px 28px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0,background:C.bg}}>
            <span style={{fontSize:13,fontWeight:600,color:C.ink,fontFamily:"'Sora',sans-serif"}}>9:41</span>
            <div style={{width:90,height:24,background:"#1A1714",borderRadius:99,opacity:0.08}}/>
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              {[3,4,5].map(h=><div key={h} style={{width:3,height:h,background:C.inkMid,borderRadius:2}}/>)}
              <div style={{width:22,height:11,border:`1.5px solid ${C.inkMid}`,borderRadius:3,marginLeft:3,position:"relative"}}><div style={{position:"absolute",right:-5,top:"50%",transform:"translateY(-50%)",width:4,height:6,background:C.inkMid,borderRadius:"0 2px 2px 0"}}/><div style={{margin:2,height:"60%",background:C.ink,borderRadius:1}}/></div>
            </div>
          </div>
          <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",position:"relative"}}>{renderScreen()}</div>
          {showNav&&<BottomNav screen={screen} goto={goto} t={t}/>}
          <div style={{display:"flex",justifyContent:"center",padding:"8px 0 14px",background:C.bg,flexShrink:0}}><div style={{width:120,height:5,borderRadius:99,background:"#DDD9D4"}}/></div>
        </div>
      </div>
    </>
  );
}
