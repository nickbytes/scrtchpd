import React from 'react';
import { Link } from 'react-router';


export default class HomePageContainer extends React.Component {

  static defaultProps = {

  }

  render() {
    return (
      <div>
        <div className="border">
          <ul>
            <li className="clear"><a href="#modal-clear" className="call-modal"><span>&times;</span><em>Clear these notes</em></a></li>
            <li className="info"><a href="#modal-info" className="call-modal"><span>?</span><em>sctrchpd.com info</em></a></li>
          </ul>
        </div>
        <section className="writer">
          <form>
            <textarea id="text-editor" name="editor">
            TEXTAREA</textarea>
          </form>
          <div id="preview"> </div>
        </section>

      </div>
    );
  }

}
