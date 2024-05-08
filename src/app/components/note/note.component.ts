import { CommonModule } from '@angular/common';
import { NoteTableComponent } from '../note-table/note-table.component';
import { Note, NoteTable } from './../../models/segment';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'note',
  standalone: true,
  imports: [CommonModule, NoteTableComponent],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {

  @Input()
  noteData!: Note | undefined;

}
