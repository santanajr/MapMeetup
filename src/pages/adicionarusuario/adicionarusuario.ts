import { LoginPage } from './../login/login';
import { AdicionarusuarioProvider } from './../../providers/adicionarusuario/adicionarusuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { RequestOptions, Headers, URLSearchParams } from '@angular/http';


/**
 * Generated class for the AdicionarusuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface usuario_interface
{
  id : number,
  nomeusuario : string,
  usuario   : string ,
  senha     : string,
  data      : string, 
  presenca  : string,
  palestrante : string
}
 

@IonicPage()

@Component({
  selector: 'page-adicionarusuario',
  templateUrl: 'adicionarusuario.html',
})
export class adicionarusuarioPage {

  public nomeusuario : string;
  public login : string ;
  public senha : string ;
  public data : string ;
  public now : Date;  


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public AdicionarProvider : AdicionarusuarioProvider,
              public Http : Http  ) 
  {
  
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad AdicionarusuarioPage');
  }

  Adicionarusuario()
  {
    //console.log("Adicionarusuario");
    this.now = new Date();
    this.data = this.now.toISOString(); //new Date( this.now.getFullYear(), this.now.getMonth(), this.now.getDate() );
    
    let varjson =
    {
      nomeusuario : this.nomeusuario,
      usuario   : this.login,
      senha     : this.senha,
      data      : this.data,
      presenca  : "",
      palestrante : ""
    }


    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log( JSON.parse(  JSON.stringify(varjson) ) );

    this.AdicionarProvider.Adicionarusuario( JSON.parse(  JSON.stringify(varjson) )  ).
             subscribe( 
                          data => { console.log("ok"); this.navCtrl.push(LoginPage)   }, 
                          error => { console.log("error")  }  
                      );
  }

  
}
