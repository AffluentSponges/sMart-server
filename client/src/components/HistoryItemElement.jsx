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
        <Card.Header className='textCenter'>{props.item.title}</Card.Header>
        <Card.Meta className='textCenter'>{'$' + props.item.asking_price}</Card.Meta>
        {props.item.sold ? (
            <Button fluid color='instagram' as={Link} to={'/h/' + props.item.id} style={{'margin-top': '10px'}}>
                See Delivery Status
            </Button>
          ) : (
            null
          )
        }
      </Card.Content>
    </Card>
  )
}

export default HistoryItemElement;