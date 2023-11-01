import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect to homepage when unsubscribe is hit without a token
  if (request.nextUrl.pathname === '/unsubscribe') {
    const token = request.nextUrl?.searchParams.get('token');
    if (!token) {
      return NextResponse.redirect(`${request.nextUrl.origin}/`);
    }
  }
}
