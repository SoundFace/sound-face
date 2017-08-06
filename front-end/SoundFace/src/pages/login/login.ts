import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  public lastImg: string;
  public myEmotion: string;
  public moodplaylist;

  constructor(public navCtrl: NavController) {
  }

  login() {
    this.navCtrl.pop();
  }

}
