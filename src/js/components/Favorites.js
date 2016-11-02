import React, {Component, PropTypes} from 'react';

export default class Posts extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
  };

  static contextTypes = {
    actions: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="favorites" />
    );
  }
}
