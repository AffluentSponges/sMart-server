import React from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
 
class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
    this.onChange = (address) => this.setState({ address })
  }
 
  handleFormSubmit = (event) => {
    event.preventDefault()
    const { address } = this.state
 
    geocodeByAddress(address,  (err, { lat, lng }) => {
      if (err) { console.log('Oh no!', err) }
 
      console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng })
    })
  }
 
  render() {
    return (
        <PlacesAutocomplete
          name='autocomplete'
          value={this.state.address}
          onChange={this.onChange}
          placeholder='your address will be autocompleted'
        />
    )
  }
}
 
export default SimpleForm


      // <form onSubmit={this.handleFormSubmit}>
      //   <PlacesAutocomplete
      //     value={this.state.address}
      //     onChange={this.onChange}
      //   />
      //   <button type="submit">Submit</button>
      // </form>