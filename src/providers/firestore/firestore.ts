import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Denuncia } from '../../models/Denuncia';
import { Comentario } from '../../models/Comentario';
import { Usuario } from '../../models/Usuario';
import { Observable,  BehaviorSubject } from 'rxjs';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class FirestoreProvider {
  denunciasCollection: AngularFirestoreCollection<Denuncia>;
  denuncias: Observable<Denuncia[]>;
  denunciaDoc: AngularFirestoreDocument<Denuncia>;

  comentariosCollection: AngularFirestoreCollection<Comentario>;
  comentarios: Observable<Comentario[]>;
  comentarioDoc: AngularFirestoreDocument<Comentario>;

  categoriaFilter$: BehaviorSubject<string|null>;
  dataFilter$: BehaviorSubject<string|null>;
  denunciaFilter$: BehaviorSubject<string|null>;
  upsFilter$: BehaviorSubject<string|null>;
  tituloFilter$: BehaviorSubject<string|null>;
  usuarioFilter$: BehaviorSubject<string|null>;

  usuariosCollention: AngularFirestoreCollection<Usuario>;
  usuario: Observable<Usuario>;

  constructor(public firestore: AngularFirestore, private afAuth: AngularFireAuth, private storage: StorageProvider) {
    this.categoriaFilter$ = new BehaviorSubject(null);
    this.dataFilter$ = new BehaviorSubject(null);
    this.denunciaFilter$ = new BehaviorSubject(null);
    this.upsFilter$ = new BehaviorSubject(null);
    this.tituloFilter$ = new BehaviorSubject(null);
    this.usuarioFilter$ = new BehaviorSubject(null);
    this.denunciasCollection = this.firestore.collection('denuncias');
    this.denuncias = combineLatest(this.tituloFilter$, this.categoriaFilter$, this.dataFilter$, this.upsFilter$).pipe(
      switchMap(([titulo, categoria, date, ups]) => this.firestore.collection('denuncias', ref => {
        let query: any = ref;
        if(titulo) { query = query.orderBy('titulo', titulo) };
        if(date) { query = query.orderBy('data', date) };
        if(ups) { query = query.orderBy('ups', ups) };
        if(categoria) { query = query.where(`categorias.${categoria}`, '==', true) };
        return query;
      }).snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Denuncia;
          data.id = a.payload.doc.id;
          return data;
        })
      }))
      )
    );
    this.usuariosCollention = this.firestore.collection('usuarios');
    this.usuario = this.usuarioFilter$.pipe(
      switchMap(uid => this.firestore.collection('usuarios').doc(uid).valueChanges())
    );
  }

  addDenuncia(denuncia: Denuncia, img: File) {
    const that = this;
    this.denunciasCollection.add(denuncia)
    .then(d => {
      let url:string;
      that.storage.uploadFile(`denuncias/${d.id}`, img).subscribe(u => {
        url = u;
        d.update({fotoUrl: url})
      });
    });
  }

  addComentario(comentario: Comentario, denunciaid: string) {
    this.firestore.collection(`denuncias/${denunciaid}/comentarios`).add(comentario);
  }

  addUser(user: Usuario) {
    this.usuariosCollention.doc(user.id).set({
      apelido: user.apelido,
      fotoUrl: user.fotoUrl
    });
  }

  addUp(denuncia: Denuncia,uid: string) {
    if(denuncia.upped.indexOf(uid) >= 0){
      throw 'user-has-already-upped';
    } else {
      denuncia.upped.push(uid);
      this.denunciasCollection.doc(denuncia.id).update({
        upped: denuncia.upped,
        ups: denuncia.ups+1
      })
    }
  }

  deleteUp(denuncia: Denuncia,uid: string) {
    const index = denuncia.upped.indexOf(uid);
    if(index >= 0){
      denuncia.upped.splice(index, 1);
      this.denunciasCollection.doc(denuncia.id).update({
        upped: denuncia.upped,
        ups: denuncia.ups-1
      })
    } else throw 'user-has-not-upped';
  }

  deleteComentario(denunciaid:string, comentarioid: string){
    this.firestore.doc(`denuncias/${denunciaid}/comentarios/${comentarioid}`).delete();
  }

  deleteDenuncia(denuncia: Denuncia) {
    const that = this;
    const id = denuncia.id;
    this.denunciaDoc = this.firestore.doc(`denuncias/${id}`);
    this.denunciaDoc.delete().then(() => {
      this.storage.deleteFile(`denuncias/${id}`);
    });
  }

  getComentarios(denuncia: Denuncia) {
    this.denunciaFilter$.next(denuncia.id);

    this.comentarios = this.denunciaFilter$.pipe(//tirar daqui no futuro
      switchMap(id => this.firestore.collection(`denuncias/${id}/comentarios`, ref => ref.orderBy('data', 'asc'))
      .snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Comentario;
          data.id = a.payload.doc.id;
          return data;
        })
      }))
      )
    );

    return this.comentarios;
  }

  getDenuncias() {
    return this.denuncias;
  }

  getUsuario(uid: string) {
    this.usuarioFilter$.next(uid);
    return this.usuario;
  }

  filterByCategoria(categoria: string|null) {
    this.dataFilter$.next(null);
    this.upsFilter$.next(null);
    this.tituloFilter$.next(null);
    this.categoriaFilter$.next(categoria);
  }

  //FILTROS
  filterDataAsc() {
    this.categoriaFilter$.next(null);
    this.upsFilter$.next(null);
    this.tituloFilter$.next(null);
    this.dataFilter$.next('asc'); 
  }

  filterDataDesc() {
    this.categoriaFilter$.next(null);
    this.upsFilter$.next(null);
    this.tituloFilter$.next(null);
    this.dataFilter$.next('desc'); 
  }

  filterUpsAsc() {
    this.categoriaFilter$.next(null);
    this.dataFilter$.next(null);
    this.tituloFilter$.next(null);
    this.upsFilter$.next('asc');
  }

  filterUpsDesc() {
    this.categoriaFilter$.next(null);
    this.dataFilter$.next(null);
    this.tituloFilter$.next(null);
    this.upsFilter$.next('desc');
  }

  filterTituloAsc() {
    this.categoriaFilter$.next(null);
    this.upsFilter$.next(null);
    this.dataFilter$.next(null);
    this.tituloFilter$.next('asc');
  }

  filterTituloDesc() {
    this.categoriaFilter$.next(null);
    this.upsFilter$.next(null);
    this.dataFilter$.next(null);
    this.tituloFilter$.next('desc');
  }
}
