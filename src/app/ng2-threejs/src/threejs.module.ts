import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Logger } from './common';
import { SceneComponent } from './scene/scene.component';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    SceneComponent,
  ],
  exports: [
    SceneComponent,
  ],
  providers: [
    Logger
  ],
})
export class ThreeJSComponentsModule {
  constructor() {
  }
}
