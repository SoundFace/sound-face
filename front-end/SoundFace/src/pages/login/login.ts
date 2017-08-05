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
import { NativeAudio } from '@ionic-native/native-audio';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  public lastImg: string;
  public myEmotion: string;
  public moodplaylist;

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private cameraPreview: CameraPreview,
    private http: Http,
    private nativeAudio: NativeAudio) {
    this.nativeAudio.preloadSimple('cameraSnap', 'assets/audio/click.mp3');
    // this.startCamera();
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

  startCamera(){
        // let react = {x: 40, y: 100, width: this.calcWidth ,height: 220}   //Decrepted due to previous code
    this.cameraPreview.startCamera({x: 0, y: 0, width: window.innerWidth, height: window.innerHeight, toBack: true, previewDrag: false, tapPhoto: true});
        //.startCamera(react, defaultCamera:'back',tapEnabled: true, dragEnabled: true, toBack:true, alpha:1);  //Decrepeted        
  }

  takePicture() {
    this.camera.getPicture({
      quality: 40,
      destinationType: 0,
      encodingType: 0,
      mediaType: 0,
      sourceType: 1,
      cameraDirection: 1,
      correctOrientation: true
    }).then((imageData) => {
      this.flashbulb();
      console.log(imageData);
      this.postRequest(imageData);
    });
  }

  getFromLibrary() {
    this.camera.getPicture({
      quality: 40,
      destinationType: 0,
      encodingType: 0,
      mediaType: 0,
      sourceType: 0,
      cameraDirection: 1,
      correctOrientation: true
    }).then((imageData) => {
      this.flashbulb();
      console.log(imageData);
      this.postRequest(imageData);
    });
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
  }

  flashbulb() {
    this.nativeAudio.play('cameraSnap');
    setTimeout((<HTMLInputElement>document.getElementById("ioncontent")).style.backgroundColor = "white", 2500);
    (<HTMLInputElement>document.getElementById("ioncontent")).style.backgroundColor = "transparent !important";
  }

  // FROM AN EXAMPLE
  postRequest(image) {
    //let hello = 'data:image/jpeg;base64,' + String(image);
    console.log(image);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      img : image
    };

    this.http.post("https://2203bb20.ngrok.io/processImage", JSON.stringify(body), {headers : headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }

  playTrack(song) {
    console.log("AYYYYYY");
  }

  login() {
    this.navCtrl.pop();
  }

}
