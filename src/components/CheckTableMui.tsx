import axios from 'axios'
import { Characters } from '../types'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import { jobShumbnail } from '../utils'
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import { RadeCheckbox } from './RadeCheckbox'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import { getUser, loadCheckRade } from '../api/supabase'
import TableContainer from '@mui/material/TableContainer'
import { getPlayerData, getPlayerUsername } from '../api/supabase/playerDataApi'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { useAuthStore } from '../zustand/authStore'

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  },
  '& .MuiCheckbox-root': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const StyledFigure = styled('figure')({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '14px',
  fontWeight: '700'
})

interface checkTableProps {
  charList: string[]
}

export function CheckTableMui({ charList }: checkTableProps) {
  const URL = 'https://developer-lostark.game.onstove.com'
  const headers = {
    accept: 'application/json',
    authorization: `bearer ${import.meta.env.VITE_PUBLIC_LOASTARK_API_KEY}`
  }

  const [mergeCharData, setMergeCheckData] = useState<Characters[] | null>(null)
  const { userToken: token } = useAuthStore()

  useEffect(() => {
    const supabaseFetch = async () => {
      try {
        const userData = await getUser(token as string)
        console.log(userData)
        console.log(token)

        const username = await getPlayerUsername(userData?.user.email as string)
        // console.log(username)

        const playerData = await getPlayerData(username as string)

        // 이 부분에서 어떤플레이어인지 로그인정보를 확인한다.
        if (playerData) {
          const characterDataPromises = playerData.charList.map(
            async charName => {
              const response = await axios.get(
                `${URL}/armories/characters/${encodeURI(charName)}/profiles`,
                { headers }
              )

              const bossData = await loadCheckRade(charName)
              return {
                ...response.data,
                bossData
              }
            }
          )

          const charactersData = await Promise.all(characterDataPromises)

          setMergeCheckData(charactersData)
        }
      } catch (error) {
        console.error(
          '플레이어의 데이터를 가져오는 중 예상치 못한 오류가 발생하였습니다.',
          error
        )
      }
    }
    supabaseFetch()
  }, [charList])

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700 }}
        aria-label="customized table">
        <TableHead>
          <TableRow>
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
        <TableBody>
          {mergeCharData &&
            mergeCharData?.map(char => (
              <StyledTableRow key={char.CharacterLevel}>
                <TableCell align="right">
                  <span>{char.CharacterName}</span>
                </TableCell>
                <TableCell>
                  <StyledFigure>
                    <img
                      src={`https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/${jobShumbnail(
                        char.CharacterClassName
                      )}.png`}
                      alt={`${jobShumbnail(char.CharacterClassName)}.png`}
                    />
                    <figcaption>{char.CharacterClassName}</figcaption>
                  </StyledFigure>
                </TableCell>
                <TableCell>
                  <span>{char.ItemMaxLevel}</span>
                </TableCell>
                <RadeCheckbox
                  bossName="Valtan"
                  isChecked={char.bossData[0].Valtan}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Biackiss'}
                  isChecked={char.bossData[0].Biackiss}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Kouku_Saton'}
                  isChecked={char.bossData[0].Kouku_Saton}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Abrelshud'}
                  isChecked={char.bossData[0].Abrelshud}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Kayangel'}
                  isChecked={char.bossData[0].Kayangel}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Illiakan'}
                  isChecked={char.bossData[0].Illiakan}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Ivory_Tower'}
                  isChecked={char.bossData[0].Ivory_Tower}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Kamen'}
                  isChecked={char.bossData[0].Kamen}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Echidna'}
                  isChecked={char.bossData[0].Echidna}
                  characterName={char.CharacterName}
                />
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
