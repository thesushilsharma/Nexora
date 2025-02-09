"use client";

import { HousePlus, Menu, X } from "lucide-react";
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
        <header className="w-full shadow-dual-muted rounded-xl">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="md:flex md:items-center md:gap-12">
                        <Link
                            className="block text-primary transition hover:text-destructive"
                            href="/"
                        >
                            <span className="sr-only">Home</span>
                            <HousePlus className="h-8 w-8" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link
                                        className="transition hover:text-primary font-medium text-foreground"
                                        href="/properties"
                                    >
                                        Explore Properties
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Actions (Login/Register + Theme Toggler) */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex sm:gap-4">
                            {/* Login Button */}
                            <Link
                                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md hover:bg-destructive transition-all duration-300"
                                href="#"
                            >
                                Login
                            </Link>

                            {/* Register Button */}
                            <div className="hidden sm:flex">
                                <Link
                                    className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground hover:text-foreground hover:bg-destructive transition-all duration-300"
                                    href="#"
                                >
                                    Join Us
                                </Link>
                            </div>
                        </div>

                        {/* Theme Toggler */}
                        <ThemeToggleMode />

                        {/* Mobile Menu Toggle */}
                        <div className="block md:hidden">
                            <button
                                className="rounded-sm p-2 transition hover:bg-muted"
                                onClick={toggleMenu}
                            >
                                {isMenuOpen ? (
                                    <X className="size-5 text-foreground" />
                                ) : (
                                    <Menu className="size-5 text-foreground" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-64 bg-card shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col p-4">
                    {/* Close Button */}
                    <button
                        className="self-end rounded-sm bg-muted p-2 text-foreground transition hover:bg-accent"
                        onClick={toggleMenu}
                    >
                        <X className="size-5" />
                    </button>

                    {/* Mobile Navigation */}
                    <nav aria-label="Mobile Global">
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link
                                    className="block text-primary transition hover:text-destructive"
                                    href="/properties"
                                    onClick={closeMenu}
                                >
                                    Explore Properties
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="block text-primary transition hover:text-destructive"
                                    href="#"
                                    onClick={closeMenu}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="block text-primary transition hover:text-destructive"
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
