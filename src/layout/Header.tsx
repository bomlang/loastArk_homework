import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, styled } from '@mui/material'

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#fff',
  color: 'black',
  borderRadius: '12px',
  marginBottom: '30px'
})

const StyledTypography = styled(Typography)({
  flexGrow: 1
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
        <StyledTypography variant="h6">로악귀들의 숙제체크</StyledTypography>
        {isLoggedIn ? (
          <Button
            color="inherit"
            component={Link}
            to="/login">
            로그인
          </Button>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            onClick={handleLogout}>
            로그아웃
          </Button>
        )}
        <Button
          color="inherit"
          component={Link}
          to="/signup">
          회원가입
        </Button>
      </Toolbar>
    </StyledAppBar>
  )
}
