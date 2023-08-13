import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../firebase/config'
import { Note } from '../store/interfaces'

export const loadNotes = async (uid: string) => {
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)

  const docs = await getDocs(collectionRef)

  const notes: Note[] = []

  docs.forEach((doc) => {
    const { body, date, title, imageUrls } = doc.data()

    notes.push({ id: doc.id, body, date, title, imageUrls })
  })

  return notes
}
