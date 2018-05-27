import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreProvider } from '../firestore/firestore';
import { Usuario } from '../../models/Usuario';
@Injectable()
export class AuthenticationProvider {

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: FirestoreProvider
  ) { }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      throw error.code;
    });
  }

  currentUser() {
    return this.afAuth.auth.currentUser;
  }

  createUser(email: string, password: string, user: Usuario) {
    const afAuth = this.afAuth;
    const firestore = this.firestore;
    const u = user;
    afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      u.id = afAuth.auth.currentUser.uid;
      firestore.addUser(u);
    }).catch(function(error) {
    });
  }

}
