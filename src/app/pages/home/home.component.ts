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
	content: string = `02RETORNO01COBRANCA       072400654321        DUNDER MIFFLIN PAPER COMPANY L341BANCO ITAU S.A.12032401600BPI00050120324                                                                                                                                                                                                                                                                                   000001
10216958379000187072400654321        T280220240101            00000001            099000000011             I06040923000831500100000325            04092300000013373783416305701000000000014000000000000000000000000000000000000000000000000000000000000040121000000129711700000000000000000000000000   05092300000000000000000000000MUNDIALMIX COMERCIO DE ALIM...                                      CK000016
10216958379000187072400654321        T280220240101            00000001            099000000011             I06040923000831500100000325            04092300000013373783416305701000000000014000000000000000000000000000000000000000000000000000000000000040121000000129711700000000000000000000000000   05092300000000000000000000000MUNDIALMIX COMERCIO DE ALIM...                                      CK000016
10216958379000187072400654321        T280220240101            00000001            099000000011             I06040923000831500100000325            04092300000013373783416305701000000000014000000000000000000000000000000000000000000000000000000000000040121000000129711700000000000000000000000000   05092300000000000000000000000MUNDIALMIX COMERCIO DE ALIM...                                      CK000016
10216958379000187072400654321        T280220240101            00000001            099000000011             I06040923000831500100000325            04092300000013373783416305701000000000014000000000000000000000000000000000000000000000000000000000000040121000000129711700000000000000000000000000   05092300000000000000000000000MUNDIALMIX COMERCIO DE ALIM...                                      CK000016
10216958379000187072400654321        T280220240101            00000001            099000000011             I06040923000831500100000325            04092300000013373783416305701000000000014000000000000000000000000000000000000000000000000000000000000040121000000129711700000000000000000000000000   05092300000000000000000000000MUNDIALMIX COMERCIO DE ALIM...                                      CK000016
10216958379000187072400654321        T280220240101            00000001            099000000011             I06040923000831500100000325            04092300000013373783416305701000000000014000000000000000000000000000000000000000000000000000000000000040121000000129711700000000000000000000000000   05092300000000000000000000000MUNDIALMIX COMERCIO DE ALIM...                                      CK000016
9201341          000000000000000000000000000000          000000000000000000000000000000                                                  000000000000000000000000000000          0000016200000627282812  05/09S000500000003900000074576441                                                                                                                                                                000041`;

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
