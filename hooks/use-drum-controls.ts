'use client';
import {useEffect,useRef,useState} from 'react';
import {createDrumKeyboard} from '../lib/drum-controls';
export function useDrumControls(enabled:boolean,onHit:(pad:number)=>void){const hit=useRef(onHit),[lit,setLit]=useState<Set<number>>(()=>new Set()),timers=useRef(new Map<number,ReturnType<typeof setTimeout>>());hit.current=onHit;
function pulse(pad:number){const old=timers.current.get(pad);if(old)clearTimeout(old);setLit(previous=>new Set([...previous,pad]));timers.current.set(pad,setTimeout(()=>{timers.current.delete(pad);setLit(previous=>{const next=new Set(previous);next.delete(pad);return next})},160))}
useEffect(()=>{if(!enabled)return;const keyboard=createDrumKeyboard(pad=>hit.current(pad),event=>{const target=event.target;return target instanceof Element&&!!target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="textbox"],[role="dialog"]')});const down=(e:KeyboardEvent)=>keyboard.down(e),up=(e:KeyboardEvent)=>keyboard.up(e),reset=()=>keyboard.reset();window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',reset);document.addEventListener('visibilitychange',reset);return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',reset);document.removeEventListener('visibilitychange',reset);keyboard.reset()}},[enabled]);
useEffect(()=>()=>{timers.current.forEach(clearTimeout);timers.current.clear()},[]);
return {lit,pulse};}
