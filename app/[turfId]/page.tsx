import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import BookSlot from "@/components/BookSlot";

interface PageProps {
  params: {
    turfId: string;
  };
}


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export default async function TurfPage({ params }: { params: Promise<PageProps["params"]> }) {
  const supabase =  await createClient(); // No need to `await` createClient()

  const { turfId } = await params;

  // Extract turfId safely
  if (!turfId) {
    return <div>Error: Turf ID not found.</div>;
  }

  // Convert underscores back to spaces
  const turfNameWithSpaces = turfId.replace(/_/g, " ");


  // Fetch the specific turf based on the name
  const { data: turf, error: turfError } = await supabase
      .from("turf")
      .select("*")
      .eq("name", turfNameWithSpaces)
      .single();

  if (turfError || !turf) {
    return <div>Turf not found.</div>;
  }

  // Fetch booking slots for the next 5 days
  const { data: bookingSlots, error: slotsError } = await supabase
      .from("booking_slots")
      .select("*")
      .eq("turf_id", turf.id)
      .gte("date", new Date().toISOString().split("T")[0]) // From today
      .lte("date", new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split("T")[0]) // Up to 5 days from today
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

  if (slotsError) {
    console.error("Error fetching booking slots:", slotsError);
    return <div>Error loading booking slots.</div>;
  }

  // Group booking slots by date
  const slotsByDate: { [date: string]: any[] } = {};
  bookingSlots.forEach((slot) => {
    const date = slot.date;
    if (!slotsByDate[date]) {
      slotsByDate[date] = [];
    }
    slotsByDate[date].push(slot);
  });

  return (
      <div className="min-h-screen bg-gradient-to-r from-green-200 to-green-500 p-4">
        <div className="m-28 max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
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
                         fill
                          style={{ objectFit: "cover" }}
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

            {/* Booking Matrix Section */}
            <div className="mb-6">
  <h2 className="text-xl font-bold text-gray-800 mb-4">
    Booking Availability (Next 5 Days)
  </h2>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="px-4 py-2">Time Slot</th>
          {Object.keys(slotsByDate).map((date) => (
            <th key={date} className="px-4 py-2">
              {new Date(date).toLocaleDateString()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 24 }).map((_, hour) => (
          <tr key={hour}>
            <td className="px-4 py-2 font-medium">
              {`${String(hour).padStart(2, "0")}:00 - ${String(hour + 1).padStart(2, "0")}:00`}
            </td>
            {Object.keys(slotsByDate).map((date) => {
              const slot = slotsByDate[date].find(
                (s) => s.start_time === `${String(hour).padStart(2, "0")}:00:00`
              );
              return (
                <td
                  key={date}
                  className={`px-4 py-2 text-center rounded-lg ${
                    slot?.is_booked ? "bg-red-200" : "bg-green-200"
                  }`}
                >
                  {slot?.is_booked ? "Booked" : "Available"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


            <p className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Price: ₹{turf.price} per hour
            </p>
            <BookSlot turfId={turf.id} />
            <button className="w-full bg-blue-500 text-white py-2 md:py-3 rounded-md hover:bg-blue-600 transition-colors font-semibold">
              Pay Now
            </button>
          </div>
        </div>
      </div>
  );
}