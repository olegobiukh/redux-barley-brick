import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

function App({ items, start, setItems, getStarted }) {
  const itemClasses = classNames({
    Game__Item: true,
    winner: !start
  });

  const emptyClasses = classNames({
    start: !start,
    start__false: start
  });

  return (
    <div className="App">
      <div className="Game">
        {items.map((item, i) => {
          if (item === "") {
            return (
              <div
                key={i}
                className={emptyClasses}
                onClick={() => getStarted()}
              >
                {item}
              </div>
            );
          } else {
            return (
              <div
                key={i}
                className={itemClasses}
                onClick={() => setItems(i, item)}
              >
                {item}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

const mapStateToProps = ({ items, start }) => ({
  items,
  start
});

const mapDispatchToProps = dispatch => ({
  setItems(index, value) {
    dispatch({
      type: "SET_ITEMS",
      index,
      value
    });
  },
  getStarted() {
    dispatch({
      type: "GET_STARTED",
      start: true
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
