import { z } from 'zod';

export const saleSchema = z.object({
  customerFirstName: z.string().min(1, 'First name is required'),
  customerLastName: z.string().min(1, 'Last name is required'),
  customerEmail: z.string().email().optional().or(z.literal('')),
  customerPhone: z.string().optional(),
  isFlat: z.boolean().optional().default(false),
  flatAmount: z.number().optional(),
  frontEndProfit: z.number().min(0).optional().default(0),
  backEndProfit: z.number().min(0).optional().default(0),
  bonusAmount: z.number().optional(),
  isReferral: z.boolean().optional().default(false),
  referrerId: z.string().optional(),
  vehicleInfo: z.object({
    vin: z.string().optional(),
    make: z.string().optional(),
    model: z.string().optional(),
    year: z.string().optional(),
    dealNumber: z.string().optional()
  }).optional(),
  date: z.string()
});

export type SaleFormData = z.infer<typeof saleSchema>;