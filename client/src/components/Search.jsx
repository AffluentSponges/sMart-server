import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'

// const source = _.times(5, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, '$'),
// }))
  
export default class SearchExampleStandard extends Component {
  constructor(props) {
    super(props);

  }  

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent() {
    this.setState({ isLoading: false, results: [], value: '' })
  }

  handleResultSelect(e, result) {
    this.setState({ value: result.title })
  }

  handleSearchChange(e, value) {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.items, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (

          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect.bind(this)}
            onSearchChange={this.handleSearchChange.bind(this)}
            results={results}
            value={value}
            {...this.props}
          />
    )
  }
}