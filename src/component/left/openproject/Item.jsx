import React, {PropTypes} from 'react';
export default class Item extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //初始化渲染执行之后立刻调用
    }

    componentDidUpdate(prevProps) {
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }

    render() {
        return (
            <div>
                11
            </div>
        )
    }
}