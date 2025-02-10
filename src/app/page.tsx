import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import { SearchForm } from '@/components/search-form'
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:px-20 font-[family-name:var(--font-geist-sans bg-gradient-to-br from-background via-muted to-accent"
    >
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section>
          <SearchForm />
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:items-center md:gap-10">
              {/* Hero Image Section */}
              <div className="md:col-span-3">
                <Image
                  src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Hero Image"
                  width={700}
                  height={300}
                  className="rounded-xl shadow-2xl"
                />
              </div>
              {/* Call-to-Action Card */}
              <div className="md:col-span-1">
                <div className="max-w-lg md:max-w-none">
                  <div className="flex items-center justify-center">
                    <div
                      className="p-6 backdrop-blur-lg shadow-lg border rounded-xl"
                    >
                      <h1 className="text-xl font-bold text-foreground">
                        Discover Your Dream Home
                      </h1>
                      <p className="text-foreground mt-2">
                        Welcome to Nexora, where luxury meets tranquility.
                      </p>
                      <Button
                        className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium shadow-md hover:bg-accent transition-all duration-300"
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
