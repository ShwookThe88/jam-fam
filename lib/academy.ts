export type Note={beat:number;pad:number};
export type Performer={id:string;name:string;level:number;seat:number};
export type ShowState={id:string;start:number;bpm:number;beats:number;performers:Performer[];hits:{player:string;n:number;pad:number;delta:number}[]};
export const drumNames=['Kick','Snare','Hi-hat','Floor tom','Clap','Tom','Rim','Crash'];
export const lessons=[
{id:'pulse',title:'Find the pulse',subtitle:'Keep a steady kick drum.',bpm:72,beats:16,tip:'Tap the kick when a note reaches the glowing line.',notes:Array.from({length:8},(_,i)=>({beat:i*2,pad:0}))},
{id:'backbeat',title:'Build the backbeat',subtitle:'Bring kick and snare together.',bpm:80,beats:16,tip:'Alternate kick, snare, kick, snare. Keep the space between them even.',notes:Array.from({length:16},(_,i)=>({beat:i,pad:i%2?1:0}))},
{id:'pocket',title:'Find the pocket',subtitle:'Add the hi-hat to your groove.',bpm:88,beats:16,tip:'Kick, hi-hat, snare, hi-hat. Let the four-beat pattern repeat.',notes:Array.from({length:16},(_,i)=>({beat:i,pad:i%2?2:i%4===0?0:1}))},
{id:'soundcheck',title:'Solo soundcheck',subtitle:'Put it all together. Earn your stage-ready badge.',bpm:96,beats:32,tip:'Stay steady through a full groove. The last crash is your big finish.',notes:Array.from({length:32},(_,i)=>({beat:i,pad:i===31?7:i%2?2:i%4===0?0:1}))}
];
export function showTargets(level:number,seat=0):Note[]{const pads=[0,1,2];return Array.from({length:48},(_,beat)=>{if(level===1)return beat%4===seat%4?{beat,pad:pads[seat%3]}:null;if(level===2)return beat%2===0?{beat,pad:pads[(seat+(beat%4===0?0:1))%3]}:null;return {beat,pad:beat===47&&level>=4?7:pads[(seat+(beat%2?2:beat%4===0?0:1))%3]}}).filter((n):n is Note=>n!==null)}
export function judge(notes:Note[],matched:Set<number>,pad:number,elapsed:number,bpm:number,window=190){let index=-1,delta=Infinity;notes.forEach((n,i)=>{const d=elapsed-n.beat*60000/bpm;if(n.pad===pad&&!matched.has(i)&&Math.abs(d)<Math.abs(delta)&&Math.abs(d)<=window){index=i;delta=d}});return {index,delta}}
export function grade(hits:number,total:number,extra:number){return total?Math.round(100*hits/(total+extra)):0}
export function showScore(show:ShowState){const total=show.performers.reduce((sum,p)=>sum+showTargets(p.level,p.seat).length,0);return {total,hits:show.hits.length,score:grade(show.hits.length,total,0)}}
