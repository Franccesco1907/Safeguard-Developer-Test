import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesService } from './notes.service';
import { INote } from '../../shared/interfaces/note.interface';
import { NgForOf } from '@angular/common';
import { NoteItemComponent } from './notes-list/note-item/note-item.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteFormComponent } from './note-form/note-form.component';

@Component({
    selector: 'app-notes',
    standalone: true,
    imports: [NgForOf, FormsModule, NoteItemComponent, NoteFormComponent, NotesListComponent],
    providers: [NotesService],
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
    isModalOpen = false;
    searchQuery = '';
    filteredNotes: INote[] = [];
    note: INote | null = null;

    constructor(private readonly notesService: NotesService) {
        this.filteredNotes = this.notesService.getNotes();
    }

    onSearch() {
        this.filteredNotes = this.notesService.searchNotes(this.searchQuery);
    }

    openModal() {
        this.isModalOpen = true;
        this.notesService.openModal(this.note);
    }
}
