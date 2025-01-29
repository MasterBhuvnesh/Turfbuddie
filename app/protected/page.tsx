// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// // Define the Turf type for better type safety
// type Turf = {
//   id: string;
//   name: string;
//   location: string;
//   description: string;
//   ownername: string;
//   ownerno: string;
//   address: string;
//   price: number;
//   images: string[]; // Array of image names
// };

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// export default async function ProtectedPage() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return redirect("/sign-in");
//   }

//   // Fetch turf data from Supabase
//   const { data: turfs, error } = await supabase
//     .from("turf") // Replace 'turf' with your actual table name
//     .select("*");

//   console.log(turfs);
//   if (error) {
//     console.error("Error fetching turfs:", error);
//     return <div>Error loading turfs. Please try again later.</div>;
//   }

//   return (
//     <div className="flex-1 w-full flex flex-col gap-12">
//       <h1 className="text-4xl font-bold self-center">Protected page</h1>
//       <hr className="my-8 border-t border-gray-200 w-full" />

//       {/* Display Turfs */}
//       <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
//         {turfs.map((turf: Turf) => (
//           <div
//             key={turf.id}
//             className="border rounded-lg overflow-hidden shadow-lg"
//           >
//             {/* Display a random image */}
//             <div className="relative h-48 p-2">
//               {turf.images && turf.images.length > 0 ? (
//                 <Image
//                   src={`${supabaseUrl}/storage/v1/object/public/turf_images/${turf.name.replace(/ /g, "_")}/${turf.images[Math.floor(Math.random() * turf.images.length)]}`}
//                   alt={`${turf.name} Image`}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-md"
//                 />
//               ) : (
//                 <div className="bg-gray-200 flex items-center justify-center">
//                   <p className="text-gray-500">No images available</p>
//                 </div>
//               )}
//             </div>
//             {/*  Display all images */}
//             {/*
//             <div className="flex flex-col gap-2 p-2">
//               {turf.images && turf.images.length > 0 ? (
//                 turf.images.map((imageName: string, index: number) => (
//                   <div
//                     key={index}
//                     className="relative h-48"
//                   >
//                     <Image
//                       src={`${supabaseUrl}/storage/v1/object/public/turf_images/${turf.name.replace(/ /g, "_")}/${imageName}`}
//                       alt={`${turf.name} Image ${index + 1}`}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-md"
//                       priority={index === 0}
//                     />
//                   </div>
//                 ))
//               ) : (
//                 <div className="relative h-48 bg-gray-200 flex items-center justify-center">
//                   <p className="text-gray-500">No images available</p>
//                 </div>
//               )}
//             </div> */}
//             {/* Turf Details */}
//             <div className="p-4">
//               <h2 className="text-xl font-bold">{turf.name}</h2>
//               {/* <p className="text-gray-600">{turf.location}</p> */}
//               <p className="text-sm text-gray-500">{turf.description}</p>
//               <div className="mt-2">
//                 {/* <p className="text-gray-600">
//                   <strong>Owner:</strong> {turf.ownername}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Contact:</strong> {turf.ownerno}
//                 </p> */}
//                 <p className="text-gray-600">
//                   <strong>Address:</strong> {turf.address}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Price:</strong> ₹{turf.price} per hour
//                 </p>
//               </div>
//               <Link
//                 href={`/${turf.name.replace(/ /g, "_")}`}
//                 className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors block text-center"
//               >
//                 Check availability
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// // import { createClient } from "@/utils/supabase/server";
// // import { redirect } from "next/navigation";
// // import Image from "next/image";

// // // Define the Turf type for better type safety
// // type Turf = {
// //   id: string;
// //   name: string;
// //   location: string;
// //   description: string;
// //   ownername: string;
// //   ownerno: string;
// //   address: string;
// //   price: number;
// //   images: string[]; // Array of image names
// // };

// // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// // export default async function ProtectedPage() {
// //   const supabase = await createClient();

// //   const {
// //     data: { user },
// //   } = await supabase.auth.getUser();

// //   if (!user) {
// //     return redirect("/sign-in");
// //   }

// //   // Fetch turf data from Supabase
// //   const { data: turfs, error } = await supabase
// //     .from("turf") // Replace 'turf' with your actual table name
// //     .select("*");

