import Input from 'react-toolbox/lib/input';
import React from 'react';

import styles from './getUrl.scss';

class getUrl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: null
        }
    };

    handleChange(name, value) {
        this.setState({ ...this.state, [name]: value });
    };

    render() {
        return (
            <form id="picUrl" onSubmit={this.onSubmit}>
                <Input 
                    type="text"
                    label="URL"
                    value={this.state.url}
                    onChange={this.handleChange.bind(this, 'url')}
                    icon={<span>J</span>}
                />
            </form>
        )
    }
}

export default getUrl;