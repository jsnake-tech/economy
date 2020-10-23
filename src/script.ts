import { FormattedDataForDatabase } from './types/types';
import { getFormattedDataForDatabase } from './connectors/everhour';
import { writeBatchOfTime } from './connectors/database';

export async function sync(date: string) {
  try {
    const time: FormattedDataForDatabase[] = await getFormattedDataForDatabase(date);
    console.log(time);
    await writeBatchOfTime(time);
    return '✅ Success';
  } catch (e) {
    console.error(e)
    return e;
  }
}
