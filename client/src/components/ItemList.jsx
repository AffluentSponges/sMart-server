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
      // if (i < 3) {
      //   columns[i + 1].push(this.props.items[i]);
      //   continue;
      // }
      var target = i % 4;
      columns[target].push(this.props.items[i]);
    }
    return (
      <Grid relaxed>
        <Grid.Row columns={4} only='computer'>
          <Grid.Column>
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
        </Grid.Row> 
        <Grid.Row columns={2} only='mobile tablet'>
          <Grid.Column>
            {columns[0].map((item)=>
                <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                  <ItemElement key={item.id} item={item} />
                </Container>
            )} 
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
            {columns[3].map((item)=>
                <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                  <ItemElement key={item.id} item={item} />
                </Container>
            )} 
          </Grid.Column>  
        </Grid.Row> 
      </Grid>
    );
  }
}

export default ItemList;