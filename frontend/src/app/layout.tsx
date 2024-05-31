"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Margin } from '@mui/icons-material';
const pages = ['Books', 'Add a Book', 'Blog'];

function Home({children}: {children: React.ReactNode}) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleNavigate = (page: string) => {
    console.log(page)
  }


  return (
    <html>
      <body style={{margin: 0}}>
        <AppBar position="sticky">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
              READING IS FUN
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    key="Books"
                    href='/books/view'
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Search Books
                  </Button>
                  <Button
                    key="Books"
                    href='/books/add'
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Add a Book
                  </Button>
                  <Button
                    key="Books"
                    href='/books/delete'
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    DELETE A BOOK

                  </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        {children}
      </body>
    </html>
  );
}
export default Home;