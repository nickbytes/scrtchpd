import React from 'react';
var Codemirror = require('react-codemirror');
var LocalStorageMixin = require('react-localstorage')
    require('../../node_modules/codemirror/mode/markdown/markdown.js')
    require('../../node_modules/codemirror/mode/gfm/gfm.js');

var Messages = React.createClass({
  render: function() {
    var messageEls = this.props.messages.map(function(item, index) {
      return (
        <div key={index}><strong>{item.user}</strong>: {item.note}</div>
      );
    });
    return <div className="messages">{messageEls}</div>;
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
      messages: []
    };
    console.log('initial counter:' + this.state.counter);
  },
  addMessage: function(newMessage) {
    this.firebaseRefs.messages.push(newMessage);
  },
  componentWillMount: function() {
    /* this.bindAsArray(new Firebase('https://ultimate-donut.firebaseio.com/egghead/react/intro/messages'), 'messages'); */
    this.bindAsArray(new Firebase('https://scrtchpd.firebaseio.com/notes'), 'messages');
  },
  updateCode: function(newCode) {
    this.setState({
        code: newCode
    });
    this.setState({counter: this.state.counter + 1});
    console.log('Updated counter:' + this.state.counter);
    this.countChars();
  },
  clearText: function() {
    this.setState({
      code: ""
    });
  },
  handleChange: function(event) {
    this.setState({ text: event.target.value });
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
      	<div>
          <Messages messages={this.state.messages} />
          
        </div>
      	<section className="writer">
  	    	<Codemirror className="text-editor" id="text-editor" value={this.state.code} onChange={this.updateCode} options={options} />
      	</section>
        <div className="border">
          <ul>
            <li className="clear"><a className="call-modal" onClick={this.clearText}><span>&times;</span></a></li>
            <li className="character-count"><span onClick={this.onClick}>{this.state.code.length}</span></li>
          </ul>
        </div>
      </div>

    );
  }
});

module.exports = TextBox;