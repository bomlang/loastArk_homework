import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export default function NotFound() {
  return (
    <StyledBox>
      <StyledImg
        src="/errorImage.png"
        alt="슬픈 모코코"
      />

      <Typography variant="h1">NOT FOUND</Typography>
      <Typography variant="h4">해당 페이지를 찾을 수 없습니다.</Typography>
    </StyledBox>
  )
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

const StyledImg = styled.img`
  width: 400px;
  height: 400px;
`
