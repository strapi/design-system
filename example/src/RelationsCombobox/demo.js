import { useState } from 'react'
import qs from 'qs'

const url = 'http://localhost:1338'
const headers = new Headers()
headers.append(
  'Authorization',
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMxNzk3Njg1LCJleHAiOjE2MzQzODk2ODV9.ry-n7gFcutInmG4yuBmYK1xzj-N47XQjUIwna4iB1qw'
)
headers.append('Content-Type', 'application/json')

export const fetchRelations = (endPoint, label, params) => async () => {
  const res = await fetch(url + endPoint + '?' + qs.stringify(params), {
    method: 'POST',
    headers,
  })
  const data = await res.json()

  const formattedData = data.map((obj) => {
    return { value: obj, label }
  })

  return formattedData
}

export const useContentManagerEditViewDataManager = ({ relationsData }) => {
  const [modifiedData, setModifiedData] = useState({
    addresses: [
      {
        id: 1204,
        postal_coderr: 'postal0',
      },
    ],
  })

  const addRelation = (value) => {
    const item = relationsData.find((obj) => obj.value.id === Number(value))
    setModifiedData((d) => ({
      ...d,
      addresses: [...d.addresses, item.value],
    }))
  }

  const onRemoveRelation = (value) => {
    const itemIndex = modifiedData.addresses.findIndex(
      (obj) => obj.id === value
    )

    if (itemIndex > -1) {
      const copy = [...modifiedData.addresses]
      copy.splice(itemIndex, 1)
      setModifiedData((d) => ({
        ...d,
        addresses: copy,
      }))
    }
  }

  return {
    addRelation,
    modifiedData,
    moveRelation: null,
    onChange: null,
    onRemoveRelation,
  }
}
