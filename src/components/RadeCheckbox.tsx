import { useState } from 'react'
import { updateCheckRade } from '../api/supabase'
import { Checkbox, TableCell } from '@mui/material'

interface RadeCheckboxProps {
  bossName: string
  isChecked: boolean
  characterName: string
  disabled?: boolean
}

export function RadeCheckbox({
  bossName,
  isChecked,
  characterName,
  disabled
}: RadeCheckboxProps) {
  const [isRadeCheck, setIsRadeCheck] = useState(isChecked)

  const handleClickChecked = async () => {
    try {
      const res = await updateCheckRade(isRadeCheck, characterName, bossName)

      if (res) {
        setIsRadeCheck(prevState => !prevState)
      }
    } catch (error) {
      console.error(
        '레이드의 체크상태를 변경하는데 문제가 발생하였습니다.',
        error
      )
    }
  }

  return (
    <TableCell>
      <Checkbox
        checked={isRadeCheck}
        onChange={handleClickChecked}
        disabled={disabled}
      />
    </TableCell>
  )
}
