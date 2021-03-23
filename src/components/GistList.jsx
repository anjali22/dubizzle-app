import React, { Component } from 'react';
import Gist from './Gist';

export default class GistList extends Component {

    getGistTag = (gist) => {
        if(gist.files) {
            const fileDetails = Object.values(gist.files);
            return fileDetails[0].language;
        } else return null
    }

    renderUserGists = (userGists) => {
        return userGists.map((gist) => 
            <Gist 
                tag={this.getGistTag(gist)}
                url={gist.url}
                lastThreeForks={gist.lastThreeForks}
            />
        )
    }

    render() {
        const { userGists } = this.props;
        return (
            <div>
                {userGists.length > 0 && this.renderUserGists(userGists)}
            </div>
        )
    }
}