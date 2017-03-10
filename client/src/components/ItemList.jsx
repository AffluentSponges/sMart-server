import React from 'react'
import { Grid, Image, Container } from 'semantic-ui-react'
import ItemElement from './ItemElement.jsx'
import { Link } from 'react-router';
import CategoriesNav from './CategoriesNav.jsx';
import Dimensions from 'react-dimensions'


class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var _this = this;
    var itemsInColumn = Math.floor(this.props.items.length / 4);
    var columns = { 0: [], 1: [], 2: [], 3: []};
    for (var i = 0; i < this.props.items.length; i++) {
      var target = i % 4;
      columns[target].push(this.props.items[i]);
    }
    var columns_5 = { 0: [], 1: [], 2: [], 3: [], 4: []};
    for (var i = 0; i < this.props.items.length; i++) {
      var target = i % 5;
      columns_5[target].push(this.props.items[i]);
    }
    if (this.props.containerWidth < 1000) {
      return (
        <Grid >
          <Grid.Row columns={'equal'}>
            <Grid.Column style={{'padding-right': '0px'}}>
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
            <Grid.Column  style={{'padding-left': '0px'}}>
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
    return (
      <Grid relaxed >
        <Grid.Row columns={5} style={{'margin-right': '30px', 'margin-left': '30px'}}>
          <Grid.Column style={{'padding-right': '7px', 'padding-left': '7px'}}>
            {columns_5[0].map((item)=>
                <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                  <ItemElement key={item.id} item={item} />
                </Container>
            )} 
          </Grid.Column> 
          <Grid.Column style={{'padding-right': '7px', 'padding-left': '7px'}}>
            {columns_5[1].map((item)=>
                <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                  <ItemElement key={item.id} item={item} />
                </Container>
            )} 
          </Grid.Column>  
          <Grid.Column style={{'padding-right': '7px', 'padding-left': '7px'}}>
            {columns_5[2].map((item)=>
                <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                  <ItemElement key={item.id} item={item} />
                </Container>
            )} 
          </Grid.Column>  
          <Grid.Column style={{'padding-right': '7px', 'padding-left': '7px'}}>
            {columns_5[3].map((item)=>
                <Container className='ItemElement_Container' key={item.id} as={Link} to={'/i/' + item.id}>
                  <ItemElement key={item.id} item={item} />
                </Container>
            )} 
          </Grid.Column> 
          <Grid.Column style={{'padding-right': '7px', 'padding-left': '7px'}}>
            {columns_5[4].map((item)=>
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

export default Dimensions()(ItemList);