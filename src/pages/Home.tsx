import { Header, Footer } from '../layout'
import { Box, Button } from '@mui/material'
import { CheckTableMui } from '../components'
import { styled } from '@mui/material/styles'

// import { cyan } from "@mui/material/colors";

export default function Home() {
  const StyledBox = styled(Box)(() => ({
    display: 'flex',
    gap: 4,
    marginBottom: '20px'
    // backgroundColor: cyan[500],
  }))

  return (
    <>
      <Header />
      <main>
        <section>
          <StyledBox>
            <Button variant="contained">나의 숙제</Button>
            <Button variant="contained">친구들의 숙제</Button>
          </StyledBox>

          <CheckTableMui />
        </section>
      </main>
      <Footer />
    </>
  )
}
