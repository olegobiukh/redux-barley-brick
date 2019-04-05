import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

import "./styles/main.scss";

import App from "./App";
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
const winCombo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];

function shuffleArr(arr) {
  let newArr = arr;
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return newArr;
}

const initialItems = shuffleArr(array);

const setArrayImmutable = (items, index = null, value, empty) => {
  let newArr = [];
  if (index === empty + 4) {
    newArr = Object.assign([...items], { [empty + 4]: "" }, { [empty]: value });
  } else if (index === empty - 4) {
    newArr = Object.assign([...items], { [empty - 4]: "" }, { [empty]: value });
  } else if (index === empty + 1) {
    newArr = Object.assign([...items], { [empty + 1]: "" }, { [empty]: value });
  } else if (index === empty - 1) {
    newArr = Object.assign([...items], { [empty - 1]: "" }, { [empty]: value });
  }

  return newArr;
};

function getWinner(items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i] !== winCombo[i]) return false;
  }

  return true;
}

const reducer = (state = { items: array, start: false }, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      const { index, value } = action;
      const { items } = state;
      const empty = items.indexOf("");

      const newItems = setArrayImmutable(state.items, index, value, empty);
      const isWinner = getWinner(items);
      return {
        ...state,
        items: Object.assign([...state.items], newItems),
        start: !isWinner
      };
    case "GET_STARTED":
      return {
        ...state,
        items: Object.assign([...state.items], initialItems),
        start: true
      };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools());

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
