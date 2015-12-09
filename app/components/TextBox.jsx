import React from 'react';

var Codemirror = require('react-codemirror');
var LocalStorageMixin = require('react-localstorage')
    require('../../node_modules/codemirror/mode/markdown/markdown.js')
    require('../../node_modules/codemirror/mode/gfm/gfm.js');

var Pad = React.createClass({
  render: function() {
  }
});

var SearchBar = React.createClass({
  /* Search form. This component lives at the top of the Archive component above the notes list, */
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
      </form>
    )
  }
});

var NoteList = React.createClass({
  /* This compenent contains the list of individual notes */
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      notes: []
    };
  },
  
  activateNote: function(i, item) { 
    /* This takes the clicked note, and displays it's full content in the main text window */
    console.log('full note:' + item.note);
    this.props.updateNoteArea(item.note);
  },
  render: function() {
    return (
      <ul className="notes-list" >
        {this.props.notes.map(function(item, i) {
          /* Take the full note and cut it down to 50 characters */
          var note = item.note.substring(0,50);
          return (
            /* Using this li element here, because the onClick function doesn't want to work on the Note compenent below */
            <li onClick={this.activateNote.bind(this, i, item)} key={i}>{note}</li>
            /* <Note onClick={this.activateNote.bind(this, i, item)} item={item} key={i} /> */ 
          );
        }, this)}
      </ul>
    );
  }
});

var Note = React.createClass({
  /* Not in use yet */
  render: function() {
    return (    
      <li key={this.props.i}>{this.props.item}</li>
    );
  }
});

var TextBox = React.createClass({
  displayName: 'TextBox',
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      text: "",
      code: "Write something",
      counter: 0,
      notes: []
    };
    console.log('initial counter:' + this.state.counter);
  },
  componentWillMount: function() {
    var firebaseRef = new Firebase("https://scrtchpd.firebaseio.com/notes");
    this.bindAsArray(firebaseRef, "notes");
  },
  updateCode: function(newCode, item) {
    /* On update, set the state of Codemirror to the newly typed text. Also save the new text to Firebase */
    var firebaseRef = new Firebase("https://scrtchpd.firebaseio.com/notes");
      /* Why does this only work if defined above? Shouldn't it pull in vars from other functions? */
    var testRef = firebaseRef.child('-K4xGsnubFLoN4I7otIs'); 
    testRef.update({
      "note": "testUpdate"
    });
    /* This code sets the text of Codemirror */
    this.setState({
        code: newCode
    });
  },
  handleNoteAreaUpdate: function(item){
    /* This takes the actived note, and sets the state of Codemirror that that note's full text. */
    this.setState({
      code: item,
    });
  },
  render: function() {
    var options = {
      mode: {
        name: "gfm",
        highlightFormatting: true
      },
      lineNumbers: false,
      lineWrapping: true,
      autofocus: true,
      extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"},
    };
    return (
      <div>
        <div className="archive">
          <SearchBar />
          <div className="notes">
            <NoteList notes={this.state.notes} updateNoteArea={this.handleNoteAreaUpdate} />
          </div>
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