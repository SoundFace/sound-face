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

  constructor(public navCtrl: NavController, private camera: Camera, private cameraPreview: CameraPreview) {
    this.takePicture();
  }

  takePicture() {
    console.log("takePicture has been called");
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  viewscope() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    };

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });

    // Set the handler to run every time we take a picture
    this.cameraPreview.setOnPictureTakenHandler().subscribe((result) => {
      console.log(result);
      // do something with the result
    });


    // picture options
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    }
  }

}
