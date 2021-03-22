import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  public terminalEvents: BehaviorSubject<void> = new BehaviorSubject<void>(null);

  constructor() { }

  emitTerminalEvents(message) {
    this.terminalEvents.next(message);
  }

}
