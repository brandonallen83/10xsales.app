import { db } from '../db';
import { sales, aftermarketProducts } from '../db/schema';
import { generateId } from 'lucia';
import { eq, and, gte, lte } from 'drizzle-orm';
import { startOfMonth, endOfMonth } from 'date-fns';

export async function getSales(userId: string, month: number, year: number) {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));

  return db.query.sales.findMany({
    where: and(
      eq(sales.userId, userId),
      gte(sales.date, start.toISOString()),
      lte(sales.date, end.toISOString())
    ),
    with: {
      aftermarketProducts: true,
    },
    orderBy: (sales, { desc }) => [desc(sales.date)],
  });
}

export async function addSale(userId: string, data: {
  date: string;
  frontEndProfit: number;
  backEndProfit: number;
  isFlat: boolean;
  flatAmount?: number;
  bonusAmount?: number;
  aftermarketProducts: Array<{
    name: string;
    profit: number;
    commission: number;
  }>;
}) {
  const saleId = generateId(15);
  
  // Calculate total commission
  let totalCommission = data.isFlat ? (data.flatAmount || 0) : 
    (data.frontEndProfit + data.backEndProfit);

  // Add bonus if present
  if (data.bonusAmount) {
    totalCommission += data.bonusAmount;
  }

  // Add aftermarket commissions
  totalCommission += data.aftermarketProducts.reduce(
    (sum, product) => sum + product.commission,
    0
  );

  // Create sale
  await db.insert(sales).values({
    id: saleId,
    userId,
    date: data.date,
    frontEndProfit: data.frontEndProfit,
    backEndProfit: data.backEndProfit,
    isFlat: data.isFlat ? 1 : 0,
    flatAmount: data.flatAmount,
    bonusAmount: data.bonusAmount,
    totalCommission,
  });

  // Create aftermarket products
  if (data.aftermarketProducts.length > 0) {
    await db.insert(aftermarketProducts).values(
      data.aftermarketProducts.map(product => ({
        id: generateId(15),
        saleId,
        ...product,
      }))
    );
  }

  return { id: saleId, totalCommission };
}