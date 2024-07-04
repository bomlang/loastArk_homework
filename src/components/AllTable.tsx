import Paper from '@mui/material/Paper'
// import { jobShumbnail } from '../utils'
import TableRow from '@mui/material/TableRow'
// import { RadeCheckbox } from './RadeCheckbox'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import {
  Table,
  // TableBody,
  TableContainer,
  TableHead,
  styled
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getAllCharListData } from '../api/supabase/playerDataApi'
import { PartialPlayerData } from '../types'
import AllTableRow from './AllTableRow'

export default function AllTable() {
  const [allCharacterData, setAllChaacterrData] = useState<
    PartialPlayerData[] | null
  >()

  useEffect(() => {
    const dataFetching = async () => {
      try {
        const playerData = await getAllCharListData()
        // console.log(playerData)
        setAllChaacterrData(playerData)
      } catch (error) {
        console.error(
          'player테이블의 데이터를 가져오는데 오류가 발생하였습니다.',
          error
        )
      }
    }

    dataFetching()
  }, [])

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 1000 }}>
      <Table
        stickyHeader
        sx={{ minWidth: 700 }}
        aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>플레이어</StyledTableCell>
            <StyledTableCell>닉네임</StyledTableCell>
            <StyledTableCell>클래스</StyledTableCell>
            <StyledTableCell>Lv.</StyledTableCell>
            <StyledTableCell>발탄</StyledTableCell>
            <StyledTableCell>비아키스</StyledTableCell>
            <StyledTableCell>쿠크세이튼</StyledTableCell>
            <StyledTableCell>아브렐슈드</StyledTableCell>
            <StyledTableCell>카양겔</StyledTableCell>
            <StyledTableCell>일리아칸</StyledTableCell>
            <StyledTableCell>상아탑</StyledTableCell>
            <StyledTableCell>카멘</StyledTableCell>
            <StyledTableCell>에키드나</StyledTableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody> */}
        {allCharacterData?.map((player, index) => (
          <AllTableRow
            player={player}
            key={index}
          />
        ))}
        {/* </TableBody> */}
      </Table>
    </TableContainer>
  )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center'
  }
}))

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover
//   },
//   '&:last-child td, &:last-child th': {
//     border: 0
//   },
//   '& .MuiCheckbox-root': {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// }))

// const StyledFigure = styled('figure')({
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '8px',
//   justifyContent: 'center',
//   alignItems: 'center',
//   fontSize: '14px',
//   fontWeight: '700'
// })
