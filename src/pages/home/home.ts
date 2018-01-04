import { ManutencaoeventoPage } from './../manutencaoevento/manutencaoevento';
import { ListaeventoPage } from './../listaevento/listaevento';
import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{

  public usuario : any;

  public nomeusuariologado : string;

  public tabescolhida : string;
  

  constructor(public navCtrl: NavController,
              public NavParams : NavParams ) 
  {

  }


  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad HomePage');
    let a = this.NavParams.get('usuario');
    console.log("home :"+ a);
    this.usuario = this.NavParams.get('usuario');
    console.log("home :"+ this.usuario.id);

    this.nomeusuariologado = this.usuario.nomeusuario;
  }

  listaeventos()
  {
    this.navCtrl.push(ListaeventoPage, {usuariologado : this.usuario});
  }

  novoevento()
  {
    this.navCtrl.push(ManutencaoeventoPage , {usuariologado : this.usuario});
  }



}
