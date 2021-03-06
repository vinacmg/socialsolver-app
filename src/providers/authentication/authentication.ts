import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../models/Usuario';
import { StorageProvider } from '../storage/storage';
@Injectable()
export class AuthenticationProvider {

  constructor(
    public afAuth: AngularFireAuth,
    private storage: StorageProvider
  ) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(function() {
          return resolve();
        })
        .catch(function(error) {
          return reject(error.code);
        })
    });
  }

  currentUser() {
    return this.afAuth.auth.currentUser;
  }

  createUser(email: string, password: string, user: Usuario, img?: File) {
    return new Promise((resolve, reject) => {
      const that = this;
      const afAuth = this.afAuth;
      afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(newUser => {
          that.storage.uploadFile(`perfis/${newUser.uid}`, img).subscribe(url => {
            newUser.updateProfile({
              displayName: user.apelido, 
              photoURL: url
            });
          }); 
          return resolve();
        })
        .catch(function(error) {
          return reject(error.code);
        });
    });
  }

}
