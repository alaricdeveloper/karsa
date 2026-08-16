-- Fix permissions for profiles table
GRANT ALL ON public.profiles TO service_role;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO anon;
