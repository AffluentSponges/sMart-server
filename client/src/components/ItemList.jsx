import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import ItemElement from './ItemElement.jsx'
import { Link } from 'react-router';


class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var _this = this;
    return (
      <Grid relaxed columns={4}>
        {_this.props.items.map((item) =>
          <Grid.Column key={item.id} as={Link} to={'/i/' + item.id} onClick={()=>{console.log(item.id)}}>
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