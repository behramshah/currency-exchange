import React from 'react';

export default function Header(props) {

    const { rates } = props;
    
  return (
    <div>
        <h1>{rates}</h1>
    </div>
  );
}
