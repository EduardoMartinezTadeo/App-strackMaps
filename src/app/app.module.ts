import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Network } from '@ionic-native/network/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Brightness } from '@ionic-native/brightness/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
    }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    SuperTabsModule.forRoot(),
    FormsModule,
    HttpClientModule,
    CustomFormsModule],
  providers: [
    ScreenOrientation,
    StatusBar,
    Network,
    Geolocation,
    Brightness,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
