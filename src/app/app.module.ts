import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ThreeJSComponentsModule } from './ng2-threejs/src';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Logger } from './ng2-threejs/src';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ThreeJSComponentsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers: [
    Logger
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
