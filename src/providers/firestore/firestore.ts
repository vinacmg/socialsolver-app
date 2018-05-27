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

@Injectable()
export class FirestoreProvider {
  denunciasCollection: AngularFirestoreCollection<Denuncia>;
  denuncias: Observable<Denuncia[]>;
  denunciaDoc: AngularFirestoreDocument<Denuncia>;

  comentariosCollection: AngularFirestoreCollection<Comentario>;
  comentarios: Observable<Comentario[]>;
  comentarioDoc: AngularFirestoreDocument<Comentario>;

  categoriaFilter$: BehaviorSubject<string|null>;
  dataFilter$: BehaviorSubject<Date|null>;
  denunciaFilter$: BehaviorSubject<string|null>;
  upsFilter$: BehaviorSubject<number|null>;

  constructor(public firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.categoriaFilter$ = new BehaviorSubject(null);
    this.dataFilter$ = new BehaviorSubject(null);
    this.denunciaFilter$ = new BehaviorSubject(null);
    this.upsFilter$ = new BehaviorSubject(null);
    this.denunciasCollection = this.firestore.collection('denuncias');
    this.denuncias = combineLatest(this.categoriaFilter$, this.dataFilter$, this.upsFilter$).pipe(
      switchMap(([categoria, date, ups]) => this.firestore.collection('denuncias', ref => {
        let query: any = ref;
        if(date) { query = query.where('data', '==', date) };
        if(ups) { query = query.where('ups', '==', ups) };
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
  }

  getDenuncias() {
    return this.denuncias;
  }

  addDenuncia(denuncia: Denuncia) {
    this.denunciasCollection.add(denuncia);
  }

  deleteDenuncia(denuncia: Denuncia) {
    this.denunciaDoc = this.firestore.doc(`denuncias/${denuncia.id}`);
    this.denunciaDoc.delete();
  }

  getComentarios(denuncia: Denuncia) {
    this.denunciaFilter$.next(denuncia.id);

    this.comentarios = this.denunciaFilter$.pipe(
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

  filterByCategoria(categoria: string|null) {
    this.categoriaFilter$.next(categoria);
  }

  filterByData(data: Date|null) {
    this.dataFilter$.next(data); 
  }

  filterByUps(ups: number|null) {
    this.upsFilter$.next(ups); 
  }

  addUser(user: Usuario) {
    this.firestore.collection('usuarios').doc(user.id).set({
      apelido: user.apelido,
      fotoUrl: user.fotoUrl
    });
  }
}
