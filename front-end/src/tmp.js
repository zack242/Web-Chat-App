
class Uvi extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({latitude: event.target.value});
    this.setState({longitude: event.target.value})

  }

  handleSubmit(event) {
    alert('Latitude ' + this.state.latitude + ' longitude ' + this.state.longitude);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Latitude :
          <input type="text" value={this.state.latitude} onChange={this.handleChange} />
        </label>
        <label>
          Longitude :
          <input type="text" value={this.state.longitude} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Uvi;
