import { HomePage } from './../home/home';
import { AdicionarusuarioProvider } from './../../providers/adicionarusuario/adicionarusuario';
import { adicionarusuarioPage } from './../adicionarusuario/adicionarusuario';
import { LoginProvider } from './../../providers/login/login';


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { RequestOptions, Headers, URLSearchParams } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})


export class LoginPage {

  public login : string;
  public senha : string;
  public data  : string;
  public now   : Date;
  public possuiacesso : string;
  //public teste1 : string;
  //public teste2 : string;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public LoginProv : LoginProvider,
              public http: Http,
              public AdicUsuarioProv : AdicionarusuarioProvider ) 
  {
     // this.navCtrl.push('LoginPage');
  }

  Flogin()
  {
    console.log("teste 1"+this.login); 
    console.log("teste 2"+this.senha);
    this.now = new Date();
    this.data = this.now.toISOString(); //new Date( this.now.getFullYear(), this.now.getMonth(), this.now.getDate() );
     

    let varjson =
    {
      usuario   : this.login,
      senha     : this.senha,
      data      : this.data,
      possuiacesso : this.possuiacesso
    }

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log( JSON.parse(  JSON.stringify(varjson) ) );

    this.LoginProv.Adicionarloginwebescola( JSON.parse(  JSON.stringify(varjson) )  ).
             subscribe( 
                          data => { console.log("ok")  }, 
                          error => { console.log("error")  }  
                      );
    
    //this.http.post('http://localhost:3000/login', JSON.stringify( varjson ) , options)
    //      .subscribe(data => {
    //        console.log('data=>'+data);
    //       }, error => {
    //        console.log('erro=>'+ error);// Error getting the data
    //     });

  
  }

  FValidarlogin()
  {
    console.log("validar login teste 1"+this.login); 
    console.log("teste 2"+this.senha);
    this.now = new Date();
    this.data = this.now.toISOString(); //new Date( this.now.getFullYear(), this.now.getMonth(), this.now.getDate() );
     
    let varjson =
    {
      logindigitado   : this.login,
      senhadigitado   : this.senha
    }
    
    this.possuiacesso = "Não";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.AdicUsuarioProv.BuscaUsuario( JSON.parse(  JSON.stringify(varjson) ) ).
                subscribe(  data => { 
                                       console.log("encontrado"); 
                                      

                                       console.log(data["length"]); 

                                       if ( data["length"] > 0)
                                         {
                                            this.FUsuarioExiste( data[0] );
                                            localStorage.setItem("_usuariologado" , data[0] );      
                                            this.navCtrl.push(HomePage, {usuario : data[0] });
                                          }
                                         else
                                         {
                                             this.possuiacesso = "Não";

                                         }
                                          this.Flogin();
                                          
 
                                      } ,
                            error => { console.log("nao encontrado")  }     
                          );   

      
  }

  FUsuarioExiste(usuario : any )
  {
    console.log("usuario existe"); 
    if (usuario.id > 0)
     {
        this.possuiacesso = "Sim";
        //this.storage.set('storage_usuario', usuario.id );
        console.log("usuario id maior 0"); 
        
      }

  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad LoginPage');
  }

  cliqueadicionarusuario()
  {
    console.log("clique cadastro de usuario");
    
     this.navCtrl.push(adicionarusuarioPage);

  }

}
