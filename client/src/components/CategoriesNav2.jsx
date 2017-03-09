import React from 'react';
import { Link } from 'react-router';
import { Segment, Divider, Menu } from 'semantic-ui-react'
import Dimensions from 'react-dimensions'

class CategoriesNav2 extends React.Component {
  constructor(props) {
    super(props);
  }

  handleItemClick = (e, { name }) => {
    this.props.currentCategoryHandler(name);
  }

  render() {
    const activeItem = this.props.state.currentCategoryName;
    var vertical = false;
    if (this.props.containerWidth < 1000) {
      vertical = true;
    }
    return (
      <Menu pointing secondary vertical={vertical} fluid color='red' className='CategoriesNav2'>
        {this.props.state.categories.map((category)=>{
          return <Menu.Item as={Link} name={category.name} to={`/x/${category.id}`} key={category.id} active={activeItem === category.name} onClick={this.handleItemClick} />
        })}
      </Menu>
    )
  }
}

export default Dimensions()(CategoriesNav2);