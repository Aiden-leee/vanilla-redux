import { createStore } from 'redux'

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD";
const DELETE_TODO = "DELETE";

const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

const reducer = (state = [], action)=> {
    switch (action.type){
      case ADD_TODO:
        return [...state, { text: action.text, id: Date.now() } ];
      case DELETE_TODO:
        return state.filter( todo => todo.id !== action.id  );
      default:
        return state;
    }
}
const store = createStore(reducer);

const dispatchAddToDo = text => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintTodos = ()=>{
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach( todo =>{
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  })
}

store.subscribe(()=> console.log( store.getState() ))

store.subscribe(paintTodos)

const onSubmit = e=> {
  e.preventDefault();
  const value = input.value;
  input.value = "";
  dispatchAddToDo(value);
}

form.addEventListener("submit", onSubmit)