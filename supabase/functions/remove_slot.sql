-- Function to Generate Booking Slots
CREATE OR REPLACE FUNCTION reset_past_slots()
RETURNS VOID AS $$
BEGIN
    -- Delete slots older than yesterday
DELETE FROM booking_slots
WHERE date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;