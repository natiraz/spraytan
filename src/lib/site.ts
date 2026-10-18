export const locales = ['en', 'he', 'fr', 'ru'] as const;
export type Locale = typeof locales[number];
export const pages = ['home','about','services','bridal','mobile','gallery','care','faq','contact'] as const;
export type Page = typeof pages[number];
export const business = {name:'Spray Tan Israel',url:'https://spraytantelaviv.com',phone:'+972502922925',whatsapp:'972502922925',email:'spraytanisrael@gmail.com',instagram:'https://www.instagram.com/spraytanisrael/',street:'Dizengoff 218',city:'Tel Aviv',country:'IL',maps:'https://www.google.com/maps/search/?api=1&query=Dizengoff+218+Tel+Aviv+Israel',prices:{signature:180,express:200,trial:120,lashes:300},verified:'2026-10-18'};
export const slugs: Record<Locale, Record<Page,string>> = {
 en:{home:'',about:'about',services:'services',bridal:'bridal-spray-tanning',mobile:'mobile-spray-tanning',gallery:'gallery',care:'preparation-aftercare',faq:'faqs',contact:'contact'},
 he:{home:'',about:'אודות',services:'שירותים',bridal:'שיזוף-לכלות',mobile:'שיזוף-בבית',gallery:'גלריה',care:'הכנה-וטיפול',faq:'שאלות-נפוצות',contact:'יצירת-קשר'},
 fr:{home:'',about:'a-propos',services:'prestations',bridal:'bronzage-mariee',mobile:'bronzage-a-domicile',gallery:'galerie',care:'preparation-et-soins',faq:'questions-frequentes',contact:'contact'},
 ru:{home:'',about:'o-studii',services:'uslugi',bridal:'svadebnyy-zagar',mobile:'zagar-na-domu',gallery:'galereya',care:'podgotovka-i-uhod',faq:'voprosy',contact:'kontakty'}
};
export function href(locale:Locale,page:Page='home'){return '/'+[locale==='en'?'':locale,slugs[locale][page]].filter(Boolean).join('/')+(locale==='en'&&page==='home'?'':'/');}
export function resolvePath(path:string[]=[]):{locale:Locale,page:Page}|null{
 let decoded:string[];
 try{decoded=path.map(p=>decodeURIComponent(p));}catch{return null;}
 const locale:Locale=locales.includes(decoded[0] as Locale)?decoded.shift() as Locale:'en';
 if(decoded.length>1)return null;
 const page=pages.find(p=>slugs[locale][p]===(decoded[0]??''));
 return page?{locale,page}:null;
}
export function booking(locale:Locale,service?:string){
 const messages={en:service?`Hi, I'd like to book: ${service}.`:'Hi, I’d like to book a spray tan at Spray Tan Israel.',he:service?`היי, אשמח לקבוע תור ל${service}.`:'היי, אשמח לקבוע תור לשיזוף בהתזה ב-Spray Tan Israel.',fr:service?`Bonjour, je souhaite réserver : ${service}.`:'Bonjour, je souhaite réserver un spray tan chez Spray Tan Israel.',ru:service?`Здравствуйте! Хочу записаться: ${service}.`:'Здравствуйте! Хочу записаться на моментальный загар в Spray Tan Israel.'};
 return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(messages[locale])}`;
}