// //   if (error) {
// //     console.error("Error fetching turfs:", error);
// //     return <div>Error loading turfs. Please try again later.</div>;
// //   }

// //   return (
// //     <div className="flex-1 w-full flex flex-col gap-12">
// //       <h1 className="text-4xl font-bold">Protected page</h1>

// //       {/* Display Turfs */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {turfs.map((turf: Turf) => (
// //           <div
// //             key={turf.id}
// //             className="border rounded-lg overflow-hidden shadow-lg"
// //           >
// //             {/* Display all images */}
// //             <div className="flex flex-col gap-2 p-2">
// //               {turf.images && turf.images.length > 0 ? (
// //                 turf.images.map((imageName: string, index: number) => (
// //                   <div
// //                     key={index}
// //                     className="relative h-48"
// //                   >
// //                     <Image
// //                       src={`${supabaseUrl}/storage/v1/object/public/turf_images/${turf.name.replace(/ /g, "_")}/${imageName}`}
// //                       alt={`${turf.name} Image ${index + 1}`}
// //                       layout="fill"
// //                       objectFit="cover"
// //                       className="rounded-md"
// //                       priority={index === 0}
// //                     />
// //                   </div>
// //                 ))
// //               ) : (
// //                 <div className="relative h-48 bg-gray-200 flex items-center justify-center">
// //                   <p className="text-gray-500">No images available</p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Turf Details */}
// //             <div className="p-4">
// //               <h2 className="text-xl font-bold">{turf.name}</h2>
// //               <p className="text-gray-600">{turf.location}</p>
// //               <p className="text-sm text-gray-500">{turf.description}</p>
// //               <div className="mt-2">
// //                 <p className="text-gray-600">
// //                   <strong>Owner:</strong> {turf.ownername}
// //                 </p>
// //                 <p className="text-gray-600">
// //                   <strong>Contact:</strong> {turf.ownerno}
// //                 </p>
// //                 <p className="text-gray-600">
// //                   <strong>Address:</strong> {turf.address}
// //                 </p>
// //                 <p className="text-gray-600">
// //                   <strong>Price:</strong> ₹{turf.price} per hour
// //                 </p>
// //               </div>
// //               <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
// //                 Check availability
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Define the Turf type for better type safety
type Turf = {
  id: string;
  name: string;
  location: string;
  description: string;
  ownername: string;
  ownerno: string;
  address: string;
  price: number;
  images: string[]; // Array of image names
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch turf data from Supabase
  const { data: turfs, error } = await supabase
    .from("turf") // Replace 'turf' with your actual table name
    .select("*");

  if (error) {
    console.error("Error fetching turfs:", error);
    return <div>Error loading turfs. Please try again later.</div>;
  }

  return (
    <div className="min-h-screen flex-1 w-full flex flex-col gap-8  p-6 bg-gradient-to-r from-green-200 to-green-500">
      <h1 className="text-4xl mt-28 font-bold text-center text-gray-800 mb-8">
        Explore Turfs
      </h1>

      {/* Display Turfs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
        {turfs.map((turf: Turf) => (
          <div
            key={turf.id}
            className="border rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
          >
            {/* Display a random image */}
            <div className="relative h-48 overflow-hidden rounded-t-lg">
  {turf.images && turf.images.length > 0 ? (
    <div className="relative h-full w-full transform transition-transform duration-300 hover:scale-110">
      <Image
        src={`${supabaseUrl}/storage/v1/object/public/turf_images/${turf.name.replace(/ /g, "_")}/${turf.images[Math.floor(Math.random() * turf.images.length)]}`}
        alt={`${turf.name} Image`}
        layout="fill"
        objectFit="cover"
        className="rounded-t-lg"
      />
    </div>
  ) : (
    <div className="bg-gray-200 h-full flex items-center justify-center">
      <p className="text-gray-500">No images available</p>
    </div>
  )}
</div>

            {/* Turf Details */}
            <div className="p-6 ">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {turf.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{turf.description}</p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Address:</strong> {turf.address}
                </p>
                <p className="text-gray-700">
                  <strong>Price:</strong> ₹{turf.price} per hour
                </p>
              </div>
              <Link
                href={`/${turf.name.replace(/ /g, "_")}`}
                className="mt-4 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors block text-center"
              >
                Check availability
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}