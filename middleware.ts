export { default } from "next-auth/middleware";

export const config = {
  // In pages par jaane ke liye login zaroori hai
  matcher: ["/", "/campus/:path*", "/cart", "/profile", "/orders"],
};