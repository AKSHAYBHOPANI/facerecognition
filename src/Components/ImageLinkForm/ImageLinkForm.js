import React from 'react';

const ImageLinkForm = ( {onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
            {'This Magic Brain will detect faces in your pictures. Give it a try. '}
            </p>
            <div className='pa4 br3 shadow-5 bg-orange'>
                <input className='f4 pa2 w=70' type='text' onChange={onInputChange}/>
                <button 
                 className='w=30 grow f4 link ph3 pv2 dib white bg-light-purple center'
                 onClick={onButtonSubmit}
               
                >Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;