import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

const Spinner = ({ props }) => {
    return (
        <div>
            <Segment style={{
                border: 'none',
                boxShadow: '0 0 0 0 rgba(0,0,0,0)',
                height: '100px',
            }}>
                <Dimmer active inverted>
                    <Loader inverted content='Loading' />
                </Dimmer>
            </Segment>
        </div>
    );
}

export default Spinner;