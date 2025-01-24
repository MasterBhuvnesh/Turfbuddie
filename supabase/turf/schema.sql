-- CREATE SCHEMA FOR TURF TABLE;

CREATE TABLE turf (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY, -- Unique ID for each turf
    name TEXT NOT NULL, -- Name of the turf
    location TEXT NOT NULL, -- Latitude and longitude as a string (e.g., "lat,long")
    description TEXT, -- Description of the turf
    ownername TEXT NOT NULL, -- Name of the turf owner
    ownerno TEXT NOT NULL, -- Phone number of the turf owner
    address TEXT NOT NULL, -- Address of the turf
    price NUMERIC NOT NULL, -- Price of the turf
    images TEXT[] -- Array to store image names (e.g., ["1.png", "2.png", "3.png"])
);

-- SETUP THE BUCKETS FOR IMAGES

INSERT INTO storage.buckets (id, name, public)
VALUES ('turf_images', 'turf_images', true);

-- ENABLE ROW LEVEL SECURITY

ALTER TABLE turf ENABLE ROW LEVEL SECURITY;

-- USERS CAN VIEW ALL TURFS

CREATE POLICY "Users can view all turfs"
ON turf
FOR SELECT
USING (true);

-- ADMINS CAN INSERT TURFS

CREATE POLICY "Admins can insert turfs"
ON turf
FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
    SELECT 1
    FROM users
    WHERE id = auth.uid() AND role = 'admin'
));

-- ADMINS CAN UPDATE TURFS

CREATE POLICY "Admins can update turfs"
ON turf
FOR UPDATE
TO authenticated
USING (EXISTS (
    SELECT 1
    FROM users
    WHERE id = auth.uid() AND role = 'admin'
));

-- ADMINS CAN DELETE TURFS

CREATE POLICY "Admins can delete turfs"
ON turf
FOR DELETE
TO authenticated
USING (EXISTS (
    SELECT 1
    FROM users
    WHERE id = auth.uid() AND role = 'admin'
));