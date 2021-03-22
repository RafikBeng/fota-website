import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ITerminalOptions, Terminal } from "xterm";

import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TerminalComponent implements AfterViewInit, OnDestroy {

  @ViewChild('terminal') terminalDiv: ElementRef;
  
  private terminalEventsSubscription: Subscription;

  public terminal: Terminal;
  static terminalOptions: ITerminalOptions = {
    cursorBlink: false,
    cursorStyle: 'block',
    rows: 36
  }

  constructor(private logger: LoggerService) { }

  getMessage() {
    return this.logger.terminalEvents.getValue() as unknown as string;
  }

  writeLineToTerminal() {
    const message = this.getMessage();
    if (message != null) {
      this.terminal.writeln(message);
    }
  }

  ngAfterViewInit(): void {
    this.terminal = new Terminal(TerminalComponent.terminalOptions);
    this.terminal.open(this.terminalDiv.nativeElement);
    this.terminalEventsSubscription = this.logger.terminalEvents.subscribe(() => this.writeLineToTerminal())
  }

  ngOnDestroy(): void {
    this.terminalEventsSubscription.unsubscribe();
  }

}


