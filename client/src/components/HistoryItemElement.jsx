import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router';


const HistoryItemElement = (props) => {
  if (typeof props.item.image_links[0] === 'object') {
    console.log(props.item.image_links); 
  }
  console.log(props.item.sold);
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
      {props.item.sold ? (
        <Card.Content>
          <Button color='instagram' as={Link} to={'/h/' + props.item.id}>
              See Delivery Status
          </Button>
        </Card.Content>
        ) : (
          null
        )
      }
    </Card>
  )
}

export default HistoryItemElement;