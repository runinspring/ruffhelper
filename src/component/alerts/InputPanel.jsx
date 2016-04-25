import React from 'react';
import {connect} from 'react-redux';
import {tr} from '../../lib/Utils';
import {closeAlert} from '../../actions/AppActions.jsx';
class InputPanel extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        var self = this;
        return (
            <div className="alertPanel">
                    <div className="alertItem">
                        <div >234234</div>
                        <button onClick={()=>{closeAlert(self.props.index)}}/>
                    </div>
            </div>
        )
    }
}

//style={{animation:'loadIn 3s'}}
function select(state) {
    return {
        osType: state.config.osType
    }
}
InputPanel.propTypes = {
    index: React.PropTypes.number.isRequired
}
export default connect(select)(InputPanel);