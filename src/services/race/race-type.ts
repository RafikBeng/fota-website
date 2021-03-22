import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RaceType {

  constructor() { }

    public static CMD_NEED_RESP: Byte = 0x5A;
    public static RESPONSE: Byte = 0x5B;
    public static CMD_NO_RESP: Byte = 0x5C;
    public static INDICATION: Byte = 0x5D;

}
