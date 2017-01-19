import React from 'react';
import { connect } from 'react-redux';
import OpenProject from './left/C2_OpenProject';
import RapCommand from './left/C1_RapCommand';
import LeftContainer from './left/LeftContainer';
import NewProject from './left/C3_NewProject';
import { tr } from '../lib/Utils';
class TestUI extends React.Component {
    constructor(props) {
        super(props);

    }
    // <NewProject clumId={3} />
    render() {
        return (
            <div>

                <LeftContainer header={tr(3)} clumId={3}>
                    <NewProject clumId={3} />
                </LeftContainer>
                <LeftContainer header={tr(2)} clumId={2}>
                    <OpenProject clumId={2} />
                </LeftContainer>
            </div>
        )
    }
}

function select(state) {
    return {
        config: state.config
    }
}
export default connect(select)(TestUI);
