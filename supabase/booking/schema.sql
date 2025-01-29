-- CREATE SCHEMA FOR BOOKING SLOTS TABLE

CREATE TABLE booking_slots (
                               id UUID DEFAULT gen_random_uuid() PRIMARY KEY, -- Unique ID for each slot
                               turf_id UUID REFERENCES turf(id) ON DELETE CASCADE, -- Foreign key to the turf table
                               date DATE NOT NULL, -- The date for which the slot is available (e.g., '2023-10-15')
                               start_time TIME NOT NULL, -- Start time of the slot (e.g., '09:00:00')
                               end_time TIME NOT NULL, -- End time of the slot (e.g., '10:00:00')
                               is_booked BOOLEAN DEFAULT FALSE, -- Whether the slot is booked
                               booked_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL -- User who booked the slot
);

-- ENABLE ROW LEVEL SECURITY

ALTER TABLE booking_slots ENABLE ROW LEVEL SECURITY;

-- USERS CAN VIEW ALL BOOKING SLOTS

CREATE POLICY "Users can view all booking slots"
ON booking_slots
FOR SELECT
               USING (true);

-- USERS CAN BOOK SLOTS

CREATE POLICY "Users can book slots"
ON booking_slots
FOR UPDATE
               TO authenticated
               USING (true)
    WITH CHECK (
               is_booked = TRUE AND booked_by_user_id = auth.uid()
               );

-- ADMINS CAN MANAGE ALL BOOKING SLOTS

CREATE POLICY "Admins can manage all booking slots"
ON booking_slots
FOR ALL
TO authenticated
USING (EXISTS (
    SELECT 1
    FROM users
    WHERE id = auth.uid() AND role = 'admin'
));