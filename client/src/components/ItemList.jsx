import React from 'react'
import { Grid, Image, Container } from 'semantic-ui-react'
import ItemElement from './ItemElement.jsx'
import { Link } from 'react-router';


class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var _this = this;
    var itemsInColumn = Math.floor(this.props.items.length / 4);
    var column1 = this.props.items.slice(0, itemsInColumn + 1)
    var column2 = this.props.items.slice(itemsInColumn + 1, itemsInColumn * 2 + 1)
    var column3 = this.props.items.slice(itemsInColumn * 2 + 1, itemsInColumn * 3 + 2)
    var column4 = this.props.items.slice(itemsInColumn * 3 + 2)
    console.log('this.props.items.length', this.props.items.length);
    console.log('itemsInColumn', itemsInColumn);
    console.log('column1', column1);
    return (
      <Grid relaxed columns={4}>
        <Grid.Column>
          {column1.map((item)=>
              <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                <ItemElement key={item.id} item={item} />
              </Container>
          )} 
        </Grid.Column> 
        <Grid.Column>
          {column2.map((item)=>
              <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                <ItemElement key={item.id} item={item} />
              </Container>
          )} 
        </Grid.Column>  
        <Grid.Column>
          {column3.map((item)=>
              <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                <ItemElement key={item.id} item={item} />
              </Container>
          )} 
        </Grid.Column>  
        <Grid.Column>
          {column4.map((item)=>
              <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                <ItemElement key={item.id} item={item} />
              </Container>
          )} 
        </Grid.Column>   
      </Grid>
    );
  }
}



        // {_this.props.items.map((item) =>
        //   <Grid.Column key={item.id} onClick={()=>{console.log(item.id)}}>
        //     <Container key={item.id} as={Link} to={'/i/' + item.id}>
        //       <ItemElement key={item.id} item={item} />
        //     </Container>
        //   </Grid.Column>       
        // )}




// const ItemList = (props) => (
//   <Grid relaxed columns={4}>
//       {props.items.map((item) =>
//         <Grid.Column key={item.postId} as={Link} to={'/i/' + item.postId} onClick={()=>{console.log(item.postId)}}>
//           <ItemElement item={item}/>
//         </Grid.Column>       
//       )}
//   </Grid>
// )

export default ItemList;



// const ItemList = (props) => (
//   <Grid relaxed columns={4}>
//     <Grid.Column>
//       <ItemElement />
//     </Grid.Column>
//     <Grid.Column>
//       <ItemElement />
//     </Grid.Column>
//     <Grid.Column>
//       <ItemElement />
//     </Grid.Column>
//     <Grid.Column>
//       <ItemElement />
//     </Grid.Column>
//     <Grid.Column>
//       <ItemElement />
//     </Grid.Column>
//     <Grid.Column>
//       <ItemElement />
//     </Grid.Column>     
//   </Grid>
// )














// const ItemList = () => (
//   <Grid relaxed columns={4}>
//     <Grid.Column>
//       <Image src='http://semantic-ui.com/images/wireframe/image.png' />
//     </Grid.Column>
//     <Grid.Column>
//       <Image src='http://semantic-ui.com/images/wireframe/image.png' />
//     </Grid.Column>
//     <Grid.Column>
//       <Image src='http://semantic-ui.com/images/wireframe/image.png' />
//     </Grid.Column>
//     <Grid.Column>
//       <Image src='http://semantic-ui.com/images/wireframe/image.png' />
//     </Grid.Column>
//    <Grid.Column>
//       <Image src='http://semantic-ui.com/images/wireframe/image.png' />
//     </Grid.Column>  
//   </Grid>
// )

// export default ItemList