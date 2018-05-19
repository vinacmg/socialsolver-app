import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFeedPage } from './user-feed';

@NgModule({
  declarations: [
    UserFeedPage,
  ],
  imports: [
    IonicPageModule.forChild(UserFeedPage),
  ],
})
export class UserFeedPageModule {}
