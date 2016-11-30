import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AxisHelper } from 'three';
import { defaultTo } from 'lodash';
import { Base3DComponent } from './base-3d-component';
import { Object3D } from 'three';

@Component({
  selector: 'axis',
  template: '',
  inputs: [...Base3DComponent.INPUTS],
  providers: [
    { provide: Base3DComponent, useClass: AxisComponent }
  ]
})
export class AxisComponent extends Base3DComponent implements OnInit {

  static DefaultLineSize = 10;

  @Input() size: number;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.size = defaultTo(this.size, AxisComponent.DefaultLineSize);
  }

  build(): Object3D {
    return new AxisHelper(this.size);
  }
}
