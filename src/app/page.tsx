import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
              <div className="md:col-span-3">
                <Image
                  src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Hero Image"
                  width={700} // Set width based on expected display size
                  height={300} // Set height to maintain aspect ratio
                  className="rounded"
                />
              </div>

              <div className="md:col-span-1">
                <div className="max-w-lg md:max-w-none">
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                    Discover Your Dream Home With Neroxa
                  </h2>
                  <p className="mt-4 text-blue-700">
                    Welcome to Nexora where luxury meets tranquility. Home which is perfect for families or individuals seeking comfort and elegance.
                  </p>
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
