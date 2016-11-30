import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { defaultTo } from 'lodash';
import { Base3DComponent } from './base-3d-component';
import { Camera, PerspectiveCamera } from 'three';
import { Logger } from '../common/log.service';

@Component({
  selector: 'camera',
  template: '',
  inputs: [...Base3DComponent.INPUTS],
  providers: [Logger]
})
export class CameraComponent extends Base3DComponent implements OnInit {

  static DefaultFov = 75;

  private log: Logger;

  @Input() fov: number;
  @Input() aspectRatio: number;
  @Input() near: number;
  @Input() far: number;
  @Input() target: Base3DComponent;

  constructor(logger: Logger) {
    super();
    this.log = logger.named('CAMERA');
  }

  ngOnInit(): void {
    this.fov = defaultTo(this.fov, CameraComponent.DefaultFov);
    this.aspectRatio = defaultTo(this.aspectRatio, 1920 / 1080);
    this.near = defaultTo(this.near, 0.1);
    this.far = defaultTo(this.far, 1000);

    this.log.info(`Initialized with`, this);
  }

  build(): Camera {
    return new PerspectiveCamera(this.fov, this.aspectRatio, this.near, this.far);
  }
}
