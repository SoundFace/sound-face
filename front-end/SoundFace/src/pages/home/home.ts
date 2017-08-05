import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions
} from '@ionic-native/camera-preview';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public screenWidth: number;
  public screenHeight: number;

  constructor(public navCtrl: NavController, private camera: Camera, private cameraPreview: CameraPreview) {
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
    this.cameraPreview.takePicture(function(imgData) {
      this.cameraPreview.hide();
      // the img in string format: 'data:image/jpeg;base64,' + imgData
      // FREEZE IMAGE AFTER TAKING PIC FOR 2.5 SECONDS
      setTimeout(((<HTMLInputElement>document.getElementById('view')).src = 'data:image/jpeg;base64,' + imgData), 2500);
      this.cameraPreview.show();
      // console.log('data:image/jpeg;base64,' + imgData);
    })
  }

}
