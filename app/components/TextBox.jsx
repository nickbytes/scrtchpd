import React from 'react';

var TextBox = React.createClass({
  render: function() {
    return (
      <section className="writer">
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