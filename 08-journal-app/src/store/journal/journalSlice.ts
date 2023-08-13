import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Note } from '../interfaces/'

export interface JournalState {
  isSaving: boolean
  messageSaved: string
  notes: Note[]
  active: Note | null
}

const initialState: JournalState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true
      state.messageSaved = ''
    },
    noteUpdated: (state, action: PayloadAction<Note>) => {
      state.isSaving = false
      state.notes = state.notes.map((note) => {
        return note.id === action.payload.id ? action.payload : note
      })
      state.messageSaved = `${action.payload.title}, actualizada correctamente`
      state.active = action.payload
    },
    setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {
      state.active!.imageUrls = [
        ...(state.active!.imageUrls || []),
        ...action.payload,
      ]
      state.isSaving = false
    },
    clearNotesLogout: (state) => {
      state.isSaving = false
      state.messageSaved = ''
      state.notes = []
      state.active = null
    },
    deleteNoteById: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((n) => {
        return n.id !== action.payload
      })
      state.active = null
      state.isSaving = false
    },
  },
})

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  noteUpdated,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
} = journalSlice.actions
