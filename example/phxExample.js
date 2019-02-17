import { Store, inject } from '../src';
import React from 'react';
import ReactDOM from 'react-dom';

/* TODO
1. model异步获取如何绑定VM
2. 模块之间通信
*/

// 外部输入参数
const inputData = {
  num:1,
  str:'example',
  root:{
    fatherNode:{
      childNode:{
        node:5
      }
    }
  },
  array:[
    {key:'A',val:3},
    {key:'B',val:4}
  ]
};

const phxA = new Phoenix('moduleA');


// 实例化Model后,生成一个Observable对象
phxA.Model({
  model:inputData,
  effects: {
    * fetchUser({ payload: id }, { call, put }) {
      const user = yield call(fetchUser, id);
      yield put({ type: 'saveUser', payload: user });
    },
  },
  subscriptions: {
    keyEvent({dispatch}) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'add'}) });
    },
  }
});  

// 实例化ViewModel后,生成的VM对象用于组件内的渲染与事件
phxA.ViewModel(
  {
    state:{
      'count':() => {
        return phxA.MODEL.array[0].val;
      },
      'result':()=>{
        return phxA.MODEL.root.fatherNode.childNode.node>this.count?true:false;
      }
    },
    actions:{
      // payload 需要传递的信息
      add(state,payload){
        state.count++;
      },
      // payload 需要传递的信息
      minus(state,payload){
        state.count--;
      },
      asyncAdd () {
        setTimeout(() => {
          this.add;
        }, 500)
      },
      compare(state){
        state.result?'Y':'N';
      }
    }
  }
);

@phxA.inject()
class App extends React.Component {
  render () {
    
    const { state,actions,dispatch } = phxA.VIEW_MODEL;
    const { count,result } = state;

    return (<Wrapper>
      <span>{count}</span>
      <span>{result}</span>
      <div>
        <button onClick={() => dispatch(actions.add)}>add</button>
        <button onClick={() => dispatch(actions.minus)}>minus</button>
        <button onClick={() => dispatch(actions.asyncAdd)}>async</button>
        <button onClick={() => dispatch(actions.compare)}>async</button>
      </div>
    </Wrapper>);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));