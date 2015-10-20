import React from 'react';
var Codemirror = require('react-codemirror');
var LocalStorageMixin = require('react-localstorage')
    require('../../node_modules/codemirror/mode/markdown/markdown.js')
    require('../../node_modules/codemirror/mode/gfm/gfm.js');

var TextBox = React.createClass({
	displayName: 'TextBox',
  mixins: [LocalStorageMixin],
	getInitialState: function() {
    return {
      text: "",
      code: "Write something",
      counter: 0
    };
    console.log('initial counter:' + this.state.counter);
  },
  updateCode: function(newCode) {
    this.setState({
        code: newCode
    });
    this.setState({counter: this.state.counter + 1});
    console.log('Updated counter:' + this.state.counter);
  },
  clearText: function() {
    this.setState({
      code: ""
    });
  },
  handleChange: function(event) {
    this.setState({ text: event.target.value });
  },
  render: function() {
  	var options = {
  		mode: {
        name: "gfm",
        highlightFormatting: true
	    },
      // mode: "markdown",
	    lineNumbers: false,
	    lineWrapping: true,
	    autofocus: true,
	    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"},
    };
    return (
    	<div>
    	<span className="character-count" onClick={this.onClick}>{this.state.code.length}</span>
    	<section className="writer">
	    	<Codemirror className="text-editor" id="text-editor" value={this.state.code} onChange={this.updateCode} options={options} />
    	</section>
      <span onClick={this.clearText}>Clear</span>
      </div>
    );
  }
});

module.exports = TextBox;