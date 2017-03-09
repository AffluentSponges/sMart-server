import React from 'react';
import { Link } from 'react-router';
import { Segment, Divider, Menu } from 'semantic-ui-react'

class CategoriesNav2 extends React.Component {
  constructor(props) {
    super(props);
  }

  handleItemClick = (e, { name }) => {
    this.props.currentCategoryHandler(name);
  }

  render() {
    const activeItem = this.props.state.currentCategoryName;
    return (
      <div>
        <Menu pointing secondary stackable color='red' className='CategoriesNav2'>
          {this.props.state.categories.map((category)=>{
            return <Menu.Item as={Link} name={category.name} to={`/x/${category.id}`} key={category.id} active={activeItem === category.name} onClick={this.handleItemClick} />
          })}
        </Menu>
      </div>
    )
  }
}

export default CategoriesNav2;