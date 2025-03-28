import React, { useState } from 'react';

const APIForm = ({ fetchVideos }) => {
    return (
        <div className='form-container'>
            <button className='button' onClick={fetchVideos}>
                Discover Video
            </button>
        </div>
    );
};

export default APIForm;