
import {z , ZodObject} from "zod";


export const AddressSchema: ZodObject = z.object({
    buildingName: z.string().optional(),
    streetName: z.string().optional(),
    locality: z.string().optional(),
    city: z.string().min(1, "City is Required"),
    state: z.string().min(1, "State is Required"),
    zipCode: z.string().min(6, "Zip Code should be of 6 digits")
});

export const UserSchema = z.object({
    id: z.uuidv4("Invalid User Id!"),
    firstName: z.string().min(1, "First Name is Required"),
    lastName: z.string().min(1, "Last Name is Required"),
    middleName: z.string().optional(),
    email: z.email("Invalid Email Address"),
    phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be of 10 digits"),
    password: z.string().min(12, "Password must be of atleast 12 characters"),
    address: AddressSchema,
});

export type User = z.infer<typeof UserSchema>;
export type Address = z.infer<typeof AddressSchema>;