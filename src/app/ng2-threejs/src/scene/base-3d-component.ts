import { Input } from '@angular/core';
import { Object3D } from 'three';

export abstract class Base3DComponent {
  private _object: Object3D = null;

  static INPUTS = ['visible', 'x', 'y', 'z']

  get visible(): boolean {
    return this.object.visible;
  };

  @Input() set visible(val: boolean) {
    this.object.visible = val;
  };

  get x(): number {
    return this.object.position.x;
  }

  @Input() set x(val: number) {
    this.object.position.x = val;
  };

  get y(): number {
    return this.object.position.y;
  }

  @Input() set y(val: number) {
    this.object.position.y = val;
  };

  get z(): number {
    return this.object.position.z;
  }

  @Input() set z(val: number) {
    this.object.position.z = val;
  };

  constructor() {

  }

  get object(): Object3D {
    return this._object || (this._object = this.build());
  }

  abstract build(): Object3D;
}
