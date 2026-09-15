'use client';

import React, { useEffect } from 'react';

interface ErrorBoundaryProps {
    error: Error;
    reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps): React.ReactElement {
    useEffect(() => {
        console.error('[HomePage] Unhandled error:', error);
    }, [error]);

    return (
        <div
            className="w-100 d-flex flex-column align-items-center justify-content-center gap-3"
            style={{ minHeight: '60vh' }}
        >
            <h2 className="h4">Something went wrong</h2>
            <p className="text-muted">We couldn&apos;t load the page content. Please try again.</p>
            <button type="button" className="btn btn-primary" onClick={reset}>
                Try again
            </button>
        </div>
    );
}