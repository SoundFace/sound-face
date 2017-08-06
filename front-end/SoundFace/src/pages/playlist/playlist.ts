import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html'
})
export class Playlist {

  public lastImg: string;
  public myEmotion: string;
  public moodplaylist;

  constructor(public navCtrl: NavController,
    private http: Http) {
    this.moodplaylist = [
      {
        name: 'Fake Magic',
        track_href: 'https://api.spotify.com/v1/tracks/0lvXfUug5YmOHOyHgXufqF'
      },
      {
        name: 'Me',
        track_href: 'https://api.spotify.com/v1/tracks/6HyIbRJldchSKEepzbRARN'
      },
      {
        name: 'Know No Better (feat. Quavo)',
        track_href: 'https://api.spotify.com/v1/tracks/6UXoE1DEpHFwmPT1fGS7av'
      },
      {
        name: 'Arty Boy - Joe Goddard Remix',
        track_href: 'https://api.spotify.com/v1/tracks/7gDuuI365KmgZ7agDpjiRm'
      }
    ];
  }

  playTrack(song) {
    console.log("Direct link to track would be here");
  }

  goHome() {
    this.navCtrl.pop();
  }

}
