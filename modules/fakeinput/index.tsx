import * as React from 'react';
import * as cx from 'classnames';
import './index.css';

interface TextInputProps {
  className?: string,
  onFocus?: (e: React.FormEvent<HTMLInputElement>) => void,
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void
}

class FakeInput extends React.Component<TextInputProps, { focus: boolean }> {

  state = {
    focus: false
  }

  handleOnFocus = (event: React.FormEvent<HTMLInputElement>) => {
    let onFocus = this.props.onFocus;

    this.setState({
      focus: true
    });

    if (onFocus) {
      onFocus(event);
    }
  }

  handleOnBlur = (event: React.FormEvent<HTMLInputElement>) => {
    let onBlur = this.props.onBlur;

    this.setState({
      focus: false
    });

    if (onBlur) {
      onBlur(event);
    }
  }

  render() {
    const { className, ...otherProps } = this.props;
    const focus = this.state.focus;
    return (
      <div className={cx(className, "fakeinput", { "fakeinput--focus": focus })}>
        <input className="fakeinput__input" type="text" {...otherProps} onFocus={this.handleOnFocus} onBlur={this.handleOnBlur}/>
      </div>
    )
  }

}

export default FakeInput;
