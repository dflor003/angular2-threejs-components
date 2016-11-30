import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Logger } from './common';
import { SceneComponent } from './scene/scene.component';
import { AxisComponent } from './scene/axis-component';
import { CameraComponent } from './scene/camera-component';
import { MeshComponent } from './scene/mesh.component';
import { MaterialComponent } from './scene/material.component';
import { BoxGeometryComponent } from './scene/geometry.component';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    SceneComponent,
    AxisComponent,
    CameraComponent,
    MeshComponent,
    MaterialComponent,
    BoxGeometryComponent,
  ],
  exports: [
    SceneComponent,
    AxisComponent,
    CameraComponent,
    MeshComponent,
    MaterialComponent,
    BoxGeometryComponent,
  ],
  providers: [
    Logger
  ],
})
export class ThreeJSComponentsModule {
  constructor() {
  }
}
