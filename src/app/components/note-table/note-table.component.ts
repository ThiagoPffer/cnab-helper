import { Component, Input, OnInit } from '@angular/core';
import { NoteTable } from '../../models/segment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'note-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-table.component.html',
  styleUrl: './note-table.component.css'
})
export class NoteTableComponent implements OnInit{

  @Input()
  tableData!: NoteTable | undefined;

  ngOnInit(): void {
    
  }

}
