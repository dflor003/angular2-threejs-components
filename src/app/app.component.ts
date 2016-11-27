import { Component } from '@angular/core';
import { ApiService } from './shared';
import '../style/app.scss';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular2 WebGL Demo';

  constructor() {
  }
}
