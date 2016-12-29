/**选择器*/
import React from 'react';
// import {connect} from 'react-redux';
import {Radio} from 'antd';
import {tr} from '../../lib/Utils';
import {closeAlert} from '../../actions/AppActions.jsx';
const RadioGroup = Radio.Group;
export default class Selecter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select:0,
            value:""

        }
    }
    componentDidMount(){
        this.setState({value:document.getElementById("select0").innerHTML})
    }
    componentDidUpdate(next){

    }
    getSelecters(){
        // marginRight:"20px",
        const radioStyle = { display: 'block', height: '30px', lineHeight: '30px' };
        const wordStyle = { position: "absolute", top: '0px', left: '15px',width:"305px",
        overflow:"hidden",textOverflow:"ellipsis" }
        // console.log("this.props.item.data.items.map",this.props.item.data.items)
        return this.props.item.data.items.map(function (item,index) {
            // return <Radio style={radioStyle} key={'select'+index} value={index}><div style={wordStyle}>{item}</div></Radio>
            return <Radio style={radioStyle} key={'select'+index} value={index}><div id={"select"+index} style={wordStyle}>{item}</div></Radio>
        });
    }
    render() {
        var self = this;
        var datas = this.props.item.data;
        // console.log("select:",this.state)
        //tr 12确定 13取消
        return(
            <div className="alertPanel">
                <div className="alertItem alertInput" style={{textAlign:'center',width:"350px",height:"100%",padding:'10px 10px 10px 10px'}}>
                    {datas.title}
                    <div style={{textAlign:'left'}}>
                        <RadioGroup value={this.state.select} onChange={(e)=>{
                            var id =  e.target.value;
                            self.setState({select:id,value:document.getElementById("select"+id).innerHTML})
                        }}>
                            {self.getSelecters()}
                        </RadioGroup>
                    </div>
                    <button className="btnBlue" style={{width:60}} onClick={()=>{
                    // console.log(12312,self.props.item)
                        self.props.item.callback(self.state);
                        closeAlert(self.props.index);//关闭面板
                    }}>{tr(12)}</button>
                </div>
            </div>
        )
    }
}
// style={{padding:"0 20px 0 0"}}
// style={{margin:"0 0 20px 0"}}
//item 的数据结构为 {title:'标题',items:[选择的数组]}
Selecter.propTypes = {
    index: React.PropTypes.number.isRequired,
    item: React.PropTypes.object.isRequired,
}