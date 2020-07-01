import React, {Component} from 'react';

class HobbyList extends Component{
    render(){
      const style = {fontSize: '1.5em'};
      const hobbies = ['Sleeping', 'Eating', 'Cuddling'];
      return (
        <ul>
          {hobbies.map((h, i) => {
            return <li key={i} style={style}>{h}</li>
          })}
        </ul>
        );
    }
  }

  export default HobbyList