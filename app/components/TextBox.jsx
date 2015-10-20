import React from 'react';
var Codemirror = require('react-codemirror');

var TextBox = React.createClass({
	getInitialState: function() {
    return {
      text: "",
      code: "Write something"
    };
  },
  updateCode: function(newCode) {
        this.setState({
            code: newCode
        });
        localStorage.state = JSON.stringify(this.state);
        console.log('Change');
        console.log(this.state);
    },
  handleChange: function(event) {
    this.setState({ text: event.target.value });

  },
  render: function() {
  	var options = {
  		mode: {
      name: "markdown",
      id: "text-editor",
      highlightFormatting: true
	    },
	    lineNumbers: false,
	    lineWrapping: true,
	    autofocus: true,
	    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"},
    };
    return (
    	<div>
    	<section className="writer">
	    	<Codemirror className="text-editor" id="text-editor" value={this.state.code} onChange={this.updateCode} options={options} />
    	</section>

	    	--- 
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