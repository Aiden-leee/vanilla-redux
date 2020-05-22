import React from 'react';
import { connect } from "react-redux"

function Detail({todos}){
    return (
        <>
            <h3>{todos?.text}</h3>
            <h5>create at: { todos?.id }</h5>
        </>
    )
}

function mapStateToProps(state, ownProps){
    const { match : { params : { id } } } = ownProps;
    return {
        todos: state.find(todo => todo.id === parseInt(id) )
    }
}
export default connect(mapStateToProps)(Detail);