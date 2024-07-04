import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link as MuiLink, Button, AppBar, Toolbar, styled } from '@mui/material'

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#fff',
  color: 'black',
  borderRadius: '12px',
  marginBottom: '30px'
})

const StyledMuiLink = styled(MuiLink)({
  textDecoration: 'none',
  color: 'black',
  fontWeight: '700',
  fontSize: '24px'
})

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    sessionStorage.removeItem('userToken')
    setIsLoggedIn(false)
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledMuiLink
          href="/"
          sx={{ flexGrow: 1 }}>
          로악귀들의 숙제체크
        </StyledMuiLink>
        {isLoggedIn ? (
          <Button
            variant="text"
            color="inherit"
            component={RouterLink}
            to="/login">
            로그인
          </Button>
        ) : (
          <Button
            variant="text"
            color="inherit"
            component={RouterLink}
            to="/login"
            onClick={handleLogout}>
            로그아웃
          </Button>
        )}
        <Button
          variant="text"
          color="inherit"
          component={RouterLink}
          to="/signup">
          회원가입
        </Button>
      </Toolbar>
    </StyledAppBar>
  )
}
