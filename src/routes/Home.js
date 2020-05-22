import React, { useState } from 'react';
import { connect } from "react-redux";
// import { actionCreators } from "../store";
import { add } from "../store";
import Todo from "../components/Todo";


function Home({ todos, addTodo }){
    const [ text, setText ] = useState("");
    const onChange = (e) =>{
        setText(e.target.value);
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        addTodo(text)
        setText('')
    }
    return (
        <>
            <h1>To do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="write your To do" value={text} onChange={onChange}/>
                <button type="button">ADD</button>
            </form>
            <ul>{todos.map( (todo, idx) => <Todo {...todo} key={todo.id} /> )}</ul>
        </>
    )   
}

function mapStateToProps(state, ownProps){
    return { todos: state }
    // console.log( state, ownProps)
}

function mapDispatchToProps(dispatch){
    return {
        addTodo: text => dispatch(add(text)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);