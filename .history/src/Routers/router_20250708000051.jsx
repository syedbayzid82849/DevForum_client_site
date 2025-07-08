import React from 'react';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
    {
        path: "/",
        element: <div className='te'>Hello World</div>,
    },
]);

export default router;