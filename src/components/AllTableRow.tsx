import { jobShumbnail } from '../utils'
import { useEffect, useState } from 'react'
import TableRow from '@mui/material/TableRow'
import { RadeCheckbox } from './RadeCheckbox'
import TableCell from '@mui/material/TableCell'
import { loadCheckRade } from '../api/supabase'
import { Characters, PartialPlayerData } from '../types'
import { getLoastArkCharData } from '../api/loastArkAPI/getCharDataAPI'
import { Box, TableBody, Typography, styled } from '@mui/material'

interface AllTableRowProps {
  player: PartialPlayerData
}

export default function AllTableRow({ player }: AllTableRowProps) {
  const { username, charList } = player

  const [characterData, setCharacterData] = useState<Characters[] | null>(null)

  useEffect(() => {
    const loastArkCharacterDataFetch = async () => {
      try {
        const characterDataPromises = charList.map(async characterName => {
          const charData = await getLoastArkCharData(characterName)
          const bossData = await loadCheckRade(characterName)
          return { ...charData, bossData } as Characters
        })

        const charDatas = await Promise.all(characterDataPromises)
        setCharacterData(charDatas)
      } catch (error) {
        console.error(
          '플레이어의 캐릭터정보를 가져오는 중 문제가 발생하였습니다.',
          error
        )
      }
    }

    loastArkCharacterDataFetch()
  }, [charList])

  return (
    <TableBody>
      {characterData?.map(character => (
        <StyledTableRow>
          <TableCell>
            <Box sx={{ p: 1, textAlign: 'center' }}>
              <Typography variant="h6">{username}</Typography>
            </Box>
          </TableCell>
          <TableCell align="center">
            <span>{character.CharacterName}</span>
          </TableCell>
          <TableCell>
            <StyledFigure>
              <img
                src={`https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/${jobShumbnail(
                  character.CharacterClassName
                )}.png`}
                alt={`${jobShumbnail(character.CharacterClassName)}.png`}
              />
              <figcaption>{character.CharacterClassName}</figcaption>
            </StyledFigure>
          </TableCell>
          <TableCell>
            <span>{character.ItemMaxLevel}</span>
          </TableCell>
          <RadeCheckbox
            bossName="Valtan"
            isChecked={character.bossData.Valtan}
            characterName={character.CharacterName}
            disabled={true}
          />
          <RadeCheckbox
            bossName={'Biackiss'}
            isChecked={character.bossData.Biackiss}
            characterName={character.CharacterName}
            disabled={true}
          />
          <RadeCheckbox
            bossName={'Kouku_Saton'}
            isChecked={character.bossData.Kouku_Saton}
            characterName={character.CharacterName}
            disabled={true}
          />
          <RadeCheckbox
            bossName={'Abrelshud'}
            isChecked={character.bossData.Abrelshud}
            characterName={character.CharacterName}
            disabled={true}
          />
          <RadeCheckbox
            bossName={'Kayangel'}
            isChecked={character.bossData.Kayangel}
            characterName={character.CharacterName}
            disabled={true}
          />
          <RadeCheckbox
            bossName={'Illiakan'}
            isChecked={character.bossData.Illiakan}
            characterName={character.CharacterName}
            disabled={true}
          />
          <RadeCheckbox
            bossName={'Ivory_Tower'}
            isChecked={character.bossData.Ivory_Tower}
            characterName={character.CharacterName}
            disabled={true}
          />
          <RadeCheckbox
            bossName={'Kamen'}
            isChecked={character.bossData.Kamen}
            characterName={character.CharacterName}
            disabled={true}
          />
          <RadeCheckbox
            bossName={'Echidna'}
            isChecked={character.bossData.Echidna}
            characterName={character.CharacterName}
            disabled={true}
          />
        </StyledTableRow>
      ))}
    </TableBody>
  )
}

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
