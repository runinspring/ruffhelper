/**新建项目*/
import React from 'react';
import {connect} from 'react-redux';
import {tr} from '../../../lib/Utils'
import {sendCommand,addOutputCooked} from '../../../actions/AppActions.jsx';
class NewProject extends React.Component {
    constructor(props) {
        super(props)
    }

    onCreateNewProject(){
        var self = this;
        var package080 = {
            'project name:':'jefftest',
            'version:':'0.2.0',
            'description:':' ',
            'author:':' '
        }
        var rapPackage = package080;

        sendCommand('rap init',function(){
            addOutputCooked('<b style="color:red">' + tr(201,'[jefftest]') + '</b><br>')
            //self.props.addOutPut('<b style="color:red">' + tr(201,'jefftest') + '</b><br>');//201 创建项目完成：
        },'D:\\ls123',rapPackage)
    }
    render() {
        //console.log(123,this.props.config)
        //console.log(123123)
        return (
            <div>
                <div>新建项目</div>
                <button>选择文件夹</button>
                <button onClick={this.onCreateNewProject.bind(this)}>新建项目</button>
                <div>-----------------</div>
            </div>
        )
    }
}
function select(state) {
    return {
        config: state.config
    }
}
export default connect(select)(NewProject);
