import { ListaparticipanteeventoPage } from './../pages/listaparticipanteevento/listaparticipanteevento';
import { ManutencaoeventoPage, cl_evento } from './../pages/manutencaoevento/manutencaoevento';
import { ListaeventoPage } from './../pages/listaevento/listaevento';
import { LoginPage } from './../pages/login/login';
import { adicionarusuarioPage } from './../pages/adicionarusuario/adicionarusuario';


import { NgModule, ErrorHandler } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';

import { HttpModule } from '@angular/http';
import { AdicionarusuarioProvider } from '../providers/adicionarusuario/adicionarusuario';
import { EventoProvider } from '../providers/evento/evento';
import { ListaparticipanteeventoProvider } from '../providers/listaparticipanteevento/listaparticipanteevento';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    adicionarusuarioPage,
    ListaeventoPage,
    ManutencaoeventoPage,
    ListaparticipanteeventoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    adicionarusuarioPage,
    ListaeventoPage,
    ManutencaoeventoPage,
    ListaparticipanteeventoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    AdicionarusuarioProvider,
    EventoProvider, cl_evento,
    ListaparticipanteeventoProvider
  ]
})
export class AppModule {}
