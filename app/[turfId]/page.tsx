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
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Turf Details</h1>
        {/* <pre>{JSON.stringify(params, null, 2)}</pre> */}
        <h1>{turf.name}</h1>
        <p>{turf.location}</p>
        <p>{turf.description}</p>
        <p>Owner: {turf.ownername}</p>
        <p>Contact: {turf.ownerno}</p>
        <p>Address: {turf.address}</p>
        <div className="flex flex-col gap-2 p-2">
          {turf.images && turf.images.length > 0 ? (
            turf.images.map((imageName: string, index: number) => (
              <div
                key={index}
                className="relative h-48"
              >
                <Image
                  src={`${supabaseUrl}/storage/v1/object/public/turf_images/${turf.name.replace(/ /g, "_")}/${imageName}`}
                  alt={`${turf.name} Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                  priority={index === 0}
                />
              </div>
            ))
          ) : (
            <div className="relative h-48 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>
        <p>Price: ₹{turf.price} per hour</p>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
        Pay Now
      </button>
    </>
  );
}
