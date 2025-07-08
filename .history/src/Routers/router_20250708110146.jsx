import React from 'react';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout,
    },
]);

export default router;