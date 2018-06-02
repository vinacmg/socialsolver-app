import { AngularFireStorage } from 'angularfire2/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public storage: AngularFireStorage) { }

  uploadFile(filePath: string,file: File) {
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    return task.downloadURL();
  }

  deleteFile(filePath: string) {
    this.storage.ref(filePath).delete();
  }

}
