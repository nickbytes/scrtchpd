import React from 'react';
import { Link } from 'react-router';
import TextBox from '../components/TextBox';

export default class HomePageContainer extends React.Component {

  static defaultProps = {

  }

  render() {
    return (
      <div>
        <TextBox />
      </div>
      
    );
  }

}
