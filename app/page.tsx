export default async function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <main
          className="flex-1 flex items-center justify-center p-4 bg-gradient-to-r from-green-200 to-green-500"
        >
          <div className="w-full max-w-5xl mx-auto text-center px-2 sm:px-4 lg:px-6">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6 typing-animation">
              Welcome to <span className="text-gray-800">Turfbuddie</span>
            </h1>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-700">
              Book turfs, organize matches, and enjoy the game with the best
              turf booking platform.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 text-center">
          <div className="container mx-auto">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Turfbuddie. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
