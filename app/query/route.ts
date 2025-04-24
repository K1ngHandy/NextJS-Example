import { db } from "@vercel/postgres";
import { invoices } from "../lib/placeholder-data";

export async function GET() {
  const client = await db.connect();

  try {
    const data = await client.sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;
  
    return Response.json({ invoices: data.rows });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  } finally {
    client.release();
  }
}
