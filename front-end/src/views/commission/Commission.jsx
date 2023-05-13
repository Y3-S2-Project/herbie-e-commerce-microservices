import * as React from 'react'
import FormControl, { useFormControl } from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { addCommission, getCommission } from '../../services/commissionService'
import { Form } from 'react-bootstrap'

export default function UseFormControl() {
  const [commission, setCommission] = React.useState('')
  React.useEffect(() => {
    getCommission()
      .then((res) => {
        setCommission(res.data.commission_percentage)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleCommissionChange = (event) => {
    setCommission(event.target.value)
  }

  const handleCommissionSubmit = (event) => {
    event.preventDefault()
    addCommission(commission)
      .then((res) => {
        console.log('commission in handle submit', commission)
        setCommission(res.data.commission)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Form>
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
            <OutlinedInput placeholder="10" value={commission} onChange={handleCommissionChange} />
          </FormControl>
          <Button
            type="submit"
            onClick={handleCommissionSubmit}
            variant="outlined"
            sx={{
              margin: '20px',
            }}
          >
            Save Commission Rate
          </Button>
        </Form>
      </Box>
    </>
  )
}
