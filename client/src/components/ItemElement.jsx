import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const ItemElement = (props) => (
  <Card>
    <Image src={props.item.image_links[0]} />
    <Card.Content>
      <Card.Header>{props.item.title}</Card.Header>
      <Card.Meta>{'$' + props.item.asking_price}</Card.Meta>
    </Card.Content>
    <Card.Content extra>
        {props.item.created_at.split('T')[0]}
    </Card.Content>
  </Card>
)

export default ItemElement;