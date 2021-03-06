# vanilla redux

vanilla redux / react redux

#### Provider
``` javascript
import { Provider } from "react-redux";
import store from "./store";

<Provider store={store}>
  <App />
</Provider>
//이와 같은 형태로 하위 컴포넌트에게 스토어 접근을 위해 Provider 사용하여 store를 설정한다.

```

#### Store
``` javascript
//store.js
import { createStore } from "redux"
import { createAction, createReducer, configureStore, createSlice } from "@reduxjs/toolkit";

// createStore

// 스토어를 만들어 reducer를 설정
const store = createStore(render);

// createAction
const addTodo = createAction("ADD");

//redux-toolkit의 createAction을 사용하면 아래 구문을 위에 구문처럼 간편하고 쉽게 쓸수 있다.
const ADD = "ADD";
const addTodo = (text)=> {
    return {
        type: ADD,
        text
    }
}

// createReducer 
const reducer = ( state = [], action )=>{
    switch( action.type ){
        case addTodo.type:
            return [{ text: action.text, id: Date.now() }, ...state ]
        case deleteTodo.type:
            return state.filter( todo=> todo.id !== action.id )
        default:
            return state
    }
}

// 스위치문으로 reducer를 표현햇었는데 redux-toolkit의 createReducer 사용하여 아래처럼 사용할수 있다.
const reducer = createReducer([], {
    [addTodo]: (state, action) => {
        state.push({
            text: action.payload, id: Date.now()
        })
    },
    [deleteTodo]: (state, action) => {
        return state.filter( todo => todo.id !== action.id )
    }
})

// cofigureStore 

// createStore를 redux-toolkit의 configureStore로 대체하여 브라우져 확장프로그램 redux devTool를 사용할수있음
const store = configureStore({ reducer: todo.reducer });

// createSlice 

// redux-toolkit의 createSlice는 name, state, action을 담고있다. 
const todos = createSlice({
    name: "todosReducer",
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push({
                text: action.payload, id: Date.now()
            })
        },
        remove: (state, action) => state.filter( todo => todo.id !== action.payload )
    }
})

```

#### Router
``` javascript
import { HashRouter as Router, Route } from "react-router-dom";
// 라우터 설정
<Router>
  <Route path="/" exact component={Home} ></Route>
  <Route path="/:id" component={Detail} ></Route>
</Router>
```

#### Connect 
``` javascript
//Home.js
import React, { useState } from 'react';
import { connect } from "react-redux";
import { add } from "../store";

// Provider를 통해 store에 접근이 가능하다. connect를 사용하면 된다.
export default connect(mapStateToProps, mapDispatchToProps)(Home);

/*
첫번쨰 인자는 state 값을 가져온다
관행처럼 mapStateToProps라고 네이밍 해주는게 좋다.
두번째 인자는 action을 위한것인데 이것도 역시 네이밍을 mapDispatchToProps로 한다.
import로 가져온 store의 add를 dispatch 해서 기능을 실행한다.
*/

function mapStateToProps(state, ownProps){
    return { todos: state }
}
function mapDispatchToProps(dispatch){
    return {
        addTodo: text => dispatch(add(text)) 
    }
}
```

#### useState 
``` javascript
//Home.js
import React, { useState } from 'react';
import { connect } from "react-redux";
import { add } from "../store";

const [ text, setText ] = useState("");
/*
useState("")로 초기값(text)을 빈값으로 설정해주고
setText(value)로 set 하여 값을 변경하여 text에 다시 반영한다.
*/
```

#### ? Optional Chaining
``` javascript
//Optional Chaining은 새로고침시 state가 사라지는것을 방지 
<h3>{todos?.text}</h3>

```
