import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Denuncia } from '../../models/Denuncia';
import { Comentario } from '../../models/Comentario';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { StorageProvider } from '../../providers/storage/storage';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  denuncias: Denuncia[];
  comentarios: Comentario[];
  denunciaAbertaId: any;
  user: any;

  login = {email:'', senha:''};

  constructor(
    public navCtrl: NavController, 
    private firestore: FirestoreProvider, 
    private storage: StorageProvider,
    private afAuth :AuthenticationProvider
  ) { }
  
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

  uploadFile(event) {
    const file = event.target.files[0];
    this.storage.uploadFile('denuncias/id', file);
  }

  doLogin() {
    this.afAuth.login(this.login.email, this.login.senha);
    this.login.senha = '';
    this.user = this.afAuth.currentUser();
    console.log(this.user.uid);
  }
}
