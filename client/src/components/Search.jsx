import _ from 'lodash'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Search, Grid, Header } from 'semantic-ui-react'

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
    console.log(this.state);
  }

  handleSearchChange(e, value) {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.searchData, isMatch),
      })
    }, 500)
  }

  onResultSelect(e, item) {
    browserHistory.push(`/i/${item.id}`);
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
            placeholder='What are you looking for?'
            onResultSelect={this.onResultSelect.bind(this)}
            {...this.props}
          />
    )
  }
}