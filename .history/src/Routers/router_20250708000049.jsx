import React from 'react';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
    {
        path: "/",
        element: <div className=''>Hello World</div>,
    },
]);

export default router;