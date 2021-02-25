import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  
  @Input() statusConsumer: boolean;

  statusColour = [
    {
      'status': true,
      'colour': '#56D364',
    },
    {
      'status': false,
      'colour': '#F85149',
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  getColour(element?: string) {
      return this.statusColour.filter(item => item.status == this.statusConsumer)[0].colour;
  }

}
