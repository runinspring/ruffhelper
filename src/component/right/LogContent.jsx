import React, {PropTypes} from 'react';
export default class LogContent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div style={{display:'block'}}>
                <div className="content selectable" style={{color:this.props.content.color}}>
                    {this.props.content.value}
                </div>
            </div>
        )
    }
}
LogContent.propTypes = {
    content: PropTypes.object.isRequired,//顶部的文字
}