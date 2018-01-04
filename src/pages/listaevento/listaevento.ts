import { ListaparticipanteeventoPage } from './../listaparticipanteevento/listaparticipanteevento';
import { ManutencaoeventoPage } from './../manutencaoevento/manutencaoevento';
import { HomePage } from './../home/home';
import { evento_interface } from './listaevento';
import { usuario_interface } from './../adicionarusuario/adicionarusuario';
import { EventoProvider } from './../../providers/evento/evento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the ListaeventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface evento_interface
{
titulo : string ,
descricao : string,
dataevento: string,
horaevento: string,
cidade: string,
estado: string,
usuarioresponsavel: string,
nomeresponsavel: string,
listaparticipantespresentes : usuario_interface[] ,
statusevento: string,
motivocancelamentoouadiamento: string,
possuilistapresenca : boolean,
posicaousuariologadonalistapresentes : number,
id : number
}


@IonicPage()

@Component({
  selector: 'page-listaevento',
  templateUrl: 'listaevento.html',
})

export class ListaeventoPage 
{
  items = [];
  
  items_participante : usuario_interface[];
  
  eventos : any; 

  eventos_individual : evento_interface;

  idusuariologado : number;
  nomeusuarioloado : string;
  usuariologado   : usuario_interface;

  ulogado : usuario_interface[] = [];
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public evProvider:EventoProvider, 
                       
            )
            {
  //  for (let i = 0; i < 30; i++) {
  //    this.items.push( this.items.length );
  //  }


    this.usuariologado = this.navParams.get("usuariologado");
    this.idusuariologado = this.usuariologado.id;
    this.nomeusuarioloado = this.usuariologado.nomeusuario; 
    
    this.items_participante = [];
    //this.eventos_individual = eventoind;
    //this.eventos_individual.listaparticipantespresentes = [];
    //this.eventos_individual.listaparticipantespresentes = []; 
    

    this.evProvider.Buscatodoseventos().
    subscribe( 
                 data => {  
                            console.log("ok busca eventos"); 
                            this.eventos_individual = data;  
                            this.eventos = data;
                            //console.log(this.eventos);
                            //this.eventos_individual = JSON.parse(  JSON.stringify(this.eventos_individual ) );
                            //console.log(this.eventos_individual );
                            
                            for (let i = 0; i < data.length  ; i++) 
                              {
                                this.usuariopresentenoevento(i);
                                //this.salvarevento( i );
                                this.items.push( this.eventos_individual[i] );
                              }

                              
                        }, 
                 error => { console.log("error")  }  
             );
  
    
  
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad ListaeventoPage');
    this.evProvider.Buscatodoseventos();
  }

  ionViewWillEnter()
  {
    console.log('ionViewwillenter ListaeventoPage');
    this.evProvider.Buscatodoseventos();
  }

  novoevento()
  {
    //ManutencaoeventoPage
    this.navCtrl.push(ManutencaoeventoPage);
   
  }

  marcarirei( idevento : string  )
  {
     console.log("evento selecionado" + idevento );
     //Buscatodoseventosid( idevento );     
     this.evProvider.Buscatodoseventosid( idevento ).
     subscribe( 
                  data => {  
                             console.log("ok marcar irei ou nao"); 
                             this.eventos_individual = data;  
                                                   

                             this.usuarioentranalista();
                             
                             this.salvarevento( 0 ) ;
                           
                           }, 
                  error => { console.log("error")  }  
              );
  } 

  marcarnaoirei( idevento : string  )
  {
     console.log("evento selecionado" + idevento );
     //Buscatodoseventosid( idevento );     
     this.evProvider.Buscatodoseventosid( idevento ).
     subscribe( 
                  data => {  
                             console.log("ok marcar irei ou nao"); 
                             this.eventos_individual = data;  
                             console.log( this.eventos_individual ) 
                             this.usuarioremovenalista(0);

                             this.salvarevento(0);
                           }, 
                  error => { console.log("error")  }  
              );
  } 

  usuarioentranalista()
  {
    this.eventos_individual[0].listaparticipantespresentes.push( this.usuariologado  );
  }

  
  usuarioremovenalista( posicao : number )
  {
    console.log("remove lista" + this.eventos_individual[posicao] );
    console.log("posicao usuariologado" + this.eventos_individual[posicao].posicaousuariologadonalistapresentes);

    let pos : number;
    pos = -1;

    for (let i = 0; i < this.eventos_individual[posicao].listaparticipantespresentes.length  ; i++) 
    {
        if ( this.usuariologado.id == this.eventos_individual[posicao].listaparticipantespresentes[i].id)
          {
            pos = i;
            this.eventos_individual[posicao].posicaousuariologadonalistapresentes = pos;  
            console.log("encontrado " + pos);
            break;
          } 
    }
    
    if (this.eventos_individual[posicao].posicaousuariologadonalistapresentes > -1)
      {
          this.eventos_individual[posicao].listaparticipantespresentes.splice
            ( this.eventos_individual[posicao].posicaousuariologadonalistapresentes ,1);
          console.log("apagar lista presença");
      
      }
    
    }

  administracao( idevento : number)
  {
    
    this.evProvider.Buscatodoseventosid( idevento.toString() ).
    subscribe( 
                 data => {  
                            console.log("administracao" + idevento.toString() );
                            this.eventos_individual = data;  
                            
                            //this.items.push(this.eventos_individual[0]);                            
                            this.navCtrl.push(ManutencaoeventoPage,{eventoparam: this.eventos_individual[0]} );
                            
                            
                            console.log( this.eventos_individual[0] );         
                          }, 
                 error => { console.log("error")  }  
             );

    
    

  }  

  salvarevento(posicao : number)
  {
   
    console.log("salvar evento" + this.eventos_individual ); 
    console.log(this.eventos_individual ); 
    
    this.evProvider.Apagarevento( JSON.parse(  JSON.stringify( this.eventos_individual[posicao] ) )  ).
    subscribe( 
                 data => { console.log("apagar");    }, 
                 error => { console.log("error apagar")  }  
             );


    //this.evProvider.GravarEvento(this.eventos_individual);
    this.evProvider.GravarEvento( JSON.parse(  JSON.stringify( this.eventos_individual[posicao] ) )  ).
    subscribe( 
                 data => { console.log("gravado");    }, 
                 error => { console.log("error gravar")  }  
             );

            
    this.navCtrl.pop( );
          
    this.navCtrl.push(ListaeventoPage, {usuariologado : this.usuariologado }  );
               

    console.log("gravado"); 
  }

  usuariopresentenoevento(pos : number)
  {
      
    let achou : boolean;
    let posicao : number;
    achou = false;
    posicao = -1;
    for (let i = 0; i < this.eventos_individual[pos].listaparticipantespresentes.length  ; i++) 
    {
        if ( this.usuariologado.id == this.eventos_individual[pos].listaparticipantespresentes[i].id)
          {
              achou = true;
              posicao = i;
              break;
          } 
    }
    
    this.eventos_individual[pos].possuilistapresenca = achou; 
    this.eventos_individual[pos].posicaousuariologadonalistapresentes = posicao;
    console.log("presenca=" + pos + achou);
    console.log("posicaolista=" + pos + posicao);
  
  }

  listapresenca(idevento : string)
  {
    this.navCtrl.push(ListaparticipanteeventoPage, {param_idevento : idevento }  );
  
  }

}
