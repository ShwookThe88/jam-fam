import {drumBindings} from '../lib/drum-controls';
export default function DrumKeyLegend(){return <div className="drum-key-legend" aria-label="Drum controls"><span>Phone: tap with multiple fingers. PC: combine keys.</span><div>{drumBindings.map(b=><span key={b.key}><kbd>{b.key}</kbd>{b.name}</span>)}</div><small>One hit per press. Release a key to hit it again.</small></div>}
