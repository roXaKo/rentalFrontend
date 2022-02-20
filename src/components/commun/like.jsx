import React, { Component } from "react";

class Like extends Component {
  getLike = () => {
      let classes ="fa btn fa-heart"
      classes += !this.props.elem.liked? "-o":""
      return classes
  };

  render() {
    return <i className={this.getLike()} onClick={()=>this.props.onLike(this.props.elem)} />;
  }
}

export default Like;
