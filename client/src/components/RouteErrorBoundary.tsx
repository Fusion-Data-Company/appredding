import { Component, ReactNode } from 'react';
import { errorHandler } from '@/utils/error-handler';
import { ErrorState } from '@/components/ui/error-state';

interface Props {
  children: ReactNode;
  routePath?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    const routeContext = this.props.routePath ? ` on route ${this.props.routePath}` : '';
    errorHandler.reportManualError(
      `Route Error${routeContext}: ${error.message}\nComponent Stack: ${errorInfo.componentStack}`,
      'js_error'
    );
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  handleGoHome = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    window.location.href = '/';
  };

  handleGoBack = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title="Page Error"
          message={this.state.error?.message || 'This page encountered an error'}
          onRetry={this.handleRetry}
          onGoBack={this.handleGoBack}
          onGoHome={this.handleGoHome}
          showHomeButton={true}
        />
      );
    }

    return this.props.children;
  }
}
