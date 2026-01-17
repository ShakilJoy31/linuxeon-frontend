import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./types/apiError";
import { appConfiguration } from "./utils/constant/appConfiguration"; // import করুন

export async function middleware(request: NextRequest) {
  // ✅ Correct token name - appConfiguration.appCode ব্যবহার করুন
  const tokenName = `${appConfiguration.appCode}token`;
  const token = request?.cookies.get(tokenName)?.value;
  console.log("Token name:", tokenName, "Token exists:", !!token);

  if (!token) {
    return redirectToLogin(request);
  }

  // Verify and decode token
  let user;
  try {
    user = jwtDecode(token);
    console.log("User role:", user?.role);
  } catch (error) {
    const err = error as ApiError;
    console.error("Token decode error:", err);
    return redirectToLogin(request);
  }

  const path = request.nextUrl.pathname;
  console.log("Current path:", path);

  // Role-based checks
  if (path.startsWith("/proyojon-admin-portal")) {
    if (user?.role === "SUPER_ADMIN" || user?.role === "ADMIN") {
      return NextResponse.next();
    }
    return redirectToAdminLogin(request);
  }

  if (path.startsWith("/proyojon-seller-portal")) {
    if (user?.role === "SELLER") {
      return NextResponse.next();
    }
    return redirectToSellerLogin(request);
  }

  if (path.startsWith("/profile")) {
    if (user?.role === "USER") {
      return NextResponse.next();
    }
    return redirectToUserLogin(request);
  }

  // ✅ Allow other routes that don't need specific role
  return NextResponse.next();
}

// Redirect functions (same as before)
function redirectToLogin(request: NextRequest) {
  const callbackUrl = request.nextUrl.pathname + request.nextUrl.search;
  const loginUrl = new URL('/auth', request.url);
  
  // URL searchParams ব্যবহার করে safer way-তে callbackUrl set করুন
  loginUrl.searchParams.set('callbackUrl', callbackUrl);
  
  console.log("🔗 Redirecting to:", loginUrl.toString());
  return NextResponse.redirect(loginUrl);
}

function redirectToAdminLogin(request: NextRequest) {
  const callbackUrl = request.nextUrl.pathname + request.nextUrl.search;
  return NextResponse.redirect(
    new URL(`/proyojon-admin-auth/admin-login?callbackUrl=${encodeURIComponent(callbackUrl)}`, request.url)
  );
}

function redirectToSellerLogin(request: NextRequest) {
  const callbackUrl = request.nextUrl.pathname + request.nextUrl.search;
  return NextResponse.redirect(
    new URL(`/seller-auth?callbackUrl=${encodeURIComponent(callbackUrl)}`, request.url)
  );
}

function redirectToUserLogin(request: NextRequest) {
  const callbackUrl = request.nextUrl.pathname + request.nextUrl.search; // ✅ searchও যোগ করুন
  return NextResponse.redirect(
    new URL(`/auth?callbackUrl=${encodeURIComponent(callbackUrl)}`, request.url) // ✅ callbackUrl parameter ঠিক করুন
  );
}

export const config = {
  matcher: [
    "/checkout", 
    "/profile/:path*",
  ],
};