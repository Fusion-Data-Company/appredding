import { AlertCircle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  onGoHome?: () => void;
  showHomeButton?: boolean;
  variant?: 'default' | 'inline' | 'page';
}

export function ErrorState({
  title = 'Error',
  message = 'Something went wrong',
  onRetry,
  onGoBack,
  onGoHome,
  showHomeButton = false,
  variant = 'default',
}: ErrorStateProps) {
  if (variant === 'inline') {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>{message}</span>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="ml-4"
              data-testid="button-retry-inline"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if (variant === 'page') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold" data-testid="text-error-title">
              {title}
            </h1>
            <p className="text-muted-foreground" data-testid="text-error-message">
              {message}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <Button onClick={onRetry} data-testid="button-retry">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
            {onGoBack && (
              <Button variant="outline" onClick={onGoBack} data-testid="button-go-back">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            )}
            {showHomeButton && onGoHome && (
              <Button variant="outline" onClick={onGoHome} data-testid="button-go-home">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-4 text-center">
        <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold" data-testid="text-error-title">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground" data-testid="text-error-message">
            {message}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          {onRetry && (
            <Button onClick={onRetry} size="sm" data-testid="button-retry">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          )}
          {showHomeButton && onGoHome && (
            <Button variant="outline" size="sm" onClick={onGoHome} data-testid="button-go-home">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
