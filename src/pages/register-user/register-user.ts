import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import  { Usuario } from "../../models/Usuario";
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserFeedPage } from '../user-feed/user-feed';
import { LoginPage } from '../login/login';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  
  photo: any;

  constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
    public auth: AuthenticationProvider,
    public imagePicker: ImagePicker,
    public camera: Camera
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
				this.navCtrl.setRoot(LoginPage);
			})
			.catch((error) => {
				this.showAlert("Atenção", this.getError(error));
			});
	}

  validate() {
  	if (! this.nome || ! this.email || ! this.senha || ! this.img) {
  		this.showAlert("Atenção", "Preencha todos os campos e selecione uma foto");
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
  
  openGallery() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };
    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
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
