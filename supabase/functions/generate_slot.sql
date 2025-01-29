-- Function to Generate Booking Slots
CREATE OR REPLACE FUNCTION generate_slots_for_next_5_days()
RETURNS VOID AS $$
DECLARE
turf_record RECORD;
    slot_date DATE; -- Renamed from current_date to slot_date
    slot_time TIME;
BEGIN
    -- Loop through all turfs
FOR turf_record IN SELECT * FROM turf LOOP
                                 -- Generate slots for the next 5 days
    FOR i IN 0..4 LOOP
    slot_date := CURRENT_DATE + i; -- Use slot_date instead of current_date

-- Generate slots for each hour
FOR hour IN 0..23 LOOP
                slot_time := (hour || ':00:00')::TIME;

                -- Insert the slot into the booking_slots table
INSERT INTO booking_slots (turf_id, date, start_time, end_time)
VALUES (
           turf_record.id,
           slot_date, -- Use slot_date here
           slot_time,
           (slot_time + INTERVAL '1 hour')::TIME
       );
END LOOP;
END LOOP;
END LOOP;
END;
$$ LANGUAGE plpgsql;