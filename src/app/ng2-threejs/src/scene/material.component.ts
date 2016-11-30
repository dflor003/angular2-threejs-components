import { Component, OnInit, Input, OnChanges, SimpleChanges, ContentChild } from '@angular/core';
import { defaultTo } from 'lodash';
import { Base3DComponent } from './base-3d-component';
import { Material, MeshBasicMaterial, Color } from 'three';
import { Logger } from '../common/log.service';

@Component({
  selector: 'material',
  template: '',
  inputs: [...Base3DComponent.INPUTS],
})
export class MaterialComponent implements OnInit {
  private log: Logger;
  private _object: Material;


  constructor(logger: Logger) {
    this.log = logger.named('MATERIAL');
  }

  @Input() color: string;
  @Input() wireframe: boolean;

  get object() : Material {
    return this._object || (this._object = this.build());
  }

  ngOnInit(): void {

    this.log.info(`Initialized with`, this);
  }

  build(): Material {
    // Init camera
    return new MeshBasicMaterial({color: this.color, wireframe: this.wireframe});
  }
}
