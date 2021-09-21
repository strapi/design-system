import { Box, Divider, Stack, TableLabel } from '@strapi/parts'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'
import { AppLayout } from '../layouts/AppLayout'
import RelationsCombobox from '../RelationsCombobox/RelationsCombobox'

const queryClient = new QueryClient()

const props = {
  fieldSchema: {
    via: 'categories',
    collection: 'address',
    attribute: 'address',
    column: 'id',
    isVirtual: true,
    type: 'relation',
    targetModel: 'application::address.address',
    relationType: 'manyToMany',
  },
  metadatas: {
    label: 'Addresses',
    description: '',
    placeholder: '',
    visible: true,
    editable: true,
    mainField: {
      name: 'postal_coderr',
      schema: {
        type: 'string',
      },
    },
  },
  name: 'addresses',
  queryInfos: {
    endPoint:
      '/content-manager/relations/application::category.category/addresses',
    containsKey: 'postal_coderr_contains',
    defaultParams: {},
    shouldDisplayRelationLink: true,
  },
}

const RelationsComboboxPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Box padding={6}>
          <Box
            padding={6}
            style={{ width: 230 }}
            borderColor="neutral200"
            background="neutral0"
            hasRadius
          >
            <Stack size={4}>
              <Box>
                <Stack size={2}>
                  <TableLabel>Relations</TableLabel>
                  <Box>
                    <Divider />
                  </Box>
                </Stack>
              </Box>
              <RelationsCombobox
                {...props.fieldSchema}
                {...props.metadatas}
                key={props.name}
                labelIcon={props.labelIcon}
                name={props.name}
                relationsType={props.fieldSchema.relationType}
                queryInfos={props.queryInfos}
              />
            </Stack>
          </Box>
        </Box>
      </AppLayout>
    </QueryClientProvider>
  )
}

export default RelationsComboboxPage
