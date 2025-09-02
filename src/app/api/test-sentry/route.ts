import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export async function GET(_request: NextRequest) {
  try {
    // Test Sentry integration
    console.log('Testing Sentry integration...');

    // Send a test message to Sentry
    Sentry.addBreadcrumb({
      message: 'Sentry integration test',
      category: 'test',
      level: 'info',
    });

    // Capture a test message
    Sentry.captureMessage('Sentry integration test message', 'info');

    // Check connectivity - removed diagnoseSdkConnectivity as it's not available in server environment

    return NextResponse.json({
      success: true,
      message: 'Sentry test completed successfully',
      sentryInitialized: true,
      traceId: Sentry.getCurrentScope().getPropagationContext().traceId,
    });
  } catch (error) {
    console.error('Sentry test error:', error);
    Sentry.captureException(error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
