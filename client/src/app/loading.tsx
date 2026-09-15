import React from 'react';

export default function Loading(): React.ReactElement {
    return (
        <div
            className="w-100 d-flex align-items-center justify-content-center"
            style={{ minHeight: '60vh' }}
        >
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading homepage...</span>
            </div>
        </div>
    );
}