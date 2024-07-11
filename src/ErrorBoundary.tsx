import React, { ReactNode } from "react";

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      message: error,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.errorUi) {
        return this.props.errorUi;
      } else {
        return <h3>{this.state.message}</h3>;
      }
    } else {
      return this.props.children;
    }
  }
}

interface ErrorBoundaryProps {
  errorUi?: React.ReactNode;
  children?: ReactNode; // Include children in the props interface
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export default ErrorBoundary;
