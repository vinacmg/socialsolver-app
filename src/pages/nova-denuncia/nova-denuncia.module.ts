import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaDenunciaPage } from './nova-denuncia';

@NgModule({
  declarations: [
    NovaDenunciaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaDenunciaPage),
  ],
})
export class NovaDenunciaPageModule {}
