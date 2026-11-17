export const guitarFrets=[0,1,2,3,4,5] as const;
export const guitarStrings=[{name:'e',midi:64,number:1},{name:'B',midi:59,number:2},{name:'G',midi:55,number:3},{name:'D',midi:50,number:4},{name:'A',midi:45,number:5},{name:'E',midi:40,number:6}] as const;
const noteNames=['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];
export const guitarNotes=guitarStrings.flatMap(string=>guitarFrets.map(fret=>{const midi=string.midi+fret;return {string:string.number,stringName:string.name,fret,midi,name:noteNames[midi%12]+(Math.floor(midi/12)-1),frequency:440*Math.pow(2,(midi-69)/12)}}));
export function instrumentRows(instrument:string){return instrument==='Guitar I'||instrument==='Guitar II'?guitarNotes.length:8}
export function isValidPattern(instrument:string,pattern:unknown):pattern is number[][]{return Array.isArray(pattern)&&(pattern.length===instrumentRows(instrument)||pattern.length===8)&&pattern.every(row=>Array.isArray(row)&&row.length<=16&&row.every(n=>Number.isInteger(n)&&n>=0&&n<16))}
// A short noise excitation circulates through a damped delay line to model one plucked string.
export function pluckSamples(frequency:number,sampleRate:number,bright=false){const length=Math.ceil(sampleRate*1.8),data=new Float32Array(length),period=Math.max(2,Math.round(sampleRate/frequency-.5)),ring=new Float32Array(period);let previous=0;for(let i=0;i<period;i++){const noise=Math.random()*2-1;ring[i]=(noise+previous)*.5;previous=noise}const damping=bright?.9968:.9955;for(let i=0;i<length;i++){const index=i%period,value=ring[index];ring[index]=(value+ring[(index+1)%period])*.5*damping;const attack=Math.min(1,i/(sampleRate*.003)),release=Math.min(1,(length-i)/(sampleRate*.03));data[i]=Math.tanh(value*(bright?1.7:1.3))*attack*release*.7}return data}

// Fret numbers run from the high e string to low E; null means muted.
export const guitarChords:{name:string;frets:(number|null)[]}[]=[
{name:'C',frets:[0,1,0,2,3,null]},
{name:'D',frets:[2,3,2,0,null,null]},
{name:'E',frets:[0,0,1,2,2,0]},
{name:'G',frets:[3,0,0,0,2,3]},
{name:'A',frets:[0,2,2,2,0,null]},
{name:'Am',frets:[0,1,2,2,0,null]},
{name:'Dm',frets:[1,3,2,0,null,null]},
{name:'Em',frets:[0,0,0,2,2,0]},
{name:'F',frets:[1,1,2,3,3,1]},
{name:'Bm',frets:[2,3,4,4,2,null]}
];
