import React from 'react';

import getUrl from './getUrl';

import styles from './Intro.scss';

class Intro extends React.Component {
    render() {
        return (
            <div className={styles.container} >
                <h2>Ever wanted to find out who <strong>that</strong> guy is?</h2>
                <getUrl/>
            </div>
        )
    }
}

export default Intro;