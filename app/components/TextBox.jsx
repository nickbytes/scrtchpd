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
    return (
      <form>
        <input type="text" placeholder="Search..." />
      </form>
    )
  }
});

var NoteList = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      notes: []
    };
  },
  
  activateNote: function(i, item) { 
    console.log('activateNote');
    console.log('full note:' + item.note);
    this.props.updateNoteArea(item.note);
  },
  render: function() {
    return (
      <ul className="notes-list" >
        {this.props.notes.map(function(item, i) {
          var note = item.note.substring(0,50);
          return (
            <li onClick={this.activateNote.bind(this, i, item)} key={i}>{note}</li>
            /* <Note onClick={this.activateNote.bind(this, i, item)} item={item} key={i} /> */ 
          );
        }, this)}
      </ul>
    );
  }
});

var Note = React.createClass({

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
    var testRef = firebaseRef.child('-K4xGsnubFLoN4I7otIs'); 
     testRef.update({
      "note": "t"
    });
     console.log(testRef);
    this.setState({
        code: newCode
    });
    console.log('content: ' + newCode);    
  },
  handleNoteAreaUpdate: function(item){
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
      // mode: "markdown",
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