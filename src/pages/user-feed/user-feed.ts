import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ReportDetailModalPage } from '../report-detail-modal/report-detail-modal';
import { Denuncia } from '../../models/Denuncia';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Observable } from 'rxjs';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public fire: FirestoreProvider
  ) {
  }

  ionViewDidLoad() {
  }

  getDenuncias() {
    return this.fire.getDenuncias();
  }

  getUser(authorid: any) {
  }

  getCategories(report) {
    let categorias = [];

    if (report.categorias.agua) categorias.push("Água");
    if (report.categorias.seguranca) categorias.push("Segurança");
    if (report.categorias.saude) categorias.push("Saúde");
    if (report.categorias.transporte) categorias.push("Transporte");
    if (report.categorias.iluminacao) categorias.push("Iluminação");

    return categorias;
  }

  presentReportDetail(report: any) {
    this.fire.deleteUp(report, 'vinacmg');
  	let modal = this.modalCtrl.create(ReportDetailModalPage, { report: report });
  	modal.present();
  }

}
