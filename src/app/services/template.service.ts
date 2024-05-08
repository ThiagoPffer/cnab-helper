import { Template } from '../models/segment';
import { ITAU_400_4 } from './../templates/itau4004';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  
  templates: any = {
    1: ITAU_400_4
  }

  constructor() { }

  public getTemplateById(id: number): Template[] {
    return this.templates[id];
  }

}
