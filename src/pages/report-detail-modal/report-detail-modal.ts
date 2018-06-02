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
  comentario: Comentario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public fire: FirestoreProvider,
    public auth: AuthenticationProvider,
    public alertCtrl: AlertController
  ) {
    this.report = navParams.get('report');
    this.comentario = {
      texto: "",
      data: new Date(),
      autorid: 0,
      autornome: "",
      autorfoto: ""
    }
  }

  ionViewDidLoad() {
    this.fire.getComentarios(this.report).subscribe(commentsItem => {
      this.comments = commentsItem;
      this.comments.sort(function(a, b) {
        if (a.data > b.data) return -1;
        if (a.data < b.data) return 1;
        return 0;
      });
    });
  }

  addComentario() {
    let user = this.auth.currentUser();
    this.comentario.autorid = user.uid;
    this.comentario.autornome = user.displayName;
    this.comentario.autorfoto = user.photoURL;
    this.comentario.data = new Date();
    
    this.fire.addComentario(this.comentario, this.report.id);
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
