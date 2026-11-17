// Select one interface channel before recording. Never mix an unused input into the guitar.
export function createGuitarInputGraph(context:AudioContext,stream:MediaStream){
 const channels=Math.max(1,Math.min(32,stream.getAudioTracks()[0]?.getSettings().channelCount||1));
 const source=context.createMediaStreamSource(stream),splitter=context.createChannelSplitter(channels),stereo=context.createChannelMerger(2),level=context.createGain(),meter=context.createAnalyser(),monitor=context.createGain(),recording=context.createMediaStreamDestination();
 level.channelCount=1;level.channelCountMode='explicit';level.gain.value=1;
 monitor.gain.value=0;meter.fftSize=1024;
 source.connect(splitter);splitter.connect(level,0,0);stereo.connect(level);level.connect(meter);level.connect(monitor);level.connect(recording);
 let selected=0;
 return {channels,level,meter,monitor,recording,
  selectChannel(channel:number){if(!Number.isInteger(channel)||channel< -1||channel>=channels||channel===-1&&channels<2)throw new RangeError('Input channel unavailable');splitter.disconnect();if(channel===-1){level.channelCount=2;splitter.connect(stereo,0,0);splitter.connect(stereo,1,1)}else{level.channelCount=1;splitter.connect(level,channel,0)}selected=channel;},
  get selectedChannel(){return selected},
  disconnect(){for(const node of [source,splitter,stereo,level,meter,monitor,recording])node.disconnect();recording.stream.getTracks().forEach(t=>t.stop())}
 };
}
export function guitarInputError(error:unknown){const name=(error as {name?:string})?.name;return name==='NotAllowedError'?'Input access was blocked. Allow microphone access for Jam Fam in your browser, then connect again.':name==='NotFoundError'?'No audio input found. Connect your USB interface and try again.':name==='NotReadableError'?'The input is busy or unavailable. Close Ableton or other audio apps, then try again.':name==='OverconstrainedError'?'That input is no longer available. Refresh the input list and choose your interface again.':'Could not connect this input. Check the USB connection and browser audio permissions.'}
