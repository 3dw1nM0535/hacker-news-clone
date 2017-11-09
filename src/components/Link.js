import React, { Component } from 'react';
import { GC_USER_ID } from '../constants';
import { timeDifferenceForDate } from '../../src/utils';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Link extends Component {


  render() {

    const userID = localStorage.getItem(GC_USER_ID);

    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{ this.props.index + 1 }.</span>
          { userID && <div className='ml1 gray f11' onClick={() => this._voteForLink()}>▲</div> }
        </div>
        <div className="ml1">
          <div>{ this.props.link.description } ({ this.props.link.url })</div>
          <div className="f6 lh-copy gray">{ this.props.link.votes.length } votes | by {
            this.props.link.postedBy ? this.props.link.postedBy.name : 'Uknown'
          } { timeDifferenceForDate(this.props.link.createdAt)} </div>
        </div>
      </div>
    );
  }

  _voteForLink = async () => {
    const userID = localStorage.getItem(GC_USER_ID)
    const voterIDs = this.props.link.votes.map(vote => vote.user.id)
    if (voterIDs.includes(userID)) {
      console.log(`User (${userID}) already voted for this link.`)
      return
    }
  
    const linkID = this.props.link.id
    await this.props.createVoteMutation({
      variables: {
        userID,
        linkID
      }
    })
  }
}

const CREATE_VOTE_MUTATION = gql`
mutation CreateVoteMutation($userID: ID!, $linkID: ID!) {
  createVote(userID: $userID, linkID: $linkID) {
    id
    link {
      votes {
        id
        user {
          id
        }
      }
    }
    user {
      id
    }
  }
}
`

export default graphql(CREATE_VOTE_MUTATION, {
name: 'createVoteMutation'
})(Link)

