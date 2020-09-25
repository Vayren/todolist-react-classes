import React from 'react';
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as bookMarkFull } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as bookMarkBorder } from '@fortawesome/free-regular-svg-icons';

class Priority extends React.Component {

    state = {
        priorityIcons: [
            { id: uniqid(), status: false, priority: 'default' },
            { id: uniqid(), status: false, priority: 'high' },
            { id: uniqid(), status: false, priority: 'medium' },
            { id: uniqid(), status: false, priority: 'low' }
        ]
    }

    componentDidMount() {
        this.setDefaultPriority(this.props.defaultPriority);
    }

    setDefaultPriority = priority => {
        this.setState(this.state.priorityIcons.map(icon => {
            if (icon.priority === priority) icon.status = true;
            return icon;
        }))
    }

    toggleIcon = id => {
        this.setState(this.state.priorityIcons.map(icon => {
            if (icon.id === id) {
                icon.status = true;
                this.props.setPriority(icon.priority);
            }
            else icon.status = false;
            return icon;
        }));
    }

    renderIcons = () => {
        return (
            this.state.priorityIcons.map((icon, index) => {
                return (
                    <div className={`priority-icon priority-icon--${icon.priority}`} onClick={() => this.toggleIcon(icon.id)} key={index}>
                        <FontAwesomeIcon icon={icon.status ? bookMarkFull : bookMarkBorder} />
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className={`priority-select priority-select--${this.props.sizeClass}`}>
                {this.renderIcons()}
            </div>
        )
    }
}

export default Priority;

