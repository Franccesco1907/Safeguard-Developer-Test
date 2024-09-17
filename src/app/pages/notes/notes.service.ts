import { Injectable } from '@angular/core';
import { INote } from '../../shared/interfaces/note.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NotesService {
  private notesDataStorageKey = 'notesDataStorageKey';
  private notes: INote[] = [];
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  private notesSubject = new BehaviorSubject<INote[]>(this.notes);
  private noteSubject = new BehaviorSubject<INote | null>(null);

  isOpen$ = this.isOpenSubject.asObservable();
  notes$ = this.notesSubject.asObservable();
  note$ = this.noteSubject.asObservable();

  constructor() {
    this.loadNotes();
  }

  private loadNotes() {
    const storedNotes = localStorage.getItem(this.notesDataStorageKey);
    if (storedNotes) {
      this.notes = JSON.parse(storedNotes);
    }
    this.notesSubject.next(this.notes);
  }

  private saveNotes() {
    localStorage.setItem(this.notesDataStorageKey, JSON.stringify(this.notes));
  }

  private getSize(note: INote) {
    const noteLength = note.body.length;

    if (noteLength < 20) {
      return 'small';
    } else if (noteLength < 50) {
      return 'medium';
    } else {
      return 'large';
    }
  }

  addNote(note: INote) {
    const id = this.smallestMissingInt(this.notes.map(note => note.id));
    const size = this.getSize(note);
    this.notes.push({ ...note, id, size });
    this.notesSubject.next(this.notes);
    this.saveNotes();
  }

  editNote(editedNote: INote) {
    const index = this.notes.findIndex(note => note.id === editedNote.id);

    const size = this.getSize(editedNote);

    if (index > -1) {
      this.notes[index] = { ...editedNote, size };
    }
    this.saveNotes();
  }

  deleteNote(noteToDelete: INote) {
    this.notes = this.notes.filter(note => note.id !== noteToDelete.id);
    this.notesSubject.next(this.notes);
    this.saveNotes();
  }

  searchNotes(query: string): INote[] {
    return this.notes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.body.toLowerCase().includes(query.toLowerCase())
    );
  }

  openModal(note: INote | null) {
    this.isOpenSubject.next(true);
    this.noteSubject.next(note);
  }

  closeModal() {
    this.isOpenSubject.next(false);
    this.noteSubject.next(null);
  }

  clearNoteToEdit() {
    this.noteSubject.next(null);
  }

  getNotes(): INote[] {
    return [...this.notes];
  }

  private smallestMissingInt(A: number[]): number {
    // We create a set of positive numbers from the array
    const positiveSet = new Set<number>(A.filter(num => num > 0));
    let smallPositiveMissingInt = 1;

    // We iterate through the positive numbers in the set
    while (positiveSet.has(smallPositiveMissingInt)) {
      smallPositiveMissingInt++;
    }

    return smallPositiveMissingInt;
  }
}
