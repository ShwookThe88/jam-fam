export type SongLayer={id:string;author:string;instrument:string;pattern:number[][];created:number};
export type SharedSong={id:string;title:string;backing:string;bpm:number;created:number;updated:number;layers:SongLayer[]};
