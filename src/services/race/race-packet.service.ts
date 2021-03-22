import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { LoggerService } from '../logger.service';
import { Messages } from '../utils/messages';

import { AppId } from './app-id';

@Injectable({
  providedIn: 'root'
})
export class RacePacketService {

  private mCmdHeader: Byte = AppId.FOTA;

  private mbType: Byte;
  private mbArrID = new ArrayBuffer(8);
  // private mbArrID = new Int8Array(2);
  private mbArrLength = new ArrayBuffer(8);
  // private mbArrLength = new Int8Array[2];
  private mRaceId: Number;

  private mbArrPayload = new ArrayBuffer(8);
  private mLength: Number | any;    // any for line 59


  constructor(private logger: LoggerService) { }

  // private constructRacePacket(type: Byte, id: Uint8Array, payload: Uint8Array){    //unsure if will throw becasue of 'id'
  private constructRacePacket(type: Byte, id: Int8Array, payload: Int8Array){
    this.mbType = type;
    this.mbArrID = id;

    // from com/airoha/android/lib/RaceCommand/packet/RacePacket.java
    //
    // this.mbArrID = new byte[]{(byte) (id & 0xFF), (byte) ((id >> 8) & 0xFF)};
    let mbArr1 = (id as any & 0xFF);
    let mbArr2 = ((id as any >> 8) & 0xFF);

    if (mbArr1 == undefined) {
      mbArr1 = 0;
    }
    if (mbArr2 == undefined) {
      mbArr1 = 0;
    }

    this.mbArrID = mbArr1 + mbArr2

    this.logger.emitTerminalEvents(
      Messages.RUNNING 
      + RacePacketService.prototype.constructRacePacket.name 
      + " TYPE: " + type
      + " PAYLOAD: " + payload
      + " ARRID: " + this.mbArrID);

    this.setPayload(payload);
  }

  
  public racePacket(cmdHeader: Byte, type: Byte, id: Byte): void {
    this.constructRacePacket(type, Int8Array[id], null);
    this.mCmdHeader = cmdHeader;
  }

  public setPayload(payload: ArrayBuffer) {
    this.mbArrPayload = payload;

    this.mLength = this.mbArrID.byteLength;
    if (payload != null) {
        this.mLength = this.mbArrID.byteLength + payload.byteLength;
        this.mbArrPayload = payload;
    }

    // from com/airoha/android/lib/RaceCommand/packet/RacePacket.java
    //
    // this.mbArrLength[0] = (byte) (mLength & 0xFF); // & cast operator: https://stackoverflow.com/questions/51070344/strange-java-cast-syntax-using
    // this.mbArrLength[1] = (byte) ((mLength >> 8) & 0xFF); //binary right-shift operator 1100 >> = 0110. Here it's shifted 8 times
    this.mbArrLength[0] = this.mLength & 0xFF
    this.mbArrLength[1] = (this.mLength >> 8) & 0xFF;

    this.logger.emitTerminalEvents(Messages.PAYLOAD + this.mbArrLength[0] + this.mbArrLength[1]);
    return this.mbArrLength;    // @todo - might pop
  }

}
