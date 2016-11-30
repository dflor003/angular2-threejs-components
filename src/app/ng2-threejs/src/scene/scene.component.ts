import {
  Component, ElementRef, Input, OnInit, OnDestroy, QueryList,
  ContentChildren, AfterContentInit, ContentChild,
} from '@angular/core';
import { Scene, WebGLRenderer, PerspectiveCamera } from 'three';
import { defaultTo } from 'lodash';
import { Logger } from '../common';
import { Base3DComponent } from './base-3d-component';
import { CameraComponent } from './camera-component';

const DefaultWidth = 640;
const DefaultHeight = 480;
const DefaultClearColor = '#6495ED';

@Component({
  selector: 'scene',
  template: `
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `],
})
export class SceneComponent implements OnInit, OnDestroy, AfterContentInit {
  private contentElement: ElementRef;
  private scene = new Scene();
  private renderer = new WebGLRenderer();
  private log: Logger;
  private animationFrameHandle: number;
  private running = false;

  @Input() width: number;
  @Input() height: number;
  @Input() aspectRatio: number;
  @Input() enabled: boolean = true;
  @Input() clearColor: string;

  @ContentChild(CameraComponent) camera: CameraComponent;
  @ContentChildren(Base3DComponent) children: QueryList<any>;

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
    this.clearColor = defaultTo(this.clearColor, DefaultClearColor);

    // Add DOM element
    renderer.setClearColor(this.clearColor);
    const rendererElement = renderer.domElement;
    rendererElement.style.display = 'block';
    rendererElement.style.width = '100%';
    rendererElement.style.height = '100%';
    element.appendChild(rendererElement);

    log.info(`Scene initialized with settings`, this);

    // Begin render loop
    this.start();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  ngAfterContentInit(): void {
    // Init camera
    if (!this.camera) {
      throw new Error(`No camera specified in scene`);
    }

    // Subscribe to child changes
    this.onChildrenChanged(this.children.toArray());
    this.children.changes.subscribe(newChildren => this.onChildrenChanged(newChildren));
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

  onChildrenChanged(newChildren: any[]): void {
    const log = this.log;
    log.info('New children', newChildren);
    for (let child of newChildren) {
      this.scene.add(child.object);
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
        throw err;
      }
    }

    this.animationFrameHandle = requestAnimationFrame(() => this.renderLoop());
  }

  private render(): void {
    if (this.camera.target) {
      console.log('Looking at', this.camera.target);
      this.camera.object.lookAt(this.camera.target.object.position);
    }
    this.renderer.render(this.scene, this.camera.object as any);
  }
}
