import React from 'react';
import './style.scss'

const blockName = 'gist';

const Forks = (props) => {
    return props.forks.map(fork => 
            <div className={`${blockName}__forks`}>
                <img className={`${blockName}__forks--image`}
                    src={fork.owner.avatar_url}
                    alt={''}
                />
                <p className={`${blockName}__forks--text`}>{fork.owner.login}</p>
            </div>
        )
}

const Gist = props => {
        return (
            <div className={blockName}>
                <div className={`${blockName}__header`}>
                    {props.url && (
                        <p className={`${blockName}__url`}>
                            {props.url}
                        </p>
                    )}

                    {props.tag && (
                        <p className={`${blockName}__tag`}>
                            {props.tag}
                        </p>
                    )}
                </div>
                <div className={`${blockName}__sub-header`}>
                    <p>Last Three Forks</p>
                    {props.lastThreeForks.length && (
                        <Forks forks={props.lastThreeForks}/>
                    )}
                </div>
            </div>
        )
}

export default Gist;