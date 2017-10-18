import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default function withForm(Wrapped, initialState = {}) {
  class WithForm extends PureComponent {
    constructor(props) {
      super(props);
      this.onUpdate = this.onUpdate.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = props.initialState || initialState;
    }
    onUpdate(field) {
      return value => this.setState({ [field]: value.target ? value.target.value : value });
    }
    onSubmit() {
      return this.props.onSubmit(this.state);
    }
    render() {
      const { initialState: initial, ...props } = this.props;
      return (
        <Wrapped {...props} {...this.state} onSubmit={this.onSubmit} onUpdate={this.onUpdate} />
      );
    }
  }
  WithForm.propTypes = {
    // eslint-disable-next-line
    initialState: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
  };
  return WithForm;
}
