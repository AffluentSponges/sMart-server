import React from 'react'
import { Grid, Image, Container } from 'semantic-ui-react'
import ItemElement from './ItemElement.jsx'
import { Link } from 'react-router';
import CategoriesNav from './CategoriesNav.jsx';


class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var _this = this;
    var itemsInColumn = Math.floor(this.props.items.length / 4);
    var columns = { 0: [], 1: [], 2: [], 3: []};
    for (var i = 0; i < this.props.items.length; i++) {
      if (i < 3) {
        columns[i + 1].push(this.props.items[i]);
        continue;
      }
      var target = i % 4;
      columns[target].push(this.props.items[i]);
    }
    return (
      <Grid relaxed columns={4}>
        <Grid.Column>
          <CategoriesNav state={this.props.state} currentCategoryHandler={this.props.currentCategoryHandler}/>
          {columns[0].map((item)=>
              <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                <ItemElement key={item.id} item={item} />
              </Container>
          )} 
        </Grid.Column> 
        <Grid.Column>
          {columns[1].map((item)=>
              <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                <ItemElement key={item.id} item={item} />
              </Container>
          )} 
        </Grid.Column>  
        <Grid.Column>
          {columns[2].map((item)=>
              <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                <ItemElement key={item.id} item={item} />
              </Container>
          )} 
        </Grid.Column>  
        <Grid.Column>
          {columns[3].map((item)=>
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