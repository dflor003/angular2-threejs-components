import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Scene, WebGLRenderer, PerspectiveCamera } from 'three';
import { defaultTo } from 'lodash';
import { Logger } from '../common';

const DefaultWidth = 640;
const DefaultHeight = 480;

@Component({
  selector: 'wgl-scene',
  template: `
    <div class="threejs-scene" #contentElement>
    </div>
  `,
  styles: [`
    .threejs-scene {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class SceneComponent implements OnInit, OnDestroy {
  private contentElement: ElementRef;
  private scene = new Scene();
  private renderer = new WebGLRenderer();
  private camera: PerspectiveCamera;
  private log: Logger;
  private animationFrameHandle: number;
  private running = false;

  @Input() width: number;
  @Input() height: number;
  @Input() aspectRatio: number;
  @Input() enabled: boolean = true;

  constructor(contentElement: ElementRef, logger: Logger) {
    this.contentElement = contentElement;
    this.log = logger.named('SCENE');
  }

  ngOnInit(): void {
    const element = this.contentElement.nativeElement;
    const renderer = this.renderer;
    const log = this.log;

    // Default props
    this.width = defaultTo(this.width, element.width || DefaultWidth);
    this.height = defaultTo(this.height, element.height || DefaultHeight);
    this.aspectRatio = defaultTo(this.aspectRatio, this.width / this.height);

    // Init camera
    this.camera = new PerspectiveCamera(75, this.aspectRatio, 0.1, 1000);

    // Add DOM element
    element.appendChild(renderer.domElement);

    log.info(`Scene initialized with settings`, {
      width: this.width,
      height: this.height,
      aspectRatio: this.aspectRatio
    });

    // Begin render loop
    this.start();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  start(): void {
    this.running = true;
    this.renderLoop();
  }

  stop(): void {
    this.running = false;
    if (typeof this.animationFrameHandle === 'number') {
      cancelAnimationFrame(this.animationFrameHandle);
    }
  }

  private renderLoop(): void {
    if (!this.running) {
      return;
    }

    if (this.enabled) {
      try {
        this.render();
      } catch (err) {
        this.log.error(`Error during frame`, err);
      }
    }

    this.animationFrameHandle = requestAnimationFrame(() => this.renderLoop());
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera);
  }
}
