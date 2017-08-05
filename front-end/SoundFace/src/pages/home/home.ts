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
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lastImg: string;
  public myEmotion: string;

  captureDataUrl: string;

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private cameraPreview: CameraPreview,
    private http: Http) {
    this.startCamera();
  }

  startCamera(){
        // let react = {x: 40, y: 100, width: this.calcWidth ,height: 220}   //Decrepted due to previous code
    this.cameraPreview.startCamera({x: 0, y: 0, width: window.innerWidth, height: window.innerHeight-64, toBack: false, previewDrag: false, tapPhoto: true});
        //.startCamera(react, defaultCamera:'back',tapEnabled: true, dragEnabled: true, toBack:true, alpha:1);  //Decrepeted        
  }

  takePicture() {
    console.log("here");
    this.camera.getPicture({
      quality: 40,
      destinationType: 0,
      encodingType: 0,
      sourceType: 1,
      mediaType: 0,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: true
    }).then((imageData) => {
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      let cameraImageSelector = document.getElementById('view');
      this.lastImg = 'data:image/jpeg;base64,' + imageData;
      cameraImageSelector.setAttribute('src', this.lastImg);
      console.log(this.lastImg);
      this.postRequest(this.lastImg);
    });
    /*
      function(imgData) {
      this.cameraPreview.hide();
      // the img in string format: 'data:image/jpeg;base64,' + imgData
      // FREEZE IMAGE AFTER TAKING PIC FOR 2.5 SECONDS
      let lastImg = 'data:image/jpeg;base64,' + imgData;
      // (<HTMLInputElement>document.getElementById('view')).src = lastImg;
      (<HTMLInputElement>document.getElementById('view')).src = lastImg;
      this.cameraPreview.show();
      //this.myEmotion = this.sendImage(lastImg);
      this.postRequest(imgData);
    }); */
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

    this.http.post("http://2203bb20.ngrok.io/processImage", JSON.stringify(body), {headers : headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }

}
