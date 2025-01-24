-- CREATE A USER TABLE 

CREATE TABLE users (
    id UUID REFERENCES auth.users (id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CREATE A FUNCTION TO HANDLE NEW USERS

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, role)
    VALUES (NEW.id, NEW.email, 'user')
    ON CONFLICT (id) DO NOTHING; -- Prevents duplicate inserts
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- CREATE A TRIGGER

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- ENABLE ROW LEVEL SECURITY

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- TO ALLOW USERS TO READ THEIR OWN DATA

CREATE POLICY "Users can read their own data"
ON users
FOR SELECT
USING (auth.uid() = id);

-- TO ALLOW USERS TO UPDATE THEIR OWN DATA

CREATE POLICY "Admins can read all user data"
ON users
FOR SELECT
TO authenticated
USING (EXISTS (
    SELECT 1
    FROM users
    WHERE id = auth.uid() AND role = 'admin'
));