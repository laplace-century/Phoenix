import { Store, inject } from '../src';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 60%;
  margin: 100px auto;
  text-align: center;
  span {
    font-size: 23px;
  }
  button {
    margin: 20px 10px;
    padding: 5px 10px;
    background: #fff;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
  }
`

const app1 = new ViewModel({
  nameSpace:'A',
  model: {
    treeObj: {},
    treeObj2:{}
  },
  actions: {
    add,
    minus,
    asyncAdd
  }
});

const app2 = new ViewModel({
  nameSpace:'B',
  model: {
    treeObj: {}
  },
  actions: {
    add,
    minus,
    asyncAdd
  },
  subs:{
    Achange()=>{
      model[treeObj]
    }
  }
});

add (state, payload) {
  const { count } = state
  state.set('count', count + 1)
},
minus (state, payload) {
  const { count } = state
  state.set('count', count - 1)
},
asyncAdd () {
  setTimeout(() => {
    this.dispatch('add')
  }, 500)
}

@inject(store)
class App extends React.Component {
  render () {
    const { count } = this.store.state
    const { dispatch } = this.store

    return (<Wrapper>
      <span>{count}</span>
      <div>
        <button onClick={() => dispatch('add')}>add</button>
        <button onClick={() => dispatch('minus')}>minus</button>
        <button onClick={() => dispatch('asyncAdd')}>async</button>
      </div>
    </Wrapper>);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));