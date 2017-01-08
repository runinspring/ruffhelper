import React from 'react';
import {connect} from 'react-redux';
import LogContent from './right/LogContent';
class RightArea extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidUpdate() {
        this.setPositionAtBottom();
    }
    /**定位到最下面一行*/
    setPositionAtBottom() {
        // console.log(this.refs.logArea)
        // if (!this.state.autoLog) return;
        // var logArea = this.refs.logArea;
        var logArea = document.getElementById("logArea");
        logArea.scrollTop = logArea.scrollHeight;
        // console.log(111,logArea.scrollHeight)
        // var ex = document.getElementById("rapLogArea");//定位到最下面一行
        // ex.scrollTop = ex.scrollHeight;
    }
    // getWord(){
    //     var word='s'
    //     for(var i=0,len=Math.floor(Math.random()*100);i<len;i++){
    //         word += Math.floor(Math.random()*10)
    //     }
    //     return word;
    // }
    // getTest(){
    //     var datas = [];
    //     var self = this;
    //     // var value = '212dsafsdfdsafsdfdsafsdfdsafsdfdsafsdfdsafsdf212dsafsdfdsafsdfdsafsdfdsaf'
    //     for(var i=30;i<62;i++){
    //         // value += 'dd'+i;
    //         datas.push(self.getWord());
    //     }
    //     return datas.map((item,idx)=>{
    //         return <div key={'log'+idx} style={{display:'block'}}>
    //             <div className="content selectable">
    //                 {item}
    //             </div>
    //
    //         </div>
    //     })
    // }
    getLogContent(){
        return this.props.logContent.map((item,index)=>{
            return <LogContent key={'log'+index} content={item}/>
        })
    }
    // getTest(){
    //     console.log(document.getElementById("logArea").scrollTop)
    // }

    render() {
        return (
            <div className="absolute right">
                <div id="logArea" className="logArea">
                    {this.getLogContent()}
                </div>
            </div>
        )
        // console.log('rightArea')
        // console.log('this.state.tabKey',this.state.tabKey)
    }
}

function select(state) {
    return {
        config: state.config,
        logContent:state.logContent
    }
}
export default connect(select)(RightArea);
