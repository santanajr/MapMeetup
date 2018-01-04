import { eventomanutencao_interface } from './manutencaoevento';
import { usuario_interface } from './../adicionarusuario/adicionarusuario';
import { ListaeventoPage, evento_interface } from './../listaevento/listaevento';
import { Http } from '@angular/http';
import { EventoProvider } from './../../providers/evento/evento';
import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestOptions, Headers, URLSearchParams } from '@angular/http';

/**
 * Generated class for the ManutencaoeventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class cl_evento
{
  public titulo : string ;
  public descricao : string;
  public dataevento: string;
  public horaevento: string;
  public cidade: string;
  public estado: string;
  public usuarioresponsavel: string;
  public nomeresponsavel: string;
  public listaparticipantespresentes : usuario_interface[] ;
  public statusevento: string;
  public motivocancelamentoouadiamento: string;
  public possuilistapresenca : boolean;
  public posicaousuariologadonalistapresentes : number;
  public id : number;
}


export interface eventomanutencao_interface
{
id : number,
titulo : string ,
descricao : string,
dataevento: string,
horaevento: string,
cidade: string,
estado: string,
usuarioresponsavel: string,
nomeresponsavel: string,
statusevento: string,
motivocancelamentoouadiamento: string
}


@IonicPage()

@Component({
  selector: 'page-manutencaoevento',
  templateUrl: 'manutencaoevento.html',
})
export class ManutencaoeventoPage 
{
  public id : number;
  public titulo : string;
  public descricao : string;
  public dataevento : string;
  public horaevento : string;
  public cidade : string;
  public estado : string;
  public statusevento :string;
  public motivocancelamentoouadiamento : string;

   
  public listaparticipantespresentes : usuario_interface[];
  
  usuariologado   : usuario_interface;
  
  eventos_individual : evento_interface;
  eventomanutencao : eventomanutencao_interface;

  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public EvProvider : EventoProvider,
              public Http : Http , 
              public ev1 : cl_evento         
            ) 
  {
    if ( this.navParams.get('eventoparam') != undefined )
    {
       this.eventos_individual = this.navParams.get('eventoparam');
       this.titulo = this.eventos_individual.titulo;
       this.cidade = this.eventos_individual.cidade;
       this.dataevento = this.eventos_individual.dataevento;
       this.descricao = this.eventos_individual.descricao;
       this.estado = this.eventos_individual.estado;
       this.horaevento = this.eventos_individual.horaevento;
       this.statusevento = this.eventos_individual.statusevento;
       this.motivocancelamentoouadiamento = this.eventos_individual.motivocancelamentoouadiamento;
       this.listaparticipantespresentes = this.eventos_individual.listaparticipantespresentes;
       this.id = this.eventos_individual.id;
    }
    else
    {
      this.titulo = "";
      this.cidade = "";
      this.dataevento = "";
      this.descricao = "";
      this.estado = "";
      this.horaevento = "";
      this.statusevento = "";
      this.motivocancelamentoouadiamento = "";
      this.listaparticipantespresentes = [];
      this.id = 0;
    }
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad ManutencaoeventoPage');
    
    this.usuariologado = this.navParams.get("usuariologado");
    
    console.log( this.navParams.get('eventoparam') );
    
  }

  salvarevento( )
  {
    this.usuariologado = this.navParams.get("usuariologado");
    if ( this.navParams.get('eventoparam') != undefined )
    {
       this.EvProvider.Buscatodoseventosid(  this.eventos_individual.id.toString()  ).
       subscribe( 
                    data => { 
                        //console.log("apagar evento");    
                        this.eventos_individual = data;                         
                     }, 
                    error => { console.log("error apagar evento1")  }  
                 );


       this.eventos_individual.titulo = this.titulo;
       this.eventos_individual.cidade = this.cidade;
       this.eventos_individual.dataevento = this.dataevento;
       this.eventos_individual.descricao = this.descricao;
       this.eventos_individual.estado = this.estado;
       this.eventos_individual.horaevento = this.horaevento;
       this.eventos_individual.statusevento = this.statusevento;
       this.eventos_individual.motivocancelamentoouadiamento = this.motivocancelamentoouadiamento;
       // this.eventos_individual.listaparticipantespresentes = this.listaparticipantespresentes;
       this.eventos_individual.id = this.id;

       console.log(this.eventos_individual);
    
 
      this.EvProvider.AtualizarEvento( JSON.parse(  JSON.stringify( this.eventos_individual ) )  ).
                 subscribe( 
                              data => { 
                                         //console.log("ok gravar evento"); 
                                        // this.navCtrl.push(ListaeventoPage)
                                        this.navCtrl.pop();                                        
                                        }, 
                              error => { console.log("error gravar evento")  }  
                          );
 
                          
    
  }
    else
    {
      
      let varjson = {

        "titulo" : this.titulo,
        "cidade" : this.cidade,
        "dataevento" : this.dataevento,
        "descricao" : this.descricao,
        "estado" : this.estado,
        "horaevento" : this.horaevento,
        "statusevento" : this.statusevento,
        "motivocancelamentoouadiamento" : this.motivocancelamentoouadiamento,
        "listaparticipantespresentes" : this.listaparticipantespresentes,
        "possuilistapresenca" : false,
        "posicaousuariologadonalistapresentes" : -1,
        "usuarioresponsavel": this.usuariologado.id,
        "nomeresponsavel": this.usuariologado.nomeusuario,
        "id" : this.id

      }
      
     this.EvProvider.GravarEvento( JSON.parse(  JSON.stringify( varjson ) )  ).
                subscribe( 
                             data => { 
                                        console.log("ok gravar evento"); 
                                       // this.navCtrl.push(ListaeventoPage) 
                                       }, 
                             error => { console.log("error gravar evento")  }  
                         );
    
    }

    
  }
  
}
