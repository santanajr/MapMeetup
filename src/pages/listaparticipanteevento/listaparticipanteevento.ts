import { evento_interface } from './../listaevento/listaevento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventoProvider } from './../../providers/evento/evento';

/**
 * Generated class for the ListaparticipanteeventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listaparticipanteevento',
  templateUrl: 'listaparticipanteevento.html',
})

export class ListaparticipanteeventoPage {

  eventos_individual : evento_interface;

  items = [];
  
  ideventoselecionado :string;
  statusatual : string;
  novostatus  : string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public evProvider:EventoProvider  )
  {
    this.ideventoselecionado = this.navParams.get("param_idevento");
    this.buscausuariosparticipantes( this.ideventoselecionado );
    
  }

  buscausuariosparticipantes( idevento : string )
  {
    this.evProvider.Buscatodoseventosid( idevento ).
    subscribe( 
                 data => {                              
                            
                            this.eventos_individual = data;  
                            console.log( this.eventos_individual ) 
                            //this.usuarioremovenalista(0);
                            for (let i = 0; i < this.eventos_individual[0].listaparticipantespresentes.length; i++) 
                            {
                               if (this.eventos_individual[0].listaparticipantespresentes[i].presenca== "")
                                 {
                                  this.eventos_individual[0].listaparticipantespresentes[i].presenca = 
                                      "Confirmado";
                                 }
                               this.items.push( this.eventos_individual[0].listaparticipantespresentes[i] );
                            }


                          }, 
                 error => { console.log("error")  }  
             );


  }

  trocarstatuspaticipante( idusuarioparticipante : string , statusatual : string, perfil : string )
  {
    
    if (perfil == "ADM")
    {
      if (  
            ( statusatual != undefined) || 
            (statusatual == "")  || 
            ( statusatual == "Faltei" ) || 
            ( statusatual == "Confirmado" )  
          )   
      {
        this.novostatus = "Presente";
      }      
      else
       {
         if ( (statusatual != undefined ) &&   (statusatual == "Presente") )
           {
             this.novostatus = "Faltei";
           }      
        }
    }

    if (perfil == "USU")
    {
      if ( (statusatual.trim() == "") || ( statusatual.trim() == "Não irei" ) )   
      {
        this.novostatus = "A caminho";
      }      
      else
       {
         if (statusatual.trim() == "A caminho")
           {
             this.novostatus = "Cheguei";
           }      
          else
          {
            if (statusatual.trim() == "Cheguei")
            {
              this.novostatus = "Não irei";
            }      
          }
        }
    }
    console.log(statusatual);
    console.log(this.novostatus);
    
    this.evProvider.Buscatodoseventosid( this.ideventoselecionado ).
    subscribe( 
                 data => {                              
                            
                            this.eventos_individual = data;  
                            console.log( this.eventos_individual) 
                            //this.usuarioremovenalista(0);
                            for (let i = 0; i < this.eventos_individual[0].listaparticipantespresentes.length; i++) 
                            {
                               this.items.pop();
                            }  

                            for (let i = 0; i < this.eventos_individual[0].listaparticipantespresentes.length; i++) 
                            {
                                if (idusuarioparticipante == this.eventos_individual[0].
                                                              listaparticipantespresentes[i].idusuario )
                                {
                                  if (this.eventos_individual[0].listaparticipantespresentes[i].presenca != undefined)
                                    {
                                       this.eventos_individual[0].listaparticipantespresentes[i].presenca = 
                                        this.novostatus;
                                    }    
                                }
                                
                                this.items.push( this.eventos_individual[0].listaparticipantespresentes[i] );                                
                            
                            }
                           
                              this.evProvider.AtualizarEvento( JSON.parse(  JSON.stringify( this.eventos_individual[0] ) )  ).
                              subscribe( 
                                           data => { console.log("gravado");    }, 
                                           error => { console.log("error gravar")  }  
                                       );
                         

                          }, 
                 error => { console.log("error")  }  
             );
      

  }

  trocarpalestrante( idusuarioparticipante : string , statusatual : string, perfil : string )
  {
    
    if (perfil == "ADM")
    {
      if ( (statusatual == "X")  )   
      {
        this.novostatus = "";
      }      
      else
       {
         if (statusatual == "")
           {
             this.novostatus = "X";
           }      
        }
    }

    this.evProvider.Buscatodoseventosid( this.ideventoselecionado ).
    subscribe( 
                 data => {                              
                            
                            this.eventos_individual = data;  
                            console.log( this.eventos_individual) 
                            //this.usuarioremovenalista(0);
                            for (let i = 0; i < this.eventos_individual[0].listaparticipantespresentes.length; i++) 
                            {
                               this.items.pop();
                            }  

                            for (let i = 0; i < this.eventos_individual[0].listaparticipantespresentes.length; i++) 
                            {
                                if (idusuarioparticipante == this.eventos_individual[0].listaparticipantespresentes[i].idusuario )
                                {
                                   this.eventos_individual[0].listaparticipantespresentes[i].palestrante = 
                                          this.novostatus;
                                }
                                
                                this.items.push( this.eventos_individual[0].listaparticipantespresentes[i] );                                
                            
                            }
                           
                              this.evProvider.AtualizarEvento( JSON.parse(  JSON.stringify( this.eventos_individual[0] ) )  ).
                              subscribe( 
                                           data => { console.log("gravado");    }, 
                                           error => { console.log("error gravar")  }  
                                       );
                         

                          }, 
                 error => { console.log("error")  }  
             );
      

  }


  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad ListaparticipanteeventoPage');
    
  }

}
