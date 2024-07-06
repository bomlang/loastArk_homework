import { Box, Container, Typography, styled } from '@mui/material'

const FooterContainer = styled(Box)({
  backgroundColor: '#f5f5f5',
  padding: '20px 0',
  marginTop: '30px',
  borderTop: '1px solid #e0e0e0',
  textAlign: 'center'
})

const FlexBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '10px'
})

const FooterText = styled(Typography)({
  color: '#616161'
})

export function Footer() {
  return (
    <FooterContainer component="footer">
      <Container>
        <FlexBox>
          <Box
            component="span"
            sx={{ marginRight: '10px' }}
          />
          <FooterText variant="body1">Hori#7338</FooterText>
        </FlexBox>
        <FooterText variant="body2">
          Copyright © 2024. h0ri all rights reserved
        </FooterText>
      </Container>
    </FooterContainer>
  )
}
