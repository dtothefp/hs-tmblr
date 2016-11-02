import React, {Component, PropTypes} from 'react';

export default class App extends Component {
  static contextTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props, ctx) {
    super(props, ctx);

    this.state = {};
    this.inputs = [
      {
        header: 'Blog Name',
        name: 'blog',
        type: 'text'
      },
      {
        header: 'Tag',
        name: 'tag',
        type: 'text'
      }
    ];
  }

  handleChange = (e) => {
    const {name, value} = e.target;

    this.setState({[name]: value});
  }

  handleBlur = (e) => {
    const {name, value} = e.target;

    // fallback for browser/device autofill
    if (value !== this.state.value) {
      this.setState({[name]: value});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.actions.postActions.init(this.state);
  }

  renderInputs() {
    return this.inputs.map(({header, ...props}, i) => (
      <label
        htmlFor={props.name}
        key={`search_input_${i}`}
      >
        {header}
        <input
          id={props.name}
          value={this.state[props.name] || ''}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          {...props}
        />
      </label>
    ));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInputs()}
        <button type="submit">Search</button>
      </form>
    );
  }
}
