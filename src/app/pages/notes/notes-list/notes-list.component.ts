import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteItemComponent } from './note-item/note-item.component';
import { INote } from '../../../shared/interfaces/note.interface';
import { NotesService } from '../notes.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NgForOf, NoteItemComponent],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {
  @Input() filteredNotes!: INote[];
  @Output() editNote = new EventEmitter<INote>();
  @Output() deleteNote = new EventEmitter<INote>();

  constructor(private readonly notesService: NotesService) { 
  }

  ngOnInit() {
    this.notesService.notes$.subscribe(notes => {
      this.filteredNotes = notes;
    });
  }

  onEditNote(note: INote) {
    this.editNote.emit(note);
  }

  onDeleteNote(note: INote) {
    this.deleteNote.emit(note);
  }
}
