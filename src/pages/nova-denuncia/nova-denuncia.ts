import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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

	classificacoes: { nome: string }[] = [];
	classSelecionadas: { nome: string }[] = [];
  mapa: any;
  params: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.mapa = MapPage;
    this.params = { criandoDenuncia: true };
  	this.classificacoes.push(
  		{	nome: 'Transporte/Trânsito'},
  		{	nome: 'Água'},
      { nome: 'Iluminação' }
  	);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaDenunciaPage');
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
