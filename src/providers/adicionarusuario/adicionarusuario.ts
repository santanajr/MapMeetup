import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { HttpModule } from '@angular/http';


import 'rxjs/add/operator/map';

/*
  Generated class for the AdicionarusuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdicionarusuarioProvider {

  constructor(public http: Http) {
    console.log('Hello AdicionarusuarioProvider Provider');
  }
  
  Adicionarusuario(params:{nomeusuario :string, usuario :string , 
                           senha :string, data  :string, 
                           presenca : string , palestrante : string }) 
  {
     
     const options = new RequestOptions;
 
     options.search = new URLSearchParams();
     options.search.append('usuario', params.usuario);
     options.search.append('senha', params.senha);
     options.search.append('nomeusuario', params.nomeusuario);
     options.search.append('datacadastro', params.data);

     options.search.append('presenca', "");
     options.search.append('palestrante', "");
     
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let opt = new RequestOptions({ headers: headers });
 
 
     return this.http.post("http://localhost:3000/adicionarusuario", params, opt );
     
  }
 
  
  BuscaUsuario(params:{logindigitado :string, senhadigitado :string }) 
   {
        //const options = new RequestOptions;
    
        //options.search = new URLSearchParams();
        //options.search.append('xusuario', params.logindigitado );
        //options.search.append('xsenha', params.senhadigitado );
    
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let opt = new RequestOptions({ headers: headers });
    
    
        return this.http.get
          ("http://localhost:3000/adicionarusuario?usuario="+params.logindigitado + 
                                       "&" + "senha=" + params.senhadigitado ).map(data => data.json());
      
      
   }
 
   BuscaUsuarioid( idusuario : string ) 
   {
        //const options = new RequestOptions;
    
        //options.search = new URLSearchParams();
        //options.search.append('xusuario', params.logindigitado );
        //options.search.append('xsenha', params.senhadigitado );
    
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let opt = new RequestOptions({ headers: headers });
    
    
        return this.http.get
          ("http://localhost:3000/adicionarusuario?idusuario="+idusuario ).map(data => data.json());
      
      
   }


}
