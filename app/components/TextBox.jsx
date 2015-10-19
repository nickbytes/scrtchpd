import React from 'react';
var Codemirror = require('react-codemirror');

var TextBox = React.createClass({
	getInitialState: function() {
    return {
      text: "",
      code: "// Code"
    };
  },
  updateCode: function(newCode) {
        this.setState({
            code: newCode
        });
    },
  handleChange: function(event) {
    this.setState({ text: event.target.value });
  },
  render: function() {
  	var options = {
	    // lineNumbers: true
    };
    return (
    	<div>
	    	<Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
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
      </div>
    );
  }
});

module.exports = TextBox;