import React from 'react';

var TextBox = React.createClass({
	getInitialState: function() {
    return {
      text: ""
    };
  },
  handleChange: function(event) {
    this.setState({ text: event.target.value });
  },
  render: function() {
    return (
      <section className="writer">
      {this.state.text}
      <textarea className="form-control"
                  onChange={this.handleChange}>
        </textarea>
        <form>
          <textarea id="text-editor" name="editor">
          </textarea>
        </form>
        <div id="preview"> </div>
      </section>
    );
  }
});

module.exports = TextBox;