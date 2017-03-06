import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const ItemElement = (props) => {
  if (typeof props.item.image_links[0] === 'object') {
    console.log(props.item.image_links); 
  }
  return (
    <Card fluid>
      <Image fluid src={props.item.image_links[0]} />
      <Card.Content>
        <Card.Header>{props.item.title}</Card.Header>
        <Card.Meta>{'$' + props.item.asking_price}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
          {props.item.created_at.split('T')[0]}
      </Card.Content>
    </Card>
  )
}

export default ItemElement;