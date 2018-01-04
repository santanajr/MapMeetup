import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { HttpModule } from '@angular/http';


import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider
{

  //private static BASE_URL = 'http://webescola.smartechsolution.com.br/usuario/jsonloginusuario';
  //private static AUTHORIZATION ='Basic ywoMUL0tdcpT33soro9/QVYSry5KFoylnhzJkes8r5g=:TgA/ffRSFUESqYRU';
  private static BASE_URL = 'http://localhost:3000/login';

  constructor(public http: Http) 
  {
    console.log('Hello LoginProvider Provider');
  }


 Adicionarloginwebescola(params:{usuario :string , senha :string, data:string, possuiacesso : string }) 
 {
    
    const options = new RequestOptions;

    options.search = new URLSearchParams();
    options.search.append('login', params.usuario);
    options.search.append('senha', params.senha);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let opt = new RequestOptions({ headers: headers });

    
    // this.http.post("http://jsonplaceholder.typicode.com/posts", postParams, options)
    //      .subscribe(data => {
    //        console.log(data['_body']);
    //       }, error => {
    //        console.log(error);// Error getting the data
    //      });


    //return this.http.get(LoginProvider.BASE_URL, options).map((data) => data.json()  )
    console.log("login "+params.usuario );
    console.log("senha "+params.senha );

    return this.http.post(LoginProvider.BASE_URL, params, opt );
  //        .subscribe(data => {
  //          console.log(data);
   //        }, error => {
   //         console.log(error);// Error getting the data
   //       });
    
  }




}
