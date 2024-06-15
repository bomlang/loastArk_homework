import Modal from '@mui/material/Modal'
import { useEffect, useRef, useState } from 'react'
import { Header, Footer } from '../layout'
import { Box, Button, TextField, Typography } from '@mui/material'
import { CheckTableMui } from '../components'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../zustand/authStore'

const StyledBox = styled(Box)({
  display: 'flex',
  gap: 4,
  marginBottom: '20px'
})

const StyledButton = styled(Button)({
  backgroundColor: 'black',
  '&:hover': {
    backgroundColor: '#F9F7E8',
    color: '#222'
  }
})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export default function Home() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const userToken = useAuthStore(state => state.userToken)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleCharacterRegistration = () => {
    if (inputRef.current) {
      const value = inputRef.current.value
      console.log(value)
    }
  }

  useEffect(() => {
    const verifyLoginStatus = () => {
      if (!userToken) {
        navigate('/login')
      }
    }

    verifyLoginStatus()
  }, [])

  return (
    <>
      <Header />
      <main>
        <section>
          <StyledBox>
            <Button
              variant="contained"
              onClick={handleOpen}>
              캐릭터 등록
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2">
                  캐릭터의 닉네임을 입력하세요
                </Typography>
                <TextField
                  type="text"
                  label="닉네임"
                  variant="standard"
                  inputRef={inputRef}
                  sx={{ width: '330px', marginBottom: '20px' }}
                />
                <Button
                  variant="contained"
                  onClick={handleCharacterRegistration}>
                  등록하기
                </Button>
              </Box>
            </Modal>
            <StyledButton variant="contained">나의 숙제</StyledButton>
            <StyledButton variant="contained">친구들의 숙제</StyledButton>
          </StyledBox>

          <CheckTableMui />
        </section>
      </main>
      <Footer />
    </>
  )
}
