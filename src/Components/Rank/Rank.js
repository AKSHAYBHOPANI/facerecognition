import React from 'react';

const Rank = ({ name, entries }) => {
    return (
<div>
        <div className='white f3 b'>
          {`Hello ${name}, your current rank is...`}
        </div>
        <div className='white f2 b i '>
          {entries}
         </div>
         </div>
    );
}

export default Rank;
