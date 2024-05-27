import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Button, InputLabel } from '@mui/material'
import { Box, Link, TextField } from '@mui/material'
import { FormGroup, Typography } from '@mui/material'
import { signinUser } from '../api/supabase'

const StyleMain = styled.main`
  border: 6px solid slateblue;
  margin: 5% auto 50px;
  padding: 40px;
  width: auto;
  height: 410px;
  max-width: 800px;
`

const StyleBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2px;
  margin-bottom: 30px;
`
const StyledTypography = styled(Typography)`
  width: 200px;
`

const StyledForm = styled.form`
  max-width: 350px;
`

const StyledFormGroup = styled(FormGroup)`
  max-width: 350px;
  margin: 20px 0;
`

export default function Login() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleLoginSubmit = async () => {
    const { email, password } = formState
    try {
      const res = await signinUser(email, password)

      console.log(res)
    } catch (error) {
      console.error('로그인에러 :,', error)
    }
  }

  useEffect(() => {
    const { email, password } = formState
    setIsButtonDisabled(!(email && password))
  }, [formState])

  return (
    <StyleMain>
      <StyleBox component="article">
        <StyledTypography>
          <h1>로악귀모임 가입하기</h1>
        </StyledTypography>

        <StyledForm
          action="POST"
          onSubmit={handleLoginSubmit}>
          <StyledFormGroup>
            <InputLabel htmlFor="email">이메일</InputLabel>
            <TextField
              type="email"
              name="email"
              id="standard-basic"
              label="email"
              variant="standard"
              onChange={handleInputChange}
              sx={{ width: '350px' }}
            />
          </StyledFormGroup>
          <StyledFormGroup>
            <InputLabel htmlFor="password">패스워드</InputLabel>
            <TextField
              type="password"
              name="password"
              id="standard-basic"
              label="password"
              variant="standard"
              onInput={handleInputChange}
              sx={{ width: '350px' }}
            />
          </StyledFormGroup>
          <Button
            type="submit"
            variant="contained"
            disabled={isButtonDisabled}
            sx={{ width: '350px' }}>
            로그인
          </Button>
        </StyledForm>
      </StyleBox>
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p className="">로악귀모임에 동참하기</p>
          <Link href="/">가입하기</Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p className="">비밀번호 까먹는 대머리 없지~?</p>
          <Link href="/">비밀번호 찾기</Link>
        </Box>
      </div>
    </StyleMain>
  )
}
