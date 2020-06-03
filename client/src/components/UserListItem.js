import React from 'react';
import PersonIcon from '@material-ui/icons/Person';

export default function UserListItem(props) {
    return (
        <div className={'user-list-item ' + (props.currentTurn ? 'current-turn' : '')}>
            <PersonIcon style={{ fontSize: 25 }} />
            <span title={props.userName}>{props.userName}</span>
        </div>
    )
}