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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lastImg: string;
  public myEmotion: string;

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private cameraPreview: CameraPreview,
    private http: Http) {
    this.http.post('http://36666ac9.ngrok.io/processImage', "GetSchwifty");
    this.initCamera();
  }

  initCamera() {
    console.log("initCamera called");
    this.cameraPreview.startCamera({
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight-64,
      camera: 'front',
      toBack: false,
      previewDrag: false,
      tapPhoto: false
    });
  }

  takePicture() {
    this.http.post('http://36666ac9.ngrok.io/processImage', "Pringle");
    console.log("here");
    this.cameraPreview.takePicture(function(imgData) {
      this.cameraPreview.hide();
      // the img in string format: 'data:image/jpeg;base64,' + imgData
      // FREEZE IMAGE AFTER TAKING PIC FOR 2.5 SECONDS
      let lastImg = 'data:image/jpeg;base64,' + imgData;
      // (<HTMLInputElement>document.getElementById('view')).src = lastImg;
      (<HTMLInputElement>document.getElementById('view')).src = lastImg;
      this.cameraPreview.show();
      //this.myEmotion = this.sendImage(lastImg);
      this.http.post('https://36666ac9.ngrok.io/processImage', lastImg);
    });
  }
  /*
  sendImage(image) {
    return this.http.post('https://36666ac9.ngrok.io/processImage', image);
  }*/

  testPost() {
    this.http.post('https://36666ac9.ngrok.io/processImage', "GetSchwifty");
  }

  completeAnalysis() {
    // Handy's "after detection" function
  }

}
