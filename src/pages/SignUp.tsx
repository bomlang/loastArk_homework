import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  InputLabel,
  Link,
  TextField,
  FormGroup
} from '@mui/material'
import { signUpSupabaseWithEmail } from '../api/supabase'
import { insertPlayer } from '../api/supabase/playerDataApi'

const StyleMain = styled.main`
  border: 6px solid slateblue;
  margin: 5% auto 50px;
  padding: 40px;
  width: auto;
  height: auto;
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

export default function SignUp() {
  const navigate = useNavigate()

  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { username, email, password, confirmPassword } = formState
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      const res = await signUpSupabaseWithEmail(email, password)

      if (res && res.success) {
        await insertPlayer(username, email)

        toast.success('Sign up successful!')
        console.log(res.data)
        navigate('/login')
      } else {
        toast.error('Sign up failed: ' + (res?.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Sign up error:', error)
      toast.error('Error during sign up')
    }
  }

  useEffect(() => {
    const { email, password, confirmPassword } = formState
    setIsButtonDisabled(!(email && password && confirmPassword))
  }, [formState])

  return (
    <StyleMain>
      <StyleBox component="article">
        <h1>회원가입</h1>

        <StyledForm
          method="POST"
          onSubmit={handleSignUpSubmit}>
          <StyledFormGroup>
            <InputLabel htmlFor="text">이름</InputLabel>
            <TextField
              type="text"
              name="username"
              id="username"
              label="Username"
              variant="standard"
              onChange={handleInputChange}
              sx={{ width: '350px' }}
            />
          </StyledFormGroup>
          <StyledFormGroup>
            <InputLabel htmlFor="email">이메일</InputLabel>
            <TextField
              type="email"
              name="email"
              id="email"
              label="Email"
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
              id="password"
              label="Password"
              variant="standard"
              onChange={handleInputChange}
              sx={{ width: '350px' }}
            />
          </StyledFormGroup>
          <StyledFormGroup>
            <InputLabel htmlFor="confirmPassword">비밀번호 확인</InputLabel>
            <TextField
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm Password"
              variant="standard"
              onChange={handleInputChange}
              sx={{ width: '350px' }}
            />
          </StyledFormGroup>
          <Button
            type="submit"
            variant="contained"
            disabled={isButtonDisabled}
            sx={{ width: '350px' }}>
            Sign Up
          </Button>
        </StyledForm>
      </StyleBox>
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p>이미 계정이 있나요?</p>
          <Link href="/login">Login</Link>
        </Box>
      </div>
    </StyleMain>
  )
}
