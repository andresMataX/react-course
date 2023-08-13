import { useMemo } from 'react'
import { TurnedInNot } from '@mui/icons-material'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Grid,
  ListItemText,
} from '@mui/material'
import { Note } from '../../store/interfaces'
import { useAppDispatch } from '../../store'
import { setActiveNote } from '../../store/journal'

interface Props {
  note: Note
}

export const SideBarItem = ({
  note: { body, title, id, date, imageUrls: imageUlrs = [] },
}: Props) => {
  const dispatch = useAppDispatch()

  const onSetActive = () => {
    dispatch(setActiveNote({ body, date, title, id, imageUrls: imageUlrs }))
  }

  const newTitle = useMemo(() => {
    return title.length > 12 ? title.substring(0, 12) + '...' : title
  }, [title])

  return (
    <ListItem key={id} disablePadding>
      <ListItemButton onClick={onSetActive}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
