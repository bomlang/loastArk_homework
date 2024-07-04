import { useState } from 'react'
import styled from '@emotion/styled'
import { Link as RouterLink } from 'react-router-dom'
import {
  Link as MuiLink,
  Button,
  AppBar,
  Toolbar,
  Typography
} from '@mui/material'

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    sessionStorage.removeItem('userToken')
    setIsLoggedIn(false)
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledMuiLink href="/">
          <StyledImg
            src="/mainImage.png"
            alt="꺄꺄룽 모코코"
            loading="lazy"
          />
          <Typography sx={{ fontSize: 28, fontWeight: 600 }}>
            로스트아크 숙제체크
          </Typography>
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
  fontSize: '24px',
  flexGrow: '1',
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
})

const StyledImg = styled.img`
  width: 45px;
  height: 45px;
`
