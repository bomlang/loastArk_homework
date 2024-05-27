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
import { loadCheckRade } from '../api/supabase'
import TableContainer from '@mui/material/TableContainer'
import { getPlayerData } from '../api/supabase/playerDataApi'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

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

export function CheckTableMui() {
  const URL = 'https://developer-lostark.game.onstove.com'
  const headers = {
    accept: 'application/json',
    authorization: `bearer ${import.meta.env.VITE_PUBLIC_LOASTARK_API_KEY}`
  }

  const [mergeCharData, setMergeCheckData] = useState<Characters[] | null>(null)

  useEffect(() => {
    const supabaseFetch = async () => {
      try {
        const playerData = await getPlayerData()
        if (playerData) {
          const charDataPromises = playerData.map(async player => {
            const nicknames = player.charList.split(',')
            const characterDataPromises = nicknames.map(async nickname => {
              const response = await axios.get(
                `${URL}/armories/characters/${encodeURI(
                  nickname.trim()
                )}/profiles`,
                { headers }
              )
              return response.data
            })
            const characterData = await Promise.all(characterDataPromises)
            return { characterData }
          })
          const charDataResults = await Promise.all(charDataPromises)

          const charNames = charDataResults[0].characterData.map(
            name => name.CharacterName
          )

          const checkBossDataPromises = charNames.map(async nickname => {
            const bossData = await loadCheckRade(nickname.trim())
            return bossData
          })

          const checkBossData = await Promise.all(checkBossDataPromises)

          const mergedData = charDataResults[0].characterData.map(char => {
            const bossData = checkBossData
              .flat()
              .find(boss => boss.userCharName === char.CharacterName)
            return { ...char, bossData }
          })

          setMergeCheckData(mergedData)
        }
      } catch (error) {
        console.error(
          '플레이어의 데이터를 가져오는 중 예상치 못한 오류가 발생하였습니다.',
          error
        )
      }
    }
    supabaseFetch()
  }, [])

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
          {mergeCharData?.map(char => (
            <StyledTableRow key={char.CharacterLevel}>
              <TableCell align="right">
                <span>{char.CharacterName}</span>
              </TableCell>
              <TableCell>
                <figure>
                  <img
                    src={`https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/${jobShumbnail(
                      char.CharacterClassName
                    )}.png`}
                    alt={`${jobShumbnail(char.CharacterClassName)}.png`}
                  />
                  <figcaption>{char.CharacterClassName}</figcaption>
                </figure>
              </TableCell>
              <TableCell>
                <span>{char.ItemMaxLevel}</span>
              </TableCell>
              <RadeCheckbox
                isChecked={char.bossData.Valtan}
                characterName={char.CharacterName}
              />
              <RadeCheckbox
                isChecked={char.bossData.Biackiss}
                characterName={char.CharacterName}
              />
              <RadeCheckbox
                isChecked={char.bossData.Kouku_Saton}
                characterName={char.CharacterName}
              />
              <RadeCheckbox
                isChecked={char.bossData.Abrelshud}
                characterName={char.CharacterName}
              />
              <RadeCheckbox
                isChecked={char.bossData.Kayangel}
                characterName={char.CharacterName}
              />
              <RadeCheckbox
                isChecked={char.bossData.Illiakan}
                characterName={char.CharacterName}
              />
              <RadeCheckbox
                isChecked={char.bossData.Ivory_Tower}
                characterName={char.CharacterName}
              />
              <RadeCheckbox
                isChecked={char.bossData.Kamen}
                characterName={char.CharacterName}
              />
              <RadeCheckbox
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
