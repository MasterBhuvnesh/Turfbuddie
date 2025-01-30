import Image from "next/image";

export default async function Home() {
  return (
    <>
    
      <div style={{
    backgroundImage: `url(/assets/back.jpg)`,
    backgroundSize: 'cover', // Adjust as needed
    backgroundPosition: 'center', // Adjust as needed
    width: 'cover', // Adjust as needed
    height: '100px', // Adjust as needed
  }} className="flex flex-col min-h-screen overflow-hidden">
        

        <main className="flex-1  flex items-center justify-center p-4 relative z-10">
          <div className=" max-w-5xl mx-auto text-center px-2 sm:px-4 lg:px-6">
    
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6 typing-animation">
              Welcome to <span className="text-green-600">Turfbuddie</span>
            </h1>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-800">
              Book turfs, organize matches, and enjoy the game with the best
              turf booking platform.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 text-center relative z-10">
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
