import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import  { Usuario } from "../../models/Usuario";
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/**
 * Generated class for the RegisterUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

	nome: string;
	email: string;
	senha: string;
	img: File|null = null;
	usuario: Usuario = {
		id: 0,
		fotoUrl: "",
		apelido: ""
	};

  constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public auth: AuthenticationProvider
	) {}

  ionViewDidLoad() {
  }

  finish() {
  	if (this.validate()) {
			this.createUser();
  	}
	}
	
	createUser() {
		this.usuario.apelido = this.nome;
		this.auth.createUser(this.email, this.senha, this.usuario, this.img)
			.then(() => {
				this.showAlert("Bem-vindo", "Seu cadastro foi efetuado com sucesso.");
				this.navCtrl.pop();
			})
			.catch((error) => {
				this.showAlert("Atenção", this.getError(error));
			});
	}

  validate() {
  	if (! this.nome || ! this.email || ! this.senha) {
  		this.showAlert("Atenção", "Preencha todos os campos.");
  		return false;
  	}
  	const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	if (! format.test(this.email)) {
  		this.showAlert("Atenção", "Selecione um e-mail válido.");
  		return false;
  	}
  	if (this.senha.length < 4) {
  		this.showAlert("Atenção", "A senha deve ter, pelo menos, 4 caracteres.");
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
			case "auth/weak-password":
				return "A senha deve conter pelo menos 6 caracteres";
		}
	}

	uploadFile(event) {
		if(event.target.files){
			if(event.target.files.length > 1){
				alert("Selecione apenas um arquivo!");
			} else {
				this.img = event.target.files[0];
			}
		}
	}
}
