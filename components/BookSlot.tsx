// UI component to book a slot on a turf
// This component fetches turfs and available slots from the database
//  But what i am going to do is like first it will show all the slot 0 - 23 ( 12:00 - 24:00) then it will hide the booked slot which will be like checking that specific date & that specific turf then all the booked slot they will be having isbooked value true so it will hide them .

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface Turf {
    id: string;
    name: string;
}

interface Slot {
    id: string;
    date: string;
    start_time: string;
    is_booked: boolean;
}

export default function BookSlot({ turfId }: { turfId: string }) {
    const supabase = createClient();
    const [turfs, setTurfs] = useState<Turf[]>([]);
    const [selectedTurf, setSelectedTurf] = useState<string>(turfId);
    const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string>("");

    // Fetch turfs
    useEffect(() => {
        async function fetchTurfs() {
            const { data, error } = await supabase.from("turf").select("*");
            if (error) console.error("Error fetching turfs:", error);
            else setTurfs(data);
        }
        fetchTurfs();
    }, []);

    // Fetch available slots when turf changes
// Fetch available slots when turf changes
    useEffect(() => {
        async function fetchSlots() {
            if (!selectedTurf) return;
            const { data, error } = await supabase
                .from("booking_slots")
                .select("*")
                .eq("turf_id", selectedTurf)
                .eq("is_booked", false);

            if (error) console.error("Error fetching slots:", error);
            else setAvailableSlots(data);
        }
        fetchSlots();
    }, [selectedTurf]);

    // Handle slot booking
    async function handleBooking() {
        if (!selectedSlot || !selectedTurf) return alert("Please select a slot and turf!");

        const { error } = await supabase
            .from("booking_slots")
            .update({ is_booked: true })
            .eq("id", selectedSlot);

        if (error) {
            console.error("Booking error:", error);
            alert("Failed to book slot. Try again.");
        } else {
            alert("Slot booked successfully!");
            setAvailableSlots(availableSlots.filter(slot => slot.id !== selectedSlot)); // Remove booked slot from UI
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

            {/* Slot Selection */}
            <select
                className="w-full border p-2 rounded-md mb-3"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
            >
                <option value="">Select a Slot</option>
                {availableSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                        {new Date(slot.date).toLocaleDateString()} - {slot.start_time}
                    </option>
                ))}
            </select>

            {/* Book Slot Button */}
            <button
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors font-semibold"
                onClick={handleBooking}
            >
                Book Slot
            </button>
        </div>
    );
}
