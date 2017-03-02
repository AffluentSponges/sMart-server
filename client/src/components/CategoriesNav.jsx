import React from 'react';
import { Link } from 'react-router';
import { Segment } from 'semantic-ui-react'

const CategoryList = ({active, children, to, currentCategoryHandler}) => (
    <li>
      <Link to={to} onClick={()=>{console.log(children);currentCategoryHandler(children);}}>
            {children}
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
        <ul className="row">
          <h5>Categories</h5>
          {this.props.state.categories.map((category)=>{
            return <CategoryList to={`/x/${category.id}`} key={category.id} currentCategoryHandler={this.props.currentCategoryHandler}>{category.name}</CategoryList>
          })}
        </ul>
      </Segment>
    );
  }
}


export default CategoriesNav;