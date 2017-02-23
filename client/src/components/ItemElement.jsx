import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const ItemElement = (props) => (
  <Card>
    <Image src={props.item.imageUrls[0]} />
    <Card.Content>
      <Card.Header>{props.item.title}</Card.Header>
      <Card.Meta>Joined in 2016</Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        10 Friends
      </a>
    </Card.Content>
  </Card>
)

export default ItemElement;