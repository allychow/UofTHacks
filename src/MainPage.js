import React from 'react';

import styles from './MainPage.scss';

import Intro from './components/Intro';

class Component extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                <Intro />
            </div>
        );
    }
}

export default MainPage;