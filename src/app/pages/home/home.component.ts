import { Component } from '@angular/core';
import type { Bank, Cnab, FileOption, Options } from "../../models/bank";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ITAU_400_4 } from '../../templates/itau4004';

@Component({
  selector: 'c-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

	selectedBankCnabs: Cnab[] = [];
	selectedOptions: Options = {};
	content: string = '';
	banks: Bank[] = [
		{
			code: 341, 
			name: 'Banco Itaú', 
			imgName: 'itau.svg', 
			selected: false,
			cnabs: [
				{ id: 1, name: 'SISPAG - CNAB 240 - VERSÃO 085', fileOptions: [] },
				{ id: 2, name: 'SISPAG - CNAB 240 - VERSÃO 080', fileOptions: [] },
				{ id: 3, name: 'COBRANÇA BANCÁRIA - CNAB 400', fileOptions: [
					{ id: 1, name: 'Retorno' }
				]},
				{ id: 4, name: 'COBRANÇA BANCÁRIA - CNAB 240', fileOptions: [] }
			]
		},
		{
			code: 136,
			name: 'Banco Unicred',
			imgName: 'unicred.png',
			selected: false,
			cnabs: [
				{ id: 5, name: 'COBRANÇA BANCÁRIA - CNAB 400', fileOptions: [
					{ id: 2, name: 'Retorno' }	
				]}
			]
		}
	]
	

  	constructor(private router: Router) {}

	bankSelected(bank: Bank) {
    	bank.selected = !bank.selected;

		if (!bank.selected) {
			this.selectedBankCnabs = [];
			this.selectedOptions = {};
			return;
		}
		
		this.selectedBankCnabs = bank.cnabs;
		this.selectedOptions.bank = bank;
	}

	cnabSelected(cnab: Cnab) {
		this.selectedOptions.cnab = cnab;
		delete this.selectedOptions.fileTypeId;
	}

	fileTypeSelected(fileType: FileOption) {
		this.selectedOptions.fileTypeId = fileType.id;
	}

	start(startNew: boolean) {
		if (!startNew && this.content) {
			this.selectedOptions.content = this.content;
		}
		localStorage.setItem('options', JSON.stringify(this.selectedOptions));
		this.router.navigate(['/editor']);
	}

}
