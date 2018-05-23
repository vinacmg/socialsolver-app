import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Denuncia } from '../../models/Denuncia';
import { Comentario } from '../../models/Comentario';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  denuncias: Denuncia[];
  comentarios: Comentario[];
  denunciaAbertaId: any;

  constructor(public navCtrl: NavController, private firestore: FirestoreProvider) { }
  
  ionViewDidLoad() {
    this.firestore.getDenuncias().subscribe(denuncias => {
      this.denuncias = denuncias
    });
    this.firestore.filterByCategoria('seguranca');
  }

  getComentarios(denuncia: Denuncia) {
    if(denuncia.id != this.denunciaAbertaId) {
      this.denunciaAbertaId = denuncia.id;
      this.comentarios = [];
      this.firestore.getComentarios(denuncia).subscribe(comentarios => {
        this.comentarios = comentarios
      });
    }
  }
}
