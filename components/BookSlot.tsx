// //  Its working But also need to do one thing that don't show the booked slot will do later
//
// "use client";
//
// import { useState, useEffect } from "react";
// import { createClient } from "@/utils/supabase/client";
//
// interface Turf {
//     id: string;
//     name: string;
// }
//
// interface Slot {
//     id?: string;
//     turf_id: string;
//     date: string;
//     start_time: string;
//     end_time: string;
//     is_booked: boolean;
//     booked_by_user_id?: string | null;
// }
//
// export default function BookSlot({ turfId }: { turfId: string }) {
//     const supabase = createClient();
//     const [turfs, setTurfs] = useState<Turf[]>([]);
//     const [selectedTurf, setSelectedTurf] = useState<string>(turfId);
//     const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]); // Default to today's date
//     const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
//     const [selectedSlot, setSelectedSlot] = useState<string>("");
//
//     // **Step 1: Define possible slots (e.g., 8 AM - 10 PM)**
//     const allSlots = Array.from({ length: 14 }, (_, i) => {
//         const startHour = 8 + i;
//         return {
//             start_time: `${startHour}:00`,
//             end_time: `${startHour + 1}:00`,
//         };
//     });
//
//     // **Step 2: Fetch turfs**
//     useEffect(() => {
//         async function fetchTurfs() {
//             const { data, error } = await supabase.from("turf").select("*");
//             if (error) console.error("Error fetching turfs:", error);
//             else setTurfs(data);
//         }
//         fetchTurfs();
//     }, []);
//
//     // **Step 3: Fetch booked slots when turf or date changes**
//     useEffect(() => {
//         async function fetchBookedSlots() {
//             if (!selectedTurf || !selectedDate) return;
//
//             const { data, error } = await supabase
//                 .from("booking_slots")
//                 .select("*")
//                 .eq("turf_id", selectedTurf)
//                 .eq("date", selectedDate);
//
//             if (error) {
//                 console.error("Error fetching booked slots:", error);
//             } else {
//                 setBookedSlots(data || []);
//             }
//         }
//         fetchBookedSlots();
//     }, [selectedTurf, selectedDate]);
//
//     // **Step 4: Find available slots**
//     const availableSlots = allSlots.filter(
//         (slot) => !bookedSlots.some((booked) => booked.start_time === slot.start_time)
//     );
//
//     // **Step 5: Handle slot booking (Insert into DB)**
//     async function handleBooking() {
//         if (!selectedSlot || !selectedTurf) {
//             alert("Please select a slot and turf!");
//             return;
//         }
//
//         const selectedSlotData = allSlots.find((slot) => slot.start_time === selectedSlot);
//         if (!selectedSlotData) return;
//
//         const { error } = await supabase
//             .from("booking_slots")
//             .insert([
//                 {
//                     turf_id: selectedTurf,
//                     date: selectedDate,
//                     start_time: selectedSlotData.start_time,
//                     end_time: selectedSlotData.end_time,
//                     is_booked: true,
//                     booked_by_user_id: (await supabase.auth.getUser()).data.user?.id,
//                 },
//             ]);
//
//         if (error) {
//             console.error("Booking error:", error);
//             alert("Failed to book slot. Try again.");
//         } else {
//             alert("Slot booked successfully!");
//             // Refresh booked slots
//             setBookedSlots((prev) => [
//                 ...prev,
//                 { ...selectedSlotData, turf_id: selectedTurf, date: selectedDate, is_booked: true },
//             ]);
//         }
//     }
//
//     return (
//         <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-2">Book a Slot</h2>
//
//             {/* Turf Selection */}
//             <select
//                 className="w-full border p-2 rounded-md mb-3"
//                 value={selectedTurf}
//                 onChange={(e) => setSelectedTurf(e.target.value)}
//             >
//                 {turfs.map((turf) => (
//                     <option key={turf.id} value={turf.id}>
//                         {turf.name}
//                     </option>
//                 ))}
//             </select>
//
//             {/* Date Selection */}
//             <input
//                 type="date"
//                 className="w-full border p-2 rounded-md mb-3"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//             />
//
//             {/* Slot Selection */}
//             <select
//                 className="w-full border p-2 rounded-md mb-3"
//                 value={selectedSlot}
//                 onChange={(e) => setSelectedSlot(e.target.value)}
//             >
//                 <option value="">Select a Slot</option>
//                 {availableSlots.map((slot) => (
//                     <option key={slot.start_time} value={slot.start_time}>
//                         {slot.start_time} - {slot.end_time}
//                     </option>
//                 ))}
//             </select>
//
//             {/* Book Slot Button */}
//             <button
//                 className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors font-semibold"
//                 onClick={handleBooking}
//             >
//                 Book Slot
//             </button>
//         </div>
//     );
// }


