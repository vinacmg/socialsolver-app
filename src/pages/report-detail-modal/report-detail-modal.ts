import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Observable } from 'rxjs';
import { Comentario } from '../../models/Comentario';

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
  
  report: any;
  reportMode: boolean = false;
  comments: Comentario[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public fire: FirestoreProvider,
    public auth: AuthenticationProvider,
    public alertCtrl: AlertController
  ) {
    this.report = navParams.get('report');
  }

  ionViewDidLoad() {
    this.fire.getComentarios(this.report).subscribe(commentsItem => {
      this.comments = commentsItem;
    });
  }

  remove() {
    this.showAlert("Atenção", "Deseja excluir essa denúncia?");
  }

  showAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.fire.deleteDenuncia(this.report);
            this.dismiss();
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }

  isOwner() {
    let user = this.auth.currentUser();
    return this.report.autorid == user.uid;
  }

  up() {
    let user = this.auth.currentUser();
    if (this.report.upped.indexOf(user.uid) > -1) {
      this.fire.deleteUp(this.report, user.uid);
      this.report.ups--;
      return;
    }
    this.fire.addUp(this.report, user.uid);
    this.report.ups++;
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
