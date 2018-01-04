import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { adicionarusuarioPage } from './adicionarusuario';


@NgModule({
  declarations: [
    adicionarusuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(adicionarusuarioPage),
  ],
})
export class AdicionarusuarioPageModule {}
