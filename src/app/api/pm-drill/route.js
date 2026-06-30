import { seededPick, dateHash, getTodayString } from '@/lib/utils';
import drillCards from '@/data/drill-cards.json';

export async function GET() {
  try {
    const today = getTodayString();
    const seed = dateHash(today);
    
    // Pick 5 cards deterministically using the day as a seed
    const dailyCards = seededPick(drillCards, 5, seed);

    return Response.json({
      cards: dailyCards,
      date: today,
      success: true
    });
  } catch (error) {
    console.error('Failed to generate daily drill cards:', error);
    return Response.json(
      { error: 'Failed to generate drill cards', success: false },
      { status: 500 }
    );
  }
}
