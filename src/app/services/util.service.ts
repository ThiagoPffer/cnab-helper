import { Injectable } from '@angular/core';
import { EnumPositionType } from '../models/segment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  positionTypeContents: any = {
    'A': ' ',
    'N': '0',
    'D': '0',
    'M': '0'
  }

  constructor() { }

  public getChars(length: number, char: string): string {
    let i = 0;
    let chars = '';
    while(i < length) { 
      chars += char; 
      i++;
    }
    return chars;
  }

  public getContentByPositionType(positionLength: number, type: EnumPositionType): string {
    return this.getChars(positionLength, this.positionTypeContents[type]);
  }
  
}
