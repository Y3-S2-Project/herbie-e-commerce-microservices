import * as React from 'react'
import FormControl, { useFormControl } from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function Commission() {
  const customInputStyles = 'tw-rounded-2xl tw-p-5 tw-focus:outline-none tw-h-12 tw-w-80 tw-mt-1'
  const { focused } = useFormControl() || {}

  const helperText = React.useMemo(() => {
    if (focused) {
      return 'Enter the commission rate from 1 - 100.'
    }

    return 'Please enter a valid commission rate.'
  }, [focused])

  return <FormHelperText>{helperText}</FormHelperText>
}

export default function UseFormControl() {
  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#6d6b69',
            margin: '20px',
          }}
        >
          Commission
        </Typography>
        <FormControl sx={{ width: '25ch' }}>
          <OutlinedInput placeholder="10" />
        </FormControl>
        <Button
          variant="outlined"
          sx={{
            margin: '20px',
          }}
        >
          Save Commission Rate
        </Button>
      </Box>
    </>
  )
}
