import { Component, OnInit, Input, OnChanges, SimpleChanges, ContentChild, AfterContentInit } from '@angular/core';
import { defaultTo } from 'lodash';
import { Base3DComponent } from './base-3d-component';
import { Object3D, Mesh } from 'three';
import { Logger } from '../common/log.service';
import { MaterialComponent } from './material.component';
import { BoxGeometryComponent } from './geometry.component';

@Component({
  selector: 'mesh',
  template: '',
  inputs: [...Base3DComponent.INPUTS],
  providers: [
    { provide: Base3DComponent, useClass: MeshComponent }
  ]
})
export class MeshComponent extends Base3DComponent implements OnInit, AfterContentInit {
  private log: Logger;

  constructor(logger: Logger) {
    super();
    this.log = logger.named('MESH');
  }

  @ContentChild(MaterialComponent) material: MaterialComponent;
  @ContentChild(BoxGeometryComponent) geometry: BoxGeometryComponent;

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.log.info(`Initialized with`, this);
  }

  build(): Object3D {
    return new Mesh(this.geometry.object, this.material.object);
  }
}
