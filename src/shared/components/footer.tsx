import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-bold text-gray-900">ShawnShop</h3>
            <p className="mt-2 text-sm text-gray-600">
              Your one-stop shop for everything you need.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Shop</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-blue-600">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Account</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-gray-600 hover:text-blue-600">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Support</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <span className="text-sm text-gray-600">support@shawnshop.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ShawnShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
