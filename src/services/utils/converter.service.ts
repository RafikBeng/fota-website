import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  
  private static chars: String = "0123456789ABCDEF";
  private static mChars = [...ConverterService.chars];

  constructor() { }

  public static shortToBytes(value: Int16Array) {
      let b = new Int8Array(2);
      b[1] = ((value as unknown as Byte >> 8) & 0xFF);
      b[0] = (value as unknown as Byte & 0xFF);
      return b;
  }

  // to signed short
  public static BytesToShort(high: Byte, low: Byte) {
      return Number(((high & 0xFF) << 8) | (low & 0xFF));
  }

}
