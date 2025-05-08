
import { z } from 'zod';

// Create a function that returns the schema with translated validation messages
export const createInquirySchema = (text: any) =>
  z.object({
    fullName: z.string().min(1, { message: text?.validation?.nameRequired || "Full name is required" }),
    email: z.string().min(1, { message: text?.validation?.emailRequired || "Email is required" }).email({ message: text?.validation?.emailInvalid || "Invalid email" }),
    countryCode: z.string().min(1, { message: text?.validation?.countryCodeRequired || "Country code is required" }),
    phoneNumber: z.string().min(1, { message: text?.validation?.phoneRequired || "Phone number is required" }),
    city: z.string().min(1, { message: text?.validation?.cityRequired || "City is required" }),
    company: z.string().optional(),
    description: z.string().optional()
  });
