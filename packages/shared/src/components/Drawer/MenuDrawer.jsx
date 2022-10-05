import React, { useContext, useEffect, useState } from 'react';
import { Context } from '@siiges-ui/shared';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import Link from 'next/link';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  marginTop: '67px',
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  marginTop: '67px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

function userRol(session, setUsers) {
  if (session.rol === 'representante') {
    setUsers([
      {
        text: 'Mis usuarios',
        icon: <GroupIcon />,
        route: '/usuarios',
        key: 'users',
      },
      {
        text: 'Mi institucion',
        icon: <BusinessIcon />,
        route: '/institucion',
        key: 'intitutions',
      },
      {
        text: 'Mis solicitudes',
        icon: <DescriptionIcon />,
        route: '/solicitudes',
        key: 'solicitudes',
      },
    ]);
  }

  if (session.rol === 'admin') {
    setUsers([
      {
        text: 'Mis usuarios',
        icon: <GroupIcon />,
        route: '/usuarios',
        key: 'users',
      },
      {
        text: 'Mi institucion',
        icon: <BusinessIcon />,
        route: '/institucion',
        key: 'intitutions',
      },
      {
        text: 'Mis solicitudes',
        icon: <DescriptionIcon />,
        route: '/solicitudes',
        key: 'solicitudes',
      },
    ]);
  }
}

export default function MenuDrawer() {
  const { session } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userRol(session, setUsers);
  }, [session]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <List onMouseOver={handleDrawerOpen} onMouseLeave={handleDrawerClose}>
          {users.map((item) => (
            <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
              <Link href={item.route}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
