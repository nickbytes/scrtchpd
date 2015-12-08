import React from 'react';

var Codemirror = require('react-codemirror');
var LocalStorageMixin = require('react-localstorage')
    require('../../node_modules/codemirror/mode/markdown/markdown.js')
    require('../../node_modules/codemirror/mode/gfm/gfm.js');

var Pad = React.createClass({
  render: function() {
  }
});

var Archive = React.createClass({
  render: function() {
    return (
      <div className="archive">
        <form>
            <input type="text" placeholder="Search" />
        </form>
        <div class="notes">
          <NoteList />
        </div>
      </div>
    );
  }
});

var SearchBar = React.createClass({
  render: function() {
  }
});

var NoteList = React.createClass({
  mixins: [LocalStorageMixin, ReactFireMixin],
  getInitialState: function() {
    return {
      notes: []
    };
  },
  componentWillMount: function() {
    var firebaseRef = new Firebase("https://scrtchpd.firebaseio.com/notes");
    this.bindAsArray(firebaseRef, "notes");
  },
  activateNote: function(i, item) { 
    console.log('activateNote');
    console.log(this.props.notes[i]);
    /* When a note is selected in the list, populate the main window with it's content */
    this.props.updateNoteArea(item.note);
    console.log('full note:' + item.note);
  },
  render: function() {
    return (
      <ul className="notes-list" >
        {this.props.notes.map(function(item, i) {
          var note = item.note.substring(0,50);
          return (
            <li onClick={this.activateNote.bind(this, i, item)} key={i}>{note}</li>
          );
        }, this)}
      </ul>
    );
  }
});

var Note = React.createClass({
  render: function() {
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
  updateCode: function(newCode, item) {
    this.setState({
        code: newCode
    });
    this.setState({counter: this.state.counter + 1});
    console.log('Updated counter:' + this.state.counter);
    this.countChars();
    console.log('content: ' + newCode);
  },
  clearText: function() {
    this.setState({
      code: ""
    });
  },
  handleChange: function(event) {
    this.setState({ text: event.target.value });
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
          <NoteList notes={this.state.notes} />
        </div>
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.onChange } value={ this.state.text } />
          <button>{ 'Add #' + (this.state.notes.length + 1) }</button>
        </form>
        <div>
        
        </div>
        <section className="writer">
          <Codemirror className="text-editor" id="text-editor" value={this.state.code} onChange={this.updateCode} options={options} noteID={this.state.noteID} />
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