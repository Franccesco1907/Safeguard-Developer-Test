import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NotesService } from '../../notes.service';
import { INote } from '../../../../shared/interfaces/note.interface';


@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent {
  @Input() note!: INote;

  constructor(private readonly notesService: NotesService) {}

  onEdit() {
    this.notesService.openModal(this.note);
  }

  onDelete(event: Event) {
    event.stopPropagation();
    this.notesService.deleteNote(this.note);
  }
}
