import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Pour utiliser notre Firebase sur notre appli
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import { MyApp } from './app.component';
import { FB2Config } from './credentials';
import { ShoppingListService } from '../services/shopping-list/shopping-list.service';

// pages de mon application 
//import { HomePage } from '../pages/home/home';
  


@NgModule({
  declarations: [
    MyApp,
    //HomePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    AngularFireModule.initializeApp(FB2Config),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //ajout du service utiliser dans l'appli
    ShoppingListService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
