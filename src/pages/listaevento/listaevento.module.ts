import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaeventoPage } from './listaevento';

@NgModule({
  declarations: [
    ListaeventoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaeventoPage),
  ],
})
export class ListaeventoPageModule {}
