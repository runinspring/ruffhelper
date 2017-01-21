import React from 'react';
import ReactDOM from 'react-dom';
import appreducer from './reducers/Reducers.jsx';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
// import {AppRouter} from './Router.jsx';
let store = createStore(appreducer);
import MainShell from './component/MainShell.jsx';
import Loading from './component/Loading.jsx';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadEnd: false,
            showLoading: true
        }
        //testing
    }
    /**主场景*/
    onLoadEnd() {
        // console.log('loadEnd',this)
        this.setState({loadEnd: true})
        setTimeout(()=>{
            this.setState({showLoading:false})
        },1100)
    }

    render() {
        var self = this;
        //console.log('main.render:',this.props);
        var hei = document.documentElement.clientHeight;

        var getLoading = function () {
            if (self.state.showLoading) {
                return <Loading loadEndCallback={self.onLoadEnd.bind(self)}/>
            } else {
                return <div/>
            }
        }
        return (
            <div className="unselectable" style={{height: hei}}>
                <Provider store={store}>
                    <div>
                        {/*<AppRouter/>*/}
                        <MainShell loadEnd={this.state.loadEnd}/>
                        {getLoading()}
                    </div>
                </Provider>
            </div>
        )
    }
}
ReactDOM.render(<Main/>, document.getElementById('app'));

//