"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface Turf {
    id: string;
    name: string;
}

export default function BookSlot({ turfId }: { turfId: string }) {
    const supabase = createClient();
    const [turfs, setTurfs] = useState<Turf[]>([]);
    const [selectedTurf, setSelectedTurf] = useState<string>(turfId);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]); // Default to today's date
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string>("");

    // Define all possible slots (e.g., 8 AM to 10 PM)
    const possibleSlots = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`);

    // Fetch turfs
    useEffect(() => {
        async function fetchTurfs() {
            const { data, error } = await supabase.from("turf").select("*");
            if (error) console.error("Error fetching turfs:", error);
            else setTurfs(data);
        }
        fetchTurfs();
    }, []);

    // Fetch booked slots when turf or date changes
    useEffect(() => {
        async function fetchBookedSlots() {
            if (!selectedTurf || !selectedDate) return;

            const { data: bookedSlots, error } = await supabase
                .from("booking_slots")
                .select("start_time")
                .eq("turf_id", selectedTurf)
                .eq("date", selectedDate)
                .eq("is_booked", true);

            if (error) {
                console.error("Error fetching booked slots:", error);
                return;
            }

            // Extract booked start times
            const bookedTimes = bookedSlots.map((slot) => slot.start_time);

            // Filter available slots by removing booked ones
            const filteredSlots = possibleSlots.filter((slot) => !bookedTimes.includes(slot));

            setAvailableSlots(filteredSlots);
        }

        fetchBookedSlots();
    }, [selectedTurf, selectedDate]);

    // Handle slot booking
    async function handleBooking() {
        if (!selectedSlot || !selectedTurf) {
            alert("Please select a slot and turf!");
            return;
        }

        const user = await supabase.auth.getUser();
        const userId = user.data.user?.id;

        if (!userId) {
            alert("You need to be logged in to book a slot.");
            return;
        }

        const { error } = await supabase.from("booking_slots").insert([
            {
                turf_id: selectedTurf,
                date: selectedDate,
                start_time: selectedSlot,
                end_time: `${parseInt(selectedSlot.split(":")[0]) + 1}:00`,
                is_booked: true,
                booked_by_user_id: userId,
            },
        ]);

        if (error) {
            console.error("Booking error:", error);
            alert("Failed to book slot. Try again.");
        } else {
            alert("Slot booked successfully!");
            // Refresh available slots
            setAvailableSlots((prevSlots) => prevSlots.filter((slot) => slot !== selectedSlot));
        }
    }

    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Book a Slot</h2>

            {/* Turf Selection */}
            <select
                className="w-full border p-2 rounded-md mb-3"
                value={selectedTurf}
                onChange={(e) => setSelectedTurf(e.target.value)}
            >
                {turfs.map((turf) => (
                    <option key={turf.id} value={turf.id}>
                        {turf.name}
                    </option>
                ))}
            </select>

            {/* Date Selection */}
            <input
                type="date"
                className="w-full border p-2 rounded-md mb-3"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            />

            {/* Slot Selection */}
            <select
                className="w-full border p-2 rounded-md mb-3"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
            >
                <option value="">Select a Slot</option>
                {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                            {slot} - {`${parseInt(slot.split(":")[0]) + 1}:00`}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>
                        No available slots
                    </option>
                )}
            </select>

            {/* Book Slot Button */}
            <button
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors font-semibold"
                onClick={handleBooking}
                disabled={!selectedSlot}
            >
                Book Slot
            </button>
        </div>
    );
}
