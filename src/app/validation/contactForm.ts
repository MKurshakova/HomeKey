import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Imię musi mieć co najmniej 2 znaki").max(50, "Imię jest za długie"),
  email: z.string().email("Podaj poprawny adres e-mail"),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]+$/, "Podaj poprawny numer telefonu")
    .optional()
    .or(z.literal("")),
  interest: z.enum(["buying", "selling", "renting", "investing", "valuation"]),
  message: z.string().min(10, "Wiadomość musi mieć co najmniej 10 znaków").max(1000, "Wiadomość jest za długa"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
