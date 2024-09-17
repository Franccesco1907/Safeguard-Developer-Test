import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { INote } from '../../../shared/interfaces/note.interface';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss'
})
export class NoteFormComponent {
  isModalOpen = false;
  newNote: INote = { id: 1, title: '', body: '', size: 'medium' };
  isEditMode = false;

  constructor(private readonly notesService: NotesService) {}

  ngOnInit() {
    this.notesService.isOpen$.subscribe(isOpen => this.isModalOpen = isOpen);
    this.notesService.note$.subscribe(note => {
      if (note) {
        this.isEditMode = true;
        this.newNote = { ...note };
      } else {
        this.isEditMode = false;
      }
    });
  }

  onSave() {
    if (!this.newNote.title.trim() || !this.newNote.body.trim()) {
      return;
    }
    if (this.isEditMode) {
      this.notesService.editNote(this.newNote);
    } else {
      this.notesService.addNote(this.newNote);
    }
    this.notesService.closeModal();
    this.resetNewNote();
  }

  resetNewNote() {
    this.newNote = { id: 1, title: '', body: '', size: 'medium' };
    this.notesService.clearNoteToEdit();
  }

  onClose() {
    this.notesService.closeModal();
    this.resetNewNote();
  }
}
