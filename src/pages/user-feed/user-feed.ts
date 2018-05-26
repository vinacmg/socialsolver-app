import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ReportDetailModalPage } from '../report-detail-modal/report-detail-modal';

/**
 * Generated class for the UserFeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-feed',
  templateUrl: 'user-feed.html',
})
export class UserFeedPage {

	filtro: any;
  categorias: {
    nome: string
  }[] = [];

	reportList: {
		id: any,
		titulo: string, 
		categorias: Array<string>,
		descricao: string,
		data: Date,
    ups: number,
    reports: number
	}[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.initializeReportList();
  }

  ionViewDidLoad() {
  }

  initializeReportList() {
  	this.reportList.push({
  		id: 0,
  		titulo: "Lâmpada de poste queimada",
  		categorias: ['Iluminação', 'Água'],
  		descricao: "Falta de iluminação",
  		data: new Date(),
      ups: 10,
      reports: 1
  	});
  }

  presentReportDetail(report: any) {
  	let modal = this.modalCtrl.create(ReportDetailModalPage, { report: report });
  	modal.present();
  }

}
