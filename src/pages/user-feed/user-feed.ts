import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ReportDetailModalPage } from '../report-detail-modal/report-detail-modal';
import { Denuncia } from '../../models/Denuncia';
import { FirestoreProvider } from '../../providers/firestore/firestore';

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
  reports: Denuncia[];
  authors: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public fire: FirestoreProvider
  ) {
    this.fire.getDenuncias().subscribe(reports => {
      this.reports = reports;
    });
  }

  ionViewDidLoad() {
  }

  getUserName(authorid) {
    // let userName;
    // this.fire.getUsuario(authorid).subscribe(user => {
    //   userName = user.apelido;
    //   console.log(userName);
    // });
    // return userName;
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
  	let modal = this.modalCtrl.create(ReportDetailModalPage, { report: report });
  	modal.present();
  }

}
