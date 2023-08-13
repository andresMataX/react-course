import { useEffect, useMemo, ChangeEvent, useRef } from 'react'
import { Grid, Button, TextField, IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import SaveOutlined from '@mui/icons-material/SaveOutlined'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ImageGallery } from '../components'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from '../../store/journal'
import { DeleteOutline, UploadOutlined } from '@mui/icons-material'
import moment from 'moment'

interface Props {}

interface FormData {
  title: string
  body: string
}

export const NoteView = ({}: Props) => {
  const dispatch = useAppDispatch()

  const {
    active: note,
    messageSaved,
    isSaving,
  } = useAppSelector((state) => state.journal)

  const { register, handleSubmit, reset, getValues } = useForm<FormData>()

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    reset({
      body: note!.body,
      title: note!.title,
    })
  }, [note])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  const dateString = useMemo(() => {
    const newDate = new Date(note!.date)

    return moment(newDate).format('LLL')
  }, [note!.date])

  const onSaveNote: SubmitHandler<FormData> = (data) => {
    dispatch(startSaveNote(data.body, data.title))
  }

  const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { body, title } = getValues()

    if (target.files?.length === 0) return

    dispatch(
      setActiveNote({
        id: note!.id,
        body,
        title,
        date: note!.date,
        imageUrls: note!.imageUrls,
      })
    )
    dispatch(startUploadingFiles(target.files!))
  }

  const onDeleteNote = () => {
    dispatch(startDeletingNote())
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>

      <Grid item>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={isSaving}
          color="primary"
          sx={{ padding: 2 }}
          onClick={handleSubmit(onSaveNote)}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          {...register('title')}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió hoy?"
          minRows={5}
          sx={{ border: 'none', mb: 1 }}
          {...register('body')}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button
          sx={{ mt: 2 }}
          color="error"
          onClick={onDeleteNote}
          disabled={isSaving}
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <ImageGallery images={note!.imageUrls || []} />
    </Grid>
  )
}
