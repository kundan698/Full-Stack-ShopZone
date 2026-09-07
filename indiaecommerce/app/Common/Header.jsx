"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 border-b
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          isScrolled
            ? "border-gray-200/80 bg-white/90 shadow-lg shadow-black/[0.04] backdrop-blur-xl"
            : "border-gray-200 bg-white"
        }
      `}
    >
      {/* ========================= */}
      {/* Top Offer */}
      {/* ========================= */}

      <div
        className={`
          bg-black px-4 text-center text-xs font-medium text-white
          transition-all duration-500 ease-in-out
          ${
            isScrolled
              ? "max-h-0 overflow-hidden py-0 opacity-0"
              : "max-h-10 py-2 opacity-100"
          }
        `}
      >
        Free Shipping on Orders Above ₹999
      </div>

      {/* ========================= */}
      {/* Main Header */}
      {/* ========================= */}

      <div
        className={`
          mx-auto flex max-w-7xl items-center gap-6 px-4
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isScrolled
              ? "h-14"
              : "h-16"
          }
        `}
      >
        {/* ========================= */}
        {/* Logo */}
        {/* ========================= */}

        <Link
          href="/"
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
          data-testid="logos"
        >
          <div
            className={`
              flex items-center justify-center rounded-lg
              bg-black font-bold text-white
              transition-all duration-500
              ${
                isScrolled
                  ? "h-8 w-8 text-sm"
                  : "h-9 w-9"
              }
            `}
          >
            S
          </div>

          <span 
            className={`
              font-extrabold tracking-tight
              transition-all duration-500
              ${
                isScrolled
                  ? "text-lg"
                  : "text-xl"
              }
            `}
          >
            SHOPZONE
          </span>
        </Link>

        {/* ========================= */}
        {/* Search */}
        {/* ========================= */}

        <div className="hidden flex-1 md:block">
          <div
            className={`
              relative mx-auto max-w-xl
              transition-all duration-500
              ${
                isScrolled
                  ? "scale-[0.97]"
                  : "scale-100"
              }
            `}
          >
            <input
              type="search"
              placeholder="Search products"
              aria-label="Search products"
              data-testid="search-input"
              className={`
                w-full rounded-full border border-gray-200
                bg-gray-50 px-5 pr-12 text-sm outline-none
                transition-all duration-300
                focus:border-black focus:bg-white
                ${
                  isScrolled
                    ? "h-10"
                    : "h-11"
                }
              `}
            />

            <button
              aria-label="Search"
              className="
                absolute right-1.5 top-1/2
                flex h-8 w-8 -translate-y-1/2
                items-center justify-center
                rounded-full bg-black text-white
                transition-all duration-300
                hover:scale-105 hover:bg-gray-800
                active:scale-95
              "
            >
              🔍
            </button>
          </div>
        </div>

        {/* ========================= */}
        {/* Actions */}
        {/* ========================= */}

        <div className="ml-auto flex items-center gap-2">
           <Link
            href="/Pages/login"
            className="
              hidden rounded-lg px-3 py-2 text-sm font-medium
              transition-all duration-300
              hover:bg-gray-100
              sm:block
            "
            data-testid="login-link"
          >
            Login
          </Link>
          {/* Account */}

          <Link
            href="/Pages/register"
            className="
              hidden rounded-lg px-3 py-2 text-sm font-medium
              transition-all duration-300
              hover:bg-gray-100
              sm:block
            "
            data-testid="login-link"
          >
            Register
          </Link>

          {/* ========================= */}
          {/* Wishlist */}
          {/* ========================= */}

          <Link
            href="/Pages/wishlist"
            className="
              hidden rounded-lg p-2 text-xl
              transition-all duration-300
              hover:bg-gray-100
              hover:scale-105
              sm:block
            "
            aria-label="Wishlist"
            
          >
            Wishlist
          </Link>

          {/* ========================= */}
          {/* Cart */}
          {/* ========================= */}

          <Link
            href="/Pages/cart"
            className="
              relative rounded-lg p-2 text-xl
              transition-all duration-300
              hover:bg-gray-100
              hover:scale-105
              active:scale-95
            "
            aria-label="Shopping Cart"
            data-testid="cart-link"
          >
            🛒

            <span
              className="
                absolute -right-1 -top-1
                flex h-5 min-w-5
                items-center justify-center
                rounded-full bg-red-600
                px-1 text-[10px] font-bold text-white
                transition-all duration-300
              "
              data-testid="cart-count"
            >
              0
            </span>
          </Link>

          {/* ========================= */}
          {/* Mobile Menu */}
          {/* ========================= */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              rounded-lg p-2 text-xl
              transition-all duration-300
              hover:bg-gray-100
              active:scale-95
              md:hidden
            "
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
        
      </div>

      {/* ========================= */}
      {/* Desktop Navigation */}
      {/* ========================= */}

      <nav
        className={`
          hidden border-t md:block
          transition-all duration-500
          ${
            isScrolled
              ? "border-gray-200/70"
              : "border-gray-100"
          }
        `}
      >
        <div
          className={`
            mx-auto flex max-w-7xl items-center justify-center
            gap-10 px-4 text-sm font-medium
            transition-all duration-500
            ${
              isScrolled
                ? "h-10"
                : "h-11"
            }
          `}
        >
          <Link
            href="/"
            className="
              transition-colors duration-300
              hover:text-gray-500
            "
          >
            Home
          </Link>

          <Link
            href="/Pages/shop"
            className="
              transition-colors duration-300
              hover:text-gray-500
            "
          >
            Shop
          </Link>

          <Link
            href="/Pages/men"
            className="
              transition-colors duration-300
              hover:text-gray-500
            "
          >
            Men
          </Link>

          <Link
            href="/Pages/women"
            className="
              transition-colors duration-300
              hover:text-gray-500
            "
          >
            Women
          </Link>

          <Link
            href="/Pages/electronics"
            className="
              transition-colors duration-300
              hover:text-gray-500
            "
          >
            Electronics
          </Link>

          <Link
            href="/products?category=offers"
            className="
              font-semibold text-red-600
              transition-all duration-300
              hover:text-red-700
            "
          >
            Offers
          </Link>
        </div>
      </nav>

      {/* ========================= */}
      {/* Mobile Navigation */}
      {/* ========================= */}

      <div
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          md:hidden
          ${
            menuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <nav className="border-t bg-white p-4">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="
                rounded-lg p-3
                transition-colors duration-300
                hover:bg-gray-100
              "
            >
              Home
            </Link>

            <Link
              href="/products"
              className="
                rounded-lg p-3
                transition-colors duration-300
                hover:bg-gray-100
              "
            >
              Shop
            </Link>

            <Link
              href="/products?category=men"
              className="
                rounded-lg p-3
                transition-colors duration-300
                hover:bg-gray-100
              "
            >
              Men
            </Link>

            <Link
              href="/products?category=women"
              className="
                rounded-lg p-3
                transition-colors duration-300
                hover:bg-gray-100
              "
            >
              Women
            </Link>

            <Link
              href="/products?category=electronics"
              className="
                rounded-lg p-3
                transition-colors duration-300
                hover:bg-gray-100
              "
            >
              Electronics
            </Link>

            <Link
              href="/products?category=offers"
              className="
                rounded-lg p-3
                font-semibold text-red-600
                transition-colors duration-300
                hover:bg-gray-100
              "
            > 
              Offers
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}