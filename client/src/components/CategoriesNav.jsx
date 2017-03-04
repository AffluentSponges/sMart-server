import React from 'react';
import { Link } from 'react-router';
import { Segment, Divider } from 'semantic-ui-react'

const CategoryList = ({active, children, to, currentCategoryHandler}) => (
    <li>
      <Link to={to} onClick={()=>{console.log(children);currentCategoryHandler(children);}}>
            <span className='categoryName'>{children}</span>
      </Link>
    </li>
)

class CategoriesNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment>
        <ul className="">
          <h5>Categories</h5>
          <Divider />
          {this.props.state.categories.map((category)=>{
            return <CategoryList to={`/x/${category.id}`} key={category.id} currentCategoryHandler={this.props.currentCategoryHandler}>{category.name}</CategoryList>
          })}
        </ul>
      </Segment>
    );
  }
}


export default CategoriesNav;