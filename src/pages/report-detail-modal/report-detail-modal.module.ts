import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportDetailModalPage } from './report-detail-modal';

@NgModule({
  declarations: [
    ReportDetailModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportDetailModalPage),
  ],
})
export class ReportDetailModalPageModule {}
