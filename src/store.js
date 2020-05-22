import { createStore } from "redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { createAction, createReducer, configureStore, createSlice } from "@reduxjs/toolkit";

/*
const addTodo = createAction("ADD");
const deleteTodo = createAction("DELETE");
const reducer = createReducer([], {
    [addTodo]: (state, action) => {
        state.push({
            text: action.payload, id: Date.now()
        })
    },
    [deleteTodo]: (state, action) => {
        return state.filter( todo => todo.id !== action.id )
    }
})*/

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

console.log( todos )
const store = configureStore({ reducer: todos.reducer })

export const { add, remove } = todos.actions;

/* redux toolkit 로 대체

const ADD = "ADD";
const DELETE = "DELETE";

const addTodo = (text)=> {
    return {
        type: ADD,
        text
    }
}

const deleteTodo = id =>{
    return {
        type: DELETE,
        id : parseInt(id)
    }
}

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
const store = createStore(reducer);

export const actionCreators = {
    addTodo,
    deleteTodo
}
*/

export default store;