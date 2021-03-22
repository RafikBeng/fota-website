/// <reference types="w3c-web-serial" />

import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FotaService } from 'src/services/fota.service';
import { LoggerService } from 'src/services/logger.service';
import { Messages } from 'src/services/utils/messages';
import { ConverterService } from '../../services/utils/converter.service';

declare const navigator: any; 

@Component({
  selector: 'app-get-device',
  templateUrl: './get-device.component.html',
  styleUrls: ['./get-device.component.scss']
})
export class GetDeviceComponent implements OnInit {

  public terminalEvents: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  
  public serialAvailable: boolean = false;
  public connectedStatus: boolean = false;
  private port: SerialPort;
  
  constructor(
    private fotaService: FotaService,
    private logger: LoggerService,
    private converterService: ConverterService) { }

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
    // this.port.readable.cancel();
    this.port.readable.getReader().cancel()
    this.port.readable.getReader().releaseLock();
    await this.port.close()
    this.connectedStatus = false
  }

  async getDeviceInformation() {
    this.logger.emitTerminalEvents(Messages.RUNNING + GetDeviceComponent.prototype.getDeviceInformation.name);

    // reference: src/main/java/com/airoha/android/lib/fota/stage/FotaStage_07_GetModelName.java

    /**
     * Theoretically, execute the following to get device info:
     * 
     * 1. set NvKey = 0xF500
     * 2. convert nvKey from 16 to 8-bit
     * 3. open read stream?
     * 4. open write stream?
     * 5. send command (?)
     * 6. decode response:
     *      
     *  int length = Converter.BytesToShort(packet[3], packet[2]);

        if (length > 40) {
            byte[] company_name_hex = Arrays.copyOfRange(packet, 8, 28);
            byte[] model_name_hex = Arrays.copyOfRange(packet, 28, 48);
            String model_name_str = Converter.hexToAsciiString(model_name_hex);

            mOtaMgr.notifyModelName(model_name_str);

            RacePacket cmd = mCmdPacketMap.get(TAG);
            cmd.setIsRespStatusSuccess();
            mIsRespSuccess = true;
            mStatusCode = 0;
       7. close stream(s)
     */

    const NvKey: Byte = 0xF500; // int
    const cmd = this.fotaService.generateReadNvKeyPacket(ConverterService.shortToBytes(Int16Array[NvKey]));
    this.writeStream(cmd).then(result => {
      console.log(result);
    });
      
  }


  async connectToDevice() {

    this.logger.emitTerminalEvents(Messages.OPEN_CONNECTION);
    
    try {
      this.logger.emitTerminalEvents(Messages.WAITING_ON_USER);
      const localPort = await navigator.serial.requestPort();
      this.port = localPort;
      
      await this.port.open({ baudRate: 460800 });
      this.connectedStatus = true;
      this.logger.emitTerminalEvents(Messages.CONNECTED);
      this.readStream();
    } catch (e) {
      console.warn("Prompt was dismissed ", e);
      this.logger.emitTerminalEvents(Messages.GENERIC_ERROR + e);
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

  async writeStream(input) {
    // const textDecoder = new TextDecoderStream();
    // const readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
    // const reader = textDecoder.readable.getReader();


    // while (this.port.readable) {
    //   const reader = this.port.readable.getReader();
    // while (true) {
    //   const { value, done } = await reader.read();
    //   if (done) {
    //     reader.releaseLock();
    //     break;
    //   }
    //   // value is a string.
    //   console.log(value);
    // }
    //   reader.releaseLock();
    // }

    const encoder = new TextEncoder();
    const writer = this.port.writable.getWriter();
    await writer.write(input.mbArrLength).then(result => {
      // @todo - result is undefined
      console.log(result)
      // writer.releaseLock();
    });
  }

  // \\\\\\\\\\\\\\\\\\\
  //
  //  UTIL METHODS
  //
  // \\\\\\\\\\\\\\\\\\\

  getHidden() {
    return this.serialAvailable === true ? '' : 'none';  
  }

}
