import { LoginProvider } from './../providers/login/login';
import { LoginPage } from './../pages/login/login';
import { adicionarusuarioPage } from './../pages/adicionarusuario/adicionarusuario';

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any= 'LoginPage'  ;// = TabsPage

  constructor(platform: Platform, statusBar: StatusBar, 
              splashScreen: SplashScreen, LoginProv : LoginProvider ) 
  {
     
    // this.rootPage = LoginPage;
    
    //platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      //splashScreen.hide();
    //});
  }
}
