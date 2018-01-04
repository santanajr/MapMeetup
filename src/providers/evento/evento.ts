import { eventomanutencao_interface } from './../../pages/manutencaoevento/manutencaoevento';
import { evento_interface } from './../../pages/listaevento/listaevento';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventoProvider {

  constructor(public http: Http) {
    console.log('Hello EventoProvider Provider');
  }

  Buscatodoseventos() 
  {
       return this.http.get
         ("http://localhost:3000/eventos").map(data => data.json());
  }

  Buscatodoseventosid(idevento : string ) 
  {
       return this.http.get
         ("http://localhost:3000/eventos?id="+idevento ).map(data => data.json() as evento_interface);
         
  }

  GravarEvento( evento : evento_interface ) 
  {
       return this.http.post
         ("http://localhost:3000/eventos" , evento );      
  }

  AtualizarEvento( evento : evento_interface ) 
  {
       return this.http.put
         ("http://localhost:3000/eventos/"+evento.id , evento );      
  }

  Apagarevento( evento : evento_interface )
  {
     return this.http.delete( "http://localhost:3000/eventos/"+ evento.id);
  }


}
