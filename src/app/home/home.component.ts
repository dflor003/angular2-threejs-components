import { Component, OnInit } from '@angular/core';
import { Logger } from '../common';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private log: Logger;

  constructor(log: Logger) {
    this.log = log;
  }

  ngOnInit() {
    this.log.info('Loaded home');
  }

}
