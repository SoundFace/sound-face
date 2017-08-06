import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions
} from '@ionic-native/camera-preview';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {

  public lastImg: string;
  public userInfo;
  public userInfoDemo;

  constructor(public navCtrl: NavController) {
    this.userInfoDemo = [
       'Username',
       'E-mail',
       'About',
       'Spotify ID'
    ];
    this.userInfo = {
       'username': 'jsmith',
       'email': 'jsmith@gmail.com',
       'about': 'Loves indie rock',
       'spotifyId': 'e319Akop90acjv13200ac'
    };
  }

  goHome() {
    this.navCtrl.pop();
  }

}
