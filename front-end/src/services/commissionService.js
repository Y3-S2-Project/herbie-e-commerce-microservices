

export const addCommission = async (commission) => {
  return (await axios.post('/commission/', commission)).data
}

export const getCommission = async () => {
  return (await axios.get('/commission/')).data
}

export const updateCommission = async (user_id, commission) => {
  return (await axios.patch(`/commission/${user_id}`, commission)).data
}
