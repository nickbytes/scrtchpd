import React from 'react';
import Tabs from 'react-simpletabs';
import TextBox from '../components/TextBox';

export default class TabsContainer extends React.Component{
  render(){
    return(
      <div>
        <Tabs>

          <Tabs.Panel title='Tab #1'>
            <h2>Content #1 here</h2>
          </Tabs.Panel>

          <Tabs.Panel title='Tab #2'>
            <TextBox />
          </Tabs.Panel>

          <Tabs.Panel title='Tab #3'>
            <h2>Content #3 here</h2>
          </Tabs.Panel>

        </Tabs>
      </div>
    )
  }
}
