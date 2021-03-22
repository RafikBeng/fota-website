import { Injectable } from '@angular/core';
import { RacePacketService } from './race/race-packet.service';
import { ConverterService } from './utils/converter.service';

import { RaceId } from './race/race-id';
import { RaceType } from './race/race-type';
import { Byte } from '@angular/compiler/src/util';
import { AppId } from './race/app-id';
import { LoggerService } from './logger.service';
import { Messages } from './utils/messages';

@Injectable({
  providedIn: 'root'
})
export class FotaService {

  private mRaceId: Byte = 0;
  private mRaceRespType: Byte = RaceType.RESPONSE;

  constructor(
    private racePacketService: RacePacketService,
    private logger: LoggerService,
    private converterService: ConverterService) { }

  /**
   * 
   * @param queryId 8bitArray to enforce type byte - only reads position [0]
   */
  public generateReadNvKeyPacket(queryId: Int8Array) {
    this.mRaceId = RaceId.RACE_NVKEY_READFULLKEY as Byte;
    this.mRaceRespType = RaceType.RESPONSE;
    
    this.logger.emitTerminalEvents(
      Messages.RUNNING 
      + FotaService.prototype.generateReadNvKeyPacket.name 
      + " MMI: " + AppId.MMI
      + " RACETYPE: " + RaceType.CMD_NEED_RESP
      + " RaceID: " + this.mRaceId);

    this.racePacketService.racePacket(AppId.MMI, RaceType.CMD_NEED_RESP, this.mRaceId);
    
    // @todo - resume implementation @ line 26 - need to create convertor service
    // source: src/main/java/com/airoha/android/lib/fota/stage/FotaStage.java
    let short = new ArrayBuffer(16);
    short[1000];
    const queryLength: Int8Array = ConverterService.shortToBytes(short[0]);

    // @todo - fails at this line: "Not a constructor"
    let payload = new ArrayBuffer(8); //[queryId[0], queryId[1], queryLength[0], queryLength[1]];

    payload[queryId[0], queryId[1], queryLength[0], queryLength[1]];

    this.racePacketService.setPayload(payload);

    return this.racePacketService;

  }

}
