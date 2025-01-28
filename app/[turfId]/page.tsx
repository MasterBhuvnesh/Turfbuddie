import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

interface PageProps {
  params: {
    turfId: string;
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default async function TurfPage({ params }: PageProps) {
  const supabase = await createClient();

  // Convert underscores back to spaces in the turf name
  const turfNameWithSpaces = params.turfId.replace(/_/g, " ");

  // Fetch the specific turf based on the name
  const { data: turf, error } = await supabase
    .from("turf")
    .select("*")
    .eq("name", turfNameWithSpaces)
    .single();

  if (error || !turf) {
    return <div>Turf not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Gallery Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {turf.images && turf.images.length > 0 ? (
            turf.images.map((imageName: string, index: number) => (
              <div
                key={index}
                className="relative h-64 rounded-lg overflow-hidden shadow-md"
              >
                <Image
                  src={`${supabaseUrl}/storage/v1/object/public/turf_images/${turf.name.replace(/ /g, "_")}/${imageName}`}
                  alt={`${turf.name} Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  priority={index === 0}
                />
              </div>
            ))
          ) : (
            <div className="relative h-64 bg-gray-200 flex items-center justify-center rounded-lg col-span-full">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>

        {/* Turf Details Section */}
        <div className="p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {turf.name}
          </h1>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Location:</span> {turf.location}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Description:</span> {turf.description}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Owner:</span> {turf.ownername}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Contact:</span> {turf.ownerno}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Address:</span> {turf.address}
          </p>

          <p className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Price: ₹{turf.price} per hour
          </p>

          <button className="w-full bg-blue-500 text-white py-2 md:py-3 rounded-md hover:bg-blue-600 transition-colors font-semibold">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}