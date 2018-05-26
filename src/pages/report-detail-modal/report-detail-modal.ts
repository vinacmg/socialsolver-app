import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ReportDetailModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-detail-modal',
  templateUrl: 'report-detail-modal.html',
})
export class ReportDetailModalPage {
  report: {
    id: any,
    titulo: string, 
    categorias: Array<string>,
    descricao: string,
    data: Date
  };
  reportMode: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.report = navParams.get('report');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportDetailModalPage');
  }

  dismiss() {
  	this.viewCtrl.dismiss();
  }

  setReportMode(status) {
    this.reportMode = status;
  }

  sendReport() {
  }

}
