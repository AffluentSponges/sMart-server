import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import ItemElement from './ItemElement.jsx'
import { Link } from 'react-router';


class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid relaxed columns={4}>
        {this.props.items.map((item) =>
          <Grid.Column key={item.postId} as={Link} to={'/i/' + item.postId} onClick={()=>{console.log(item.postId)}}>
            <ItemElement item={item} />
          </Grid.Column>       
        )}
      </Grid>
    );
  }
}







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