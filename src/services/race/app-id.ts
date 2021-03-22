import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppId {

  constructor() { }

    public static FOTA: Byte = 0x10;
    public static MMI: Byte = 0x00;
    
}
