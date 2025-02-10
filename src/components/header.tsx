"use client";

import { ArrowRight, HousePlus, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggleMode } from "./theme-mode-toggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full shadow-lg bg-background text-foreground rounded-xl">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="md:flex md:items-center md:gap-12">
            <Link
              className="block text-primary transition hover:text-accent"
              href="/"
            >
              <span className="sr-only">Home</span>
              <HousePlus className="h-8 w-8" />
            </Link>
          </div>
          {/* Desktop Navigation */}

          <nav className="hidden md:flex">
            <ul className="flex items-center gap-6 text-sm border border-accent rounded-xl">
              <li>
                <Link
                  className="relative flex items-center gap-2 text-muted-foreground transition hover:text-accent font-medium 
                   before:absolute before:-bottom-1 before:left-0 before:h-0.5 before:w-0 before:bg-accent 
                   before:transition-all before:duration-300 hover:before:w-full p-2"
                  href="/properties"
                >
                  Explore Properties
                  <ArrowRight
                    className="w-4 h-4 transition-transform ease-in-out group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
              </li>
            </ul>
          </nav>
          {/* Actions (Login/Register + Theme Toggler) */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex sm:gap-4">
              {/* Login Button */}
              <Link
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-card-foreground shadow-md 
                            transition-all duration-300 hover:bg-accent hover:shadow-lg"
                href="#"
              >
                Login
              </Link>
              {/* Register Button */}
              <Link
                className="rounded-md border border-accent px-5 py-2.5 text-sm font-medium text-accent 
                            transition-all duration-300 hover:bg-accent hover:text-card-foreground"
                href="#"
              >
                Join Us
              </Link>
            </div>
            {/* Theme Toggler */}
            <ThemeToggleMode />
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden rounded-sm p-2 text-muted-foreground transition hover:bg-muted"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-card shadow-lg 
              transform transition-transform duration-300 ease-in-out 
              ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col p-4">
          {/* Close Button */}
          <button
            className="self-end rounded-sm bg-muted p-2 text-muted-foreground transition hover:bg-muted/80"
            onClick={toggleMenu}
          >
            <X className="size-5" />
          </button>
          {/* Mobile Navigation */}
          <nav aria-label="Mobile Global">
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  className="block text-muted-foreground transition hover:text-accent"
                  href="/properties"
                  onClick={closeMenu}
                >
                  Explore Properties
                </Link>
              </li>
              <li>
                <Link
                  className="block text-muted-foreground transition hover:text-accent"
                  href="#"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="block text-muted-foreground transition hover:text-accent"
                  href="#"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
