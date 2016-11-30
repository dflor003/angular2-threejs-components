import { Component, OnInit, Input, OnChanges, SimpleChanges, ContentChild, AfterContentInit } from '@angular/core';
import { defaultTo } from 'lodash';
import { Base3DComponent } from './base-3d-component';
import { Object3D, BoxGeometry } from 'three';
import { Logger } from '../common/log.service';
import { MaterialComponent } from './material.component';

@Component({
  selector: 'geometry',
  template: '',
  inputs: [...Base3DComponent.INPUTS],
})
export class BoxGeometryComponent implements OnInit {
  private log: Logger;
  private _object: BoxGeometry;

  get width(): number {
    return this.object.parameters.width;
  }

  @Input() set width(val: number) {
    this.object.parameters.width = val;
  }

  get height(): number {
    return this.object.parameters.height;
  }

  @Input() set height(val: number) {
    this.object.parameters.height = val;
  }

  get depth(): number {
    return this.object.parameters.depth;
  }

  @Input() set depth(val: number) {
    this.object.parameters.depth = val;
  }

  get object(): BoxGeometry {
    return this._object || (this._object = this.build());
  }

  constructor(logger: Logger) {
    this.log = logger.named('MESH');
  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.log.info(`Initialized with`, this);
  }

  build(): BoxGeometry {
    return new BoxGeometry(0, 0, 0);
  }
}
