import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ReportDetailModalPage } from '../report-detail-modal/report-detail-modal';
import { Denuncia } from '../../models/Denuncia';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

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

  filter: any;
  categoria: any;
  reports: Denuncia[];
  authors: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public auth: AuthenticationProvider,
    public fire: FirestoreProvider
  ) {
    this.fire.getDenuncias().subscribe(reports => {
      this.reports = reports;
    });
  }

  ionViewDidLoad() {
  }

  up(report) {
    let user = this.auth.currentUser();
    if (report.upped.indexOf(user.uid) > -1) {
      this.fire.deleteUp(report, user.uid);
      report.ups--;
      return;
    }
    this.fire.addUp(report, user.uid);
    report.ups++;
  }

  selectFilter() {
    switch(this.filter) {
      case 'MaisRecentes':
        this.fire.filterDataDesc();
        break;
      case 'MaisAntigos':
        this.fire.filterDataAsc();
        break;
      case 'MaisUps':
        this.fire.filterUpsDesc();
        break;
      case 'MenosUps':
        this.fire.filterUpsAsc();
        break;
      case 'TituloAZ':
        this.fire.filterTituloAsc();
        break;
      case 'TituloZA':
        this.fire.filterTituloDesc();
        break;
    }
  }

  selectCategoria() {
    if (this.categoria === 'todas') {
      this.categoria = null;
    }
    this.fire.filterByCategoria(this.categoria);
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
