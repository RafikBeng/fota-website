/// <reference types="w3c-web-serial" />

import { Component, OnInit } from '@angular/core';

declare const navigator: any; 

@Component({
  selector: 'app-get-device',
  templateUrl: './get-device.component.html',
  styleUrls: ['./get-device.component.scss']
})
export class GetDeviceComponent implements OnInit {
  
  public serialAvailable: boolean = false;
  public connectedStatus: boolean = false;
  private port: SerialPort;
  
  constructor() { }

  ngOnInit(): void { 
    if ( 'serial' in navigator ) {
      this.serialAvailable = !this.serialAvailable;
    }
  }

   connectionButton() {
    if (this.connectedStatus) {
      return this.disconnectFromDevice();
    }
    return this.connectToDevice();
  }

  async disconnectFromDevice() {    
    this.port.writable.abort();
    this.port.readable.cancel()
    await this.port.close()
    this.connectedStatus = false
  }

  async getDeviceInformation() {
    await console.log(this.port.getSignals());
  }


  async connectToDevice() {
    try {
      const localPort = await navigator.serial.requestPort();
      this.port = localPort;
      await this.port.open({ baudRate: 460800 });
      this.connectedStatus = true;

      // this.readStream();

    } catch (e) {
      console.info("Prompt was dismissed ", e);
    }
  }


  async readStream() {
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
    var reader = textDecoder.readable.getReader();


    // while (this.port.readable) {
    //   const reader = this.port.readable.getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        reader.releaseLock();
        reader.cancel();
        await readableStreamClosed.catch( () => { /* ignore error */ });
        await this.port.close();
        break;
      }
      // value is a string.
      console.log(value);
    }
  }

  // async writeStream() {
  //   const textDecoder = new TextDecoderStream();
  //   const readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
  //   const reader = textDecoder.readable.getReader();


  //   // while (this.port.readable) {
  //   //   const reader = this.port.readable.getReader();
  //   while (true) {
  //     const { value, done } = await reader.read();
  //     if (done) {
  //       reader.releaseLock();
  //       break;
  //     }
  //     // value is a string.
  //     console.log(value);
  //   }
  //     // reader.releaseLock();
  //   // }
  // }


  getHidden() {
    return this.serialAvailable === true ? '' : 'none';  
  }
  
}
