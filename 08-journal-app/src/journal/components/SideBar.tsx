import { Box, Drawer, Toolbar, Typography, Divider, List } from '@mui/material'
import { useAppSelector } from '../../store'
import { SideBarItem } from './SideBarItem'

interface Props {
  drawerWidth: number
}

export const SideBar = ({ drawerWidth }: Props) => {
  const { displayName } = useAppSelector((state) => state.auth)
  const { notes } = useAppSelector((state) => state.journal)

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs: 'block',
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem note={note} key={note.id} />
          ))}
        </List>
      </Drawer>
    </Box>
  )
}
