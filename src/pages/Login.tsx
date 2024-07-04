import toast from 'react-hot-toast'
import styled from '@emotion/styled'
import { FormGroup } from '@mui/material'
import { useEffect, useState } from 'react'
import { signinUser } from '../api/supabase'
import { useNavigate } from 'react-router-dom'
import { Button, InputLabel } from '@mui/material'
import { Box, Link, TextField } from '@mui/material'

export default function Login() {
  const navigate = useNavigate()

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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { email, password } = formState

    try {
      const res = await signinUser(email, password)

      if (res && res.success) {
        toast.success('로그인 성공!')
        navigate('/')
      } else {
        toast.error('로그인 실패: ' + (res?.error || '알 수 없는 오류'))
      }
    } catch (error) {
      console.error('로그인에러 :', error)
      toast.error('로그인 중 오류 발생')
    }
  }

  useEffect(() => {
    const { email, password } = formState
    setIsButtonDisabled(!(email && password))
  }, [formState])

  return (
    <StyleMain>
      <StyleBox component="article">
        <h1>로악귀모임 접속</h1>

        <StyledForm
          method="POST"
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
          <Link href="/signup">가입하기</Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p className="">비밀번호 까먹는 대머리 없지~?</p>
          <Link href="/signup">비밀번호 찾기</Link>
        </Box>
      </div>
    </StyleMain>
  )
}

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

const StyledForm = styled.form`
  max-width: 350px;
`

const StyledFormGroup = styled(FormGroup)`
  max-width: 350px;
  margin: 20px 0;
`
