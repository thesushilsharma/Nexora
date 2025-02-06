"use client";

import { HousePlus, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="w-full shadow-md">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link className="block text-blue-600 dark:text-blue-600" href="/" onClick={closeMenu}>
                            <span className="sr-only">Home</span>
                            <HousePlus className="h-8 w-8" />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link
                                        className="text-blue-500 transition hover:text-blue-500/75 dark:text-white dark:hover:text-white/75"
                                        href="/properties"
                                    >
                                        Explore Properties
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex sm:gap-4">
                            <Link
                                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-blue-500"
                                href="#"
                            >
                                Login
                            </Link>

                            <div className="hidden sm:flex">
                                <Link
                                    className="rounded-md bg-blue-100 px-5 py-2.5 text-sm font-medium text-blue-600 dark:bg-blue-800 dark:text-white dark:hover:text-white/75"
                                    href="#"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>

                        <div className="block md:hidden">
                            <button
                                className="rounded-sm bg-blue-100 p-2 text-blue-600 transition hover:text-blue-600/75 dark:bg-blue-800 dark:text-white dark:hover:text-white/75"
                                onClick={toggleMenu}
                            >
                                {
                                    isMenuOpen ? (
                                        <X className="size-5" />
                                    ) : (
                                        <Menu className="size-5" />
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col p-4">
                    <button
                        className="self-end rounded-sm bg-blue-100 p-2 text-blue-600 transition hover:text-blue-600/75 dark:bg-blue-800 dark:text-white dark:hover:text-white/75"
                        onClick={toggleMenu}
                    >
                        <X className="size-5" />
                    </button>

                    <nav aria-label="Mobile Global">
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link
                                    className="block text-blue-500 transition hover:text-blue-500/75 dark:text-white dark:hover:text-white/75"
                                    href="/properties"
                                    onClick={closeMenu}
                                >
                                    Explore Properties
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="block text-blue-500 transition hover:text-blue-500/75 dark:text-white dark:hover:text-white/75"
                                    href="#"
                                    onClick={closeMenu}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="block text-blue-500 transition hover:text-blue-500/75 dark:text-white dark:hover:text-white/75"
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