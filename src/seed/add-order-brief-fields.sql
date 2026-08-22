-- Add the latest landing brief fields to an existing Supabase project.
-- Run this once in the Supabase SQL Editor before accepting the new form fields.

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS content_goal TEXT,
  ADD COLUMN IF NOT EXISTS content_tone TEXT,
  ADD COLUMN IF NOT EXISTS priority_channel TEXT;
