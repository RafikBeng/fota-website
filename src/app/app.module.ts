import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetDeviceComponent } from './get-device/get-device.component';

// Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CautionHeaderComponent } from './caution-header/caution-header.component';
import { NotificationComponent } from './notification/notification.component';
import { TerminalComponent } from './terminal/terminal.component';

@NgModule({
  declarations: [
    AppComponent,
    GetDeviceComponent,
    CautionHeaderComponent,
    NotificationComponent,
    TerminalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [TerminalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
