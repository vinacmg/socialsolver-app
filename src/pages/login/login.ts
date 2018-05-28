import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterUserPage } from '../register-user/register-user';
import { UserFeedPage } from "../user-feed/user-feed";
import { AuthenticationProvider } from "../../providers/authentication/authentication";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login = {
    email: '',
    senha: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public auth: AuthenticationProvider
  ) {}

  ionViewDidLoad() {
  }

  doLogin() {
    if (! this.validate()) {
      return false;
    }
    var that = this;
    this.auth.login(this.login.email, this.login.senha)
      .then(() => {
        that.navCtrl.setRoot(UserFeedPage);
      })
      .catch((erro) => {
        that.showAlert("Falha de autenticação", this.getError(erro));
      });
  }

  validate() {
    if (! this.login.email || ! this.login.senha) {
      this.showAlert("Atenção", "Preencha todos os campos");
      return false;
    }
    return true;
  }

  showAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
  
  getError(code: string) {
    switch(code) {
      case "auth/invalid-email":
        return "E-mail inválido"
      case "auth/user-not-found":
        return "Usuário ou senha incorreto(s)";
    }
  }

  register() {
    this.navCtrl.push(RegisterUserPage);
  }
}
