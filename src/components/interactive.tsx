'use client';
import {useEffect,useRef,useState} from 'react';
import {booking,href,locales,pages,type Locale,type Page} from '@/lib/site';
import type {Copy} from '@/lib/translations';
function useScrollLock(open:boolean){
 useEffect(()=>{
  if(!open)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=previous;};
 },[open]);
}
export function MobileMenu({locale,page,c}:{locale:Locale;page:Page;c:Copy}){
 const ref=useRef<HTMLDialogElement>(null);const trigger=useRef<HTMLButtonElement>(null);const [open,setOpen]=useState(false);
 function close(){ref.current?.close();setOpen(false);trigger.current?.focus();}
 useScrollLock(open);
 useEffect(()=>{
  const desktop=matchMedia('(min-width: 901px)');
  const dismiss=()=>{if(desktop.matches){ref.current?.close();setOpen(false);}};
  desktop.addEventListener('change',dismiss);
  return()=>desktop.removeEventListener('change',dismiss);
 },[]);
 return <><button ref={trigger} className="menu-toggle" aria-label={c.menu} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>{ref.current?.showModal();setOpen(true);}}><span/><span/></button><dialog id="mobile-menu" ref={ref} className="mobile-dialog" aria-label={c.menu} onClose={()=>{setOpen(false);trigger.current?.focus();}} onClick={e=>{if(e.target===ref.current)close();}}><div className="menu-head"><span className="wordmark" dir="ltr">spray tan <i>israel</i></span><button onClick={close} className="icon-button" aria-label={c.close}>×</button></div><nav aria-label={c.menu}>{pages.map(p=><a key={p} href={href(locale,p)} aria-current={p===page?'page':undefined}>{c.nav[p]}<span aria-hidden="true">↗</span></a>)}</nav><div className="language-list">{locales.map(l=><a key={l} href={href(l,page)} lang={l} hrefLang={l} aria-current={l===locale?'true':undefined}>{({en:'English',he:'עברית',fr:'Français',ru:'Русский'})[l]}</a>)}</div><a className="button dark" href={booking(locale)}>{c.book}<span aria-hidden="true">↗</span></a></dialog></>;
}
export function Gallery({c,locale,full=false}:{c:Copy;locale:Locale;full?:boolean}){
 const names=full?['bride','man','express','lashes']:['bride','man','express'];const [index,setIndex]=useState(0);const [openState,setOpenState]=useState(false);const rtl=locale==='he';
 useScrollLock(openState);const dialog=useRef<HTMLDialogElement>(null);const opener=useRef<HTMLButtonElement|null>(null);
 function open(i:number,button:HTMLButtonElement){setIndex(i);opener.current=button;dialog.current?.showModal();setOpenState(true);}
 function close(){dialog.current?.close();setOpenState(false);opener.current?.focus();}
 return <><div className={`gallery-grid ${full?'full-gallery':''}`}>{names.map((name,i)=><figure key={name}><button className="gallery-image" aria-label={`${c.openImage}: ${c.galleryLabels[i]}`} onClick={e=>open(i,e.currentTarget)}><img src={`/${name}-900.webp`} srcSet={`/${name}-480.webp 480w, /${name}-900.webp 900w`} sizes={full?"(max-width: 600px) 44vw, 45vw":"(max-width: 900px) 44vw, 31vw"} alt={c.galleryAlt[i]} width={900} height={1125} loading="lazy"/><span className="image-plus" aria-hidden="true">+</span></button><figcaption><span>0{i+1}</span>{c.galleryLabels[i]}</figcaption></figure>)}</div><dialog ref={dialog} className="lightbox" aria-label={c.nav.gallery} onClose={()=>{setOpenState(false);opener.current?.focus();}} onClick={e=>{if(e.target===dialog.current)close();}} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const forward=rtl?e.key==='ArrowLeft':e.key==='ArrowRight';setIndex(i=>(i+(forward?1:names.length-1))%names.length);}}}><button className="lightbox-close icon-button" onClick={close} aria-label={c.close}>×</button><img src={`/${names[index]}-900.webp`} alt={c.galleryAlt[index]} width="900" height="1125"/><div className="lightbox-controls"><button aria-label={c.previous} onClick={()=>setIndex(i=>(i+names.length-1)%names.length)}>{rtl?'→':'←'}</button><p aria-live="polite" aria-atomic="true">{c.galleryLabels[index]} <span>{index+1} / {names.length}</span></p><button aria-label={c.next} onClick={()=>setIndex(i=>(i+1)%names.length)}>{rtl?'←':'→'}</button></div></dialog></>;
}
export function Reveal(){useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:0.08});document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));return()=>observer.disconnect();},[]);return null;}
