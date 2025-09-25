import { Template } from '../models/segment';
import { UNICRED_400 } from '../templates/unicred400';
import { ITAU_400_4 } from './../templates/itau4004';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  
  templates: any = {
    1: ITAU_400_4,
    2: UNICRED_400,
  }

  constructor() { }

  public getTemplateById(id: number): Template[] {
    return this.templates[id];
  }

}
