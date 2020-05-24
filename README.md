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
