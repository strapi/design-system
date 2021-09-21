import { Row, Stack, Box, Text, IconButton } from '@strapi/parts'
import { Minus as BaseMinus, MoveIcon as BaseMoveIcon } from '@strapi/icons'
import styled from 'styled-components'

const Minus = styled(IconButton)`
  padding: 0;
  border: 0;
  svg {
    width: 20px;
    height: 20px;
  }
`

const MoveIcon = styled(BaseMoveIcon)`
  width: 24px;
  height: 24px;
`

const Circle = styled(Box)`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.secondary600};
  border-radius: 12px;
`

const Item = ({ onRemove, children }) => {
  return (
    <Row as="li" paddingTop={2} paddingBottom={2} alignItems="center">
      <Row style={{ flex: 1 }} alignItems="center">
        <MoveIcon />
        <Box paddingLeft={1} paddingRight={2}>
          <Circle />
        </Box>
        <Text small>{children}</Text>
      </Row>
      <Minus onClick={onRemove} icon={<BaseMinus />} label="Remove" />
    </Row>
  )
}

export default Item
