import { AsyncCombobox, ComboboxOption } from '@strapi/parts'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchRelations, useContentManagerEditViewDataManager } from './demo'
import { usePrevious } from '../helpers/usePrevious'
import Item from './Item'

const RelationsCombobox = ({
  label,
  collection,
  queryInfos,
  mainField,
  name,
  relationType,
}) => {
  const [_limit, setLimit] = useState(10)
  const [_contains, setContains] = useState(null)
  const { containsKey } = queryInfos

  const {
    isLoading,
    isFetching,
    error,
    data: relationsData,
  } = useQuery(
    ['get-relation-' + collection, _limit, _contains],
    fetchRelations(queryInfos.endPoint, mainField.name, {
      _limit,
      ...(_contains ? { [containsKey]: _contains } : {}),
    }),
    {
      keepPreviousData: true,
    }
  )
  // Hack to control pagination
  const previousRelationsData = usePrevious(relationsData)
  const hasMoreItems = previousRelationsData?.length !== relationsData?.length

  const {
    addRelation,
    modifiedData,
    moveRelation,
    onChange,
    onRemoveRelation,
  } = useContentManagerEditViewDataManager({ relationsData })

  const values = modifiedData?.[name]
  const isSingle = [
    'oneWay',
    'oneToOne',
    'manyToOne',
    'oneToManyMorph',
    'oneToOneMorph',
  ].includes(relationType)

  return (
    <>
      <AsyncCombobox
        label={`${label} ${!isSingle && ` (${values.length})`}`}
        value=""
        onChange={addRelation}
        placeholder="Add an item..."
        onLoadMore={() => setLimit((l) => l + 10)}
        onSearchOption={setContains}
        loading={isLoading || isFetching}
        hasMoreItems={hasMoreItems}
      >
        {relationsData
          ?.filter(
            (option) => values.findIndex((o) => o.id === option.value.id) === -1
          )
          .map(({ value: obj }) => (
            <ComboboxOption key={obj.id} value={obj.id.toString()}>
              {obj[mainField.name]}
            </ComboboxOption>
          ))}
      </AsyncCombobox>
      <ul>
        {values?.map((obj) => (
          <Item
            key={obj.id.toString()}
            onRemove={() => onRemoveRelation(obj.id)}
          >
            {obj[mainField.name]}
          </Item>
        ))}
      </ul>
    </>
  )
}

export default RelationsCombobox
