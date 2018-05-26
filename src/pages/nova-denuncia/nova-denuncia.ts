import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { MapPage } from '../map/map';

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
	classificacoes: { nome: string }[] = [];
	classSelecionadas: { nome: string }[] = [];
  mapa: any;
  params: any;
  reportLocation: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

    this.reportLocation = this.navParams.get('reportLocation');

    this.mapa = MapPage;
    this.params = { criandoDenuncia: true };
  	this.classificacoes.push(
  		{	nome: 'Transporte/Trânsito'},
  		{	nome: 'Água'},
      { nome: 'Iluminação' }
  	);
  }

  ionViewDidLoad() {
  }

  save() {
    this.validate();
  }

  validate() {
    if (! this.title || ! this.description || this.classSelecionadas.length == 0) {
      this.showAlert("Atenção", "Preencha todos os campos");
      return;
    }
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
  			label: this.classificacoes[i].nome,
  			value: this.classificacoes[i].nome,
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
