import React from 'react';
import { Link } from 'react-router';
import TextBox from '../components/TextBox';
import TabsContainer from '../components/TabsContainer';

export default class HomePageContainer extends React.Component {

  static defaultProps = {

  }

  render() {
    return (
      <div>
          <TabsContainer />
      </div>

    );
  }

}
