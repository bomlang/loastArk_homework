import Modal from '@mui/material/Modal'
import { Header, Footer } from '../layout'
import { CheckTableMui } from '../components'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../zustand/authStore'
import { useEffect, useRef, useState } from 'react'
import { getUser, insertRadeRowData } from '../api/supabase'
import { Box, Button, TextField, Typography } from '@mui/material'
import { getLoastArkCharData } from '../api/loastArkAPI/getCharDataAPI'
import {
  addCharFromPlaterData,
  getPlayerUsername
} from '../api/supabase/playerDataApi'
import AllTable from '../components/AllTable'

export default function Home() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { userToken: token } = useAuthStore()

  const [open, setOpen] = useState(false)
  const [toggleTable, setToggleTable] = useState(false)
  const [charList, setCharList] = useState<string[]>([])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleCharacterRegistration = async () => {
    if (inputRef.current) {
      const value = inputRef.current.value

      const res = await getLoastArkCharData(value)
      if (res) {
        const userData = await getUser(token as string)
        const username = await getPlayerUsername(userData?.email as string)
        const registerChar = await addCharFromPlaterData(value, username)
        if (registerChar) {
          await insertRadeRowData(value)
          setCharList(prevCharList => [...prevCharList, value])
          handleClose()
        }
      }
    }
  }

  useEffect(() => {
    const verifyLoginStatus = () => {
      if (!token) {
        navigate('/login')
      }
    }

    verifyLoginStatus()
  }, [token, navigate])

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
            <StyledButton
              variant="contained"
              onClick={() => setToggleTable(false)}>
              나의 숙제
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => setToggleTable(true)}>
              친구들의 숙제
            </StyledButton>
          </StyledBox>

          {toggleTable ? <AllTable /> : <CheckTableMui charList={charList} />}
        </section>
      </main>
      <Footer />
    </>
  )
}

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
