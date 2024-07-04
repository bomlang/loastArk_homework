import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export default function Loading() {
  return (
    <StyledBox>
      <StyledImg
        src="/loadingImage.gif"
        alt="감사 모코코 gif"
      />
      <LoadingText variant="h1">로딩중...</LoadingText>
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

const blinkAnimation = `@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}`

const LoadingText = styled(Typography)`
  animation: blink 1s infinite;
  ${blinkAnimation}
`
