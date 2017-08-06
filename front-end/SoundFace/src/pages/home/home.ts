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
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Playlist } from "../playlist/playlist";
import { Login } from "../login/login";
import { Settings } from "../settings/settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lastImg: string;
  public myEmotion: string;
  public loginState: boolean = false;

  captureDataUrl: string;

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private cameraPreview: CameraPreview,
    private http: Http,
    public alertCtrl: AlertController) {
    if (!this.loginState) {
      this.logout();
    }
  }

  takePicture() {
    this.camera.getPicture({
      quality: 25,
      destinationType: 0,
      encodingType: 0,
      mediaType: 0,
      sourceType: 1,
      targetWidth: 1000,
      targetHeight: 1000,
      cameraDirection: 1,
      correctOrientation: true
    }).then((imageData) => {
      console.log(imageData);
      this.postRequest(imageData);
    });
  }

  getFromLibrary() {
    this.camera.getPicture({
      quality: 25,
      destinationType: 0,
      encodingType: 0,
      mediaType: 0,
      sourceType: 0,
      targetWidth: 1000,
      targetHeight: 1000,
      cameraDirection: 1,
      correctOrientation: true
    }).then((imageData) => {
      console.log(imageData);
      this.postRequest(imageData);
    });
  }

  postRequest(image) {
    console.log(image);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      img : image
    };

    this.http.post("https://3697d57a.ngrok.io/processImage", JSON.stringify(body), {headers : headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
    
    this.getRequest();
  }

  getRequest() {
    this.http.get("https://3697d57a.ngrok.io/getList")
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
    
    this.listen();
  }

  listen() {
    var xhttp;
    var countdown = 25;
    var receivedMsg;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      while (!receivedMsg && countdown > 0) {
        setTimeout(function() {
          if (this.readyState == 4 && this.status == 200) {
            receivedMsg = this;
            console.log("MESSAGE RECEIVED");
            this.emotionAlert(this);
          }}, 10000);
        countdown--;
      }
    };
    xhttp.open("POST", "https://3697d57a.ngrok.io/processImage", true);
    xhttp.send();
  }

  showPlaylist() {
    this.navCtrl.push(Playlist);
  }

  emotionAlert(emotion) {
    let suggest = null;
    if (emotion == "sad" || emotion == "angry") {
      let suggest = "happy"
      let suggestAlert = this.alertCtrl.create({
        title: emotion,
        message: 'SoundFace detected' + emotion + '! Would you rather see a(n) ' + suggest + ' playlist?',
        buttons: ['Yes','No']
      });
      suggestAlert.present()
    }
    let alert = this.alertCtrl.create({
      title: emotion,
      message: 'SoundFace detected' + emotion + '! Your playlist is ready.',
      buttons: ['Listen']
    });
    alert.present()
  }

  logout() {
    // insert Spotify logout/authentication
    this.loginState = true;
    this.navCtrl.push(Login);
  }

  goToSettings() {
    this.navCtrl.push(Settings);
  }
}
