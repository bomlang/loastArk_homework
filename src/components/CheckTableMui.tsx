import { Characters } from '../types'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import { jobShumbnail } from '../utils'
import { useEffect, useState } from 'react'
import emotionStyled from '@emotion/styled'
import TableRow from '@mui/material/TableRow'
import { RadeCheckbox } from './RadeCheckbox'
import { Button, styled } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import { useAuthStore } from '../zustand/authStore'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { getLoastArkCharData } from '../api/loastArkAPI/getCharDataAPI'
import { getUser, loadCheckRade, refreshAccessToken } from '../api/supabase'
import { getPlayerData, getPlayerUsername } from '../api/supabase/playerDataApi'

interface checkTableProps {
  charList: string[]
}

export function CheckTableMui({ charList }: checkTableProps) {
  const { userToken: token } = useAuthStore()
  const [mergeCharData, setMergeCheckData] = useState<Characters[] | null>(null)

  useEffect(() => {
    const supabaseFetch = async (accessToken: string) => {
      try {
        const userData = await getUser(accessToken)
        if (!userData) {
          console.error('사용자의 데이터가 존재하지 않습니다.')
          return
        }

        const username = await getPlayerUsername(userData.email as string)
        const playerData = await getPlayerData(username)

        if (playerData) {
          const characterDataPromises = await Promise.all(
            playerData.charList.map(async charName => {
              const charactorsData = await getLoastArkCharData(charName)
              const bossData = await loadCheckRade(charName)

              return { ...charactorsData, bossData }
            })
          )
          setMergeCheckData(characterDataPromises as Characters[])
        }
      } catch (error) {
        console.error('플레이어 데이터를 가져오는 중 오류 발생:', error)
      }
    }

    const refreshToken = sessionStorage.getItem('refreshToken')

    if (!token && refreshToken) {
      refreshAccessToken(refreshToken).then(newAccessToken => {
        if (newAccessToken) {
          supabaseFetch(newAccessToken)
        } else {
          console.error('토큰을 가져오는데 실패하였습니다.')
        }
      })
    } else if (token) {
      supabaseFetch(token)
    } else {
      console.error('No valid token available')
    }
  }, [charList, token])

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 900 }}>
      <Table
        stickyHeader
        sx={{ minWidth: 700 }}
        aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
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
            mergeCharData?.map((char, index) => (
              <StyledTableRow key={index}>
                <TableCell>
                  <Button>
                    <DeleteImg
                      src="https://static.thenounproject.com/png/16504-200.png"
                      alt="캐릭터 삭제"
                    />
                  </Button>
                </TableCell>
                <TableCell align="center">
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
                <TableCell sx={{ fontSize: 16, fontWeight: 500 }}>
                  <span>{char.ItemMaxLevel}</span>
                </TableCell>
                <RadeCheckbox
                  bossName={'Valtan'}
                  isChecked={char.bossData.Valtan}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Biackiss'}
                  isChecked={char.bossData.Biackiss}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Kouku_Saton'}
                  isChecked={char.bossData.Kouku_Saton}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Abrelshud'}
                  isChecked={char.bossData.Abrelshud}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Kayangel'}
                  isChecked={char.bossData.Kayangel}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Illiakan'}
                  isChecked={char.bossData.Illiakan}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Ivory_Tower'}
                  isChecked={char.bossData.Ivory_Tower}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Kamen'}
                  isChecked={char.bossData.Kamen}
                  characterName={char.CharacterName}
                />
                <RadeCheckbox
                  bossName={'Echidna'}
                  isChecked={char.bossData.Echidna}
                  characterName={char.CharacterName}
                />
              </StyledTableRow>
            ))}
        </TableBody>
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

const DeleteImg = emotionStyled.img`
  width: 24px;
  height: 24px;
`
