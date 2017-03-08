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
        <Card.Header className='textCenter'>{props.item.title}</Card.Header>
        <Card.Meta className='textCenter metaPrice'>{'$' + props.item.asking_price}</Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default ItemElement;