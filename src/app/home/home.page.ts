import { Component, ViewChild } from '@angular/core';
import {Howl } from 'howler';
import { IonRange } from '@ionic/angular';
export interface Track {
  name:string;
  path: string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
playlist: Track[] = [
  {
    name: 'Creative Minds',
    path: '../assets/mp3/bensound-creativeminds.mp3'
  },
  {
    name: 'Jazzy frenchy',
    path: '../assets/mp3/bensound-jazzyfrenchy.mp3'
  },
  {
    name:'Little Idea',
    path: '../assets/mp3/bensound-littleidea.mp3'
  },
  {
    name:'Ukulele ',
    path: '../assets/mp3/bensound-ukulele.mp3'
  },
  {
    name: 'Heads Up',
    path:'../assets/mp3/bensound-headsup.mp3'
  }
]

activeTrack : Track = null ;
player: Howl = null;
isPlaying = false ;
progress = 0 ;
@ViewChild('range',{static: false}) range : IonRange;

  constructor() {}

  start(track: Track) {
    if(this.player){
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      onplay: () => {
        this.isPlaying = true ;
        this.activeTrack = track ;
        this.updateProgress();
        
        console.log('onplay');
      },
      onend: () => {
        console.log('onend');
        this.isPlaying = false ;
      }
    });
    this.player.play();
  }
  togglePlayer(pause){
    this.isPlaying = !pause ;
    if(pause){
      this.player.pause();
    }else{
      this.player.play();
    }

  }
  next(){
    let index = this.playlist.indexOf(this.activeTrack);
    if(index != this.playlist.length - 1 ){
      this.start(this.playlist[index + 1]);
    }else{
      this.start(this.playlist[0]);
    }
  }
  prev(){
    let index = this.playlist.indexOf(this.activeTrack);
    if(index > 0){
      this.start(this.playlist[index-1]);
    }else{
      this.start(this.playlist[this.playlist.length -1]);
    }
  }
  seek(){
    let newValue = +this.range.value ;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue/100));
  }
  updateProgress(){
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0 ;
    setTimeout( () => {
      this.updateProgress();
    },100);
  }
}
