import * as React from 'react'

import { useAuth0 } from '@auth0/auth0-react'

import {
  Avatar,
  MenuItem,
  IconButton,
  Box,
  Stack,
  MenuList,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  Tooltip,
  Typography,
  ListItemIcon,
} from '@mui/material'

import { useGlobalContext } from '../context/context.js'

//icon
import Logout from '@mui/icons-material/Logout'
import NightlightIcon from '@mui/icons-material/Nightlight'
import LightModeIcon from '@mui/icons-material/LightMode'
import PaletteIcon from '@mui/icons-material/Palette'

export default function AccountMenu() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
  const isUser = isAuthenticated && user
  const { toggleDarkMode, isDarkMode, randomMainColor } = useGlobalContext()

  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      {isUser ? (
        <Stack direction='row' spacing={2}>
          <div>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <Typography sx={{ minWidth: 100, marginTop: '.5rem' }}>
                {isUser && user.name && (
                  <strong>{user.name.toUpperCase()}</strong>
                )}
              </Typography>

              <Tooltip title='Account'>
                <IconButton
                  ref={anchorRef}
                  id='composition-button'
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup='true'
                  onClick={handleToggle}
                  size='small'
                  sx={{ ml: 2 }}>
                  <Avatar sx={{ width: 50, height: 50 }}>
                    {isUser && user.picture && (
                      <img src={user.picture} alt={user.name} />
                    )}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Popper
              sx={{ zIndex: '10' }}
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement='bottom-start'
              transition
              disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}>
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id='composition-menu'
                        aria-labelledby='composition-button'
                        onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={randomMainColor}>
                          <ListItemIcon>
                            <PaletteIcon fontSize='small' />
                          </ListItemIcon>
                          Theme
                        </MenuItem>
                        <MenuItem onClick={toggleDarkMode}>
                          <ListItemIcon>
                            {!isDarkMode ? (
                              <NightlightIcon fontSize='small' />
                            ) : (
                              <LightModeIcon fontSize='small' />
                            )}
                          </ListItemIcon>
                          {!isDarkMode ? 'Dark' : 'Light'}
                        </MenuItem>
                        <MenuItem
                          sx={{ color: 'red' }}
                          onClick={() => {
                            logout({ returnTo: window.location.origin })
                          }}>
                          <ListItemIcon>
                            <Logout sx={{ color: 'red' }} fontSize='small' />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Stack>
      ) : (
        <button onClick={loginWithRedirect}>login </button>
      )}
    </>
  )
}
