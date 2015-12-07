import React from 'react';

var Codemirror = require('react-codemirror');
var LocalStorageMixin = require('react-localstorage')
    require('../../node_modules/codemirror/mode/markdown/markdown.js')
    require('../../node_modules/codemirror/mode/gfm/gfm.js');

var Messages = React.createClass({
  render: function() {
    var messageEls = this.props.notes.map(function(item, index) {
      var note = item.note.substring(0,50);
      return (
        <li key={index}><strong>{item.user}</strong>: {note}</li>
      );
    });
    return <ul className="notes-list">{messageEls}</ul>;
  },
  // .getDOMNode is deprecated
  // https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#dom-node-refs
  scrollToBottom: function() {
    // var el = ReactDOM.findDOMNode(this);
    // el.scrollTop = el.scrollHeight;
  },
  componentDidMount: function() {
    this.scrollToBottom();
  },
  componentDidUpdate: function() {
    this.scrollToBottom();
  }
});



var TextBox = React.createClass({
	displayName: 'TextBox',
  mixins: [LocalStorageMixin, ReactFireMixin],
	getInitialState: function() {
    return {
      text: "",
      code: "Write something",
      counter: 0,
      notes: []
    };
    console.log('initial counter:' + this.state.counter);
  },
  addMessage: function(newMessage) {
    this.firebaseRefs.notes.push(newMessage);
  },
  componentWillMount: function() {
    var firebaseRef = new Firebase("https://scrtchpd.firebaseio.com/notes");
    this.bindAsArray(firebaseRef, "notes");
  },
  updateCode: function(newCode) {
    this.setState({
        code: newCode
    });
    this.setState({counter: this.state.counter + 1});
    console.log('Updated counter:' + this.state.counter);
    this.countChars();
    console.log('content: ' + newCode);
    this.firebaseRefs.notes.push({
      // note: newCode
    });
  },
  clearText: function() {
    this.setState({
      code: ""
    });
  },
  newNote: function(){
    this.firebaseRefs.notes.push({
      note: ""
    });
  },
  handleChange: function(event) {
    this.setState({ text: event.target.value });
    this.firebaseRefs.notes.push({
      note: this.state.text
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.firebaseRefs.notes.push({
      note: this.state.text
    });
    this.setState({ text: "Submitted" });
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  countChars: function(){
    console.log('counting');
    console.log(this.state.code.length);
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
        <div class="notes">
          <Messages notes={this.state.notes} />
        </div>
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.onChange } value={ this.state.text } />
          <button>{ 'Add #' + (this.state.notes.length + 1) }</button>
        </form>
      	<div>
        
          
        </div>
      	<section className="writer">
  	    	<Codemirror className="text-editor" id="text-editor" value={this.state.code} onChange={this.updateCode} options={options} />
      	</section>
        <div className="border">
          <ul>
            <li className="clear"><a className="call-modal" onClick={this.clearText}><span>&times;</span></a></li>
            <li className="character-count"><span onClick={this.onClick}>{this.state.code.length}</span></li>
            <li><a onClick={this.newNote}>New note</a></li>
          </ul>
        </div>
      </div>

    );
  }
});

module.exports = TextBox;