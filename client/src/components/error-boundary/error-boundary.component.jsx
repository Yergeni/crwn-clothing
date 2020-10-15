import React from 'react';
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from './error-boundary.styles';

import './error-boundary.styles.css';

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasError: false
        }
    }

    // IMPORTANT: Unique method for error boundary
    // Catches any error that a children of the wrap components thrown and passes to this unique function
    static getDerivedStateFromError(error) {
        // process the error
        return { hasError: true }
    }
    
    // Catches exceptions generated in descendant components. Unhandled exceptions will cause the entire component tree to unmount.
    componentDidCatch(error, info) {
        console.log(error)
    }

    render()
    {
        // return some component if an error was captured
        if (this.state.hasError) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl="https://i.imgur.com/lKJiT77.png" />
                    <ErrorImageText>Sorry a dog ate this page</ErrorImageText>
                </ErrorImageOverlay>
            )
            // <div className="error_general">
            //     <h1>Oops!</h1>
            //     <h3>Something went wrong.</h3>
            // </div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
