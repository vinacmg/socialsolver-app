import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Denuncia } from '../../models/Denuncia';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from "firebase/app";

/**
 * Generated class for the NovaDenunciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nova-denuncia',
  templateUrl: 'nova-denuncia.html',
})
export class NovaDenunciaPage {

  title: string;
  description: string;
	classificacoes: string[] = [];
	classSelecionadas: string[] = [];
  mapa: any;
  params: any;
  reportLocation: any = null;
  denuncia: Denuncia = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public angFire: AngularFirestore,
    public auth: AuthenticationProvider,
    public fire: FirestoreProvider
  ) {
    this.reportLocation = this.navParams.get('reportLocation');
    this.mapa = MapPage;
    this.params = { criandoDenuncia: true };
    this.classificacoes = [
      "Água",
      "Segurança",
      "Saúde",
      "Transporte",
      "Iluminação"
    ];
  }

  ionViewDidLoad() {
  }

  save() {
    if(this.validate()) {
      this.denuncia.autorid = this.auth.currentUser().uid;
      this.denuncia.titulo = this.title;
      this.addCategories();

      console.log(this.denuncia.categorias);

      this.denuncia.descricao = this.description;
      this.denuncia.data = new Date();
      this.denuncia.resolvido = false;
      this.denuncia.ups = 0;
      this.denuncia.coord = new firebase.firestore.GeoPoint(this.reportLocation.lat(), this.reportLocation.lng());

      this.fire.addDenuncia(this.denuncia);
      this.showAlert("Muito bem!", "Sua denúncia foi cadastrada");
      this.navCtrl.setRoot(MapPage);
    }
  }

  addCategories() {

    this.denuncia.categorias = {
      agua: false,
      seguranca: false,
      saude: false,
      transporte: false,
      iluminacao: false
    }

    if (this.classSelecionadas.indexOf("Água") > -1) this.denuncia.categorias.agua = true;
    if (this.classSelecionadas.indexOf("Segurança") > -1) this.denuncia.categorias.seguranca = true;
    if (this.classSelecionadas.indexOf("Saúde") > -1) this.denuncia.categorias.saude = true;
    if (this.classSelecionadas.indexOf("Transporte") > -1) this.denuncia.categorias.transporte = true;
    if (this.classSelecionadas.indexOf("Iluminação") > -1) this.denuncia.categorias.iluminacao = true;
  }

  validate() {
    if (! this.title || ! this.description || this.classSelecionadas.length == 0) {
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

  verClassificacoes() {
  	let alert = this.alertCtrl.create();
  	alert.setTitle('Selecione as classificações');

  	for(let i=0; i<this.classificacoes.length; i++) {
  		alert.addInput({
  			type: 'checkbox',
  			label: this.classificacoes[i],
  			value: this.classificacoes[i],
  			checked: this.classSelecionadas.some(x => x === this.classSelecionadas[i])
  		});
  	}

  	alert.addButton({
  		text: 'OK',
  		handler: data => {
  			this.classSelecionadas = data;
  		}
  	});
  	alert.present();
  }
}
