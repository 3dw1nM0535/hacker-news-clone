import React, { Component } from 'react';
import Link from './Link';

class LinkList extends Component {

  render() {

    const linksToRender = [
      {
        id: '1',
        description: 'The Collest GraphQL Backend',
        url: 'https://www.graphcool.com'
      },
      {
        id: '2',
        description: 'The Best GraphQL Client',
        url: 'https://dev.apollodata.com/'
      }
    ];

    return (
      <div>
        {
          linksToRender.map(link => (
            <Link key={link.id} link={link} />
          ))
        }
      </div>
    );
  }
}

export default LinkList;