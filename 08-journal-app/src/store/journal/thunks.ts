import { AppDispatch, RootState } from '../store'
import { Note } from '../interfaces'
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import {
  addNewEmptyNote,
  deleteNoteById,
  noteUpdated,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
} from './'
import { fileUpload, loadNotes } from '../../helpers'

export const startNewNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(savingNewNote())

    const { uid } = getState().auth

    const newNote: Note = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)

    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth

    if (!uid) throw new Error('el UID del usuario no existe')

    const notes = await loadNotes(uid)

    dispatch(setNotes(notes))
  }
}

export const startSaveNote = (body: string, title: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setSaving())

    const { uid } = getState().auth
    const { active } = getState().journal

    const noteToFireStore: Note = {
      id: active!.id,
      body,
      title,
      date: active!.date,
      imageUrls: active?.imageUrls || [],
    }

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteToFireStore.id}`)
    await setDoc(docRef, noteToFireStore, { merge: true })

    dispatch(noteUpdated(noteToFireStore))
  }
}

export const startUploadingFiles = (files: FileList) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSaving())

    // await fileUpload(files[0])
    const fileUploadPromises: Promise<string>[] = []

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const photosUrls = await Promise.all(fileUploadPromises)

    dispatch(setPhotosToActiveNote(photosUrls))
  }
}

export const startDeletingNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setSaving())

    const { uid } = getState().auth
    const { active: note } = getState().journal

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note!.id}`)

    await deleteDoc(docRef)

    dispatch(deleteNoteById(note!.id!))
  }
}
