import { FormattedDataForDatabase } from './types/types';
import { getFormattedDataForDatabase } from './connectors/everhour';
import { writeBatchOfTime } from './connectors/database';

export async function sync() {
  const time: FormattedDataForDatabase[] = await getFormattedDataForDatabase();
  await writeBatchOfTime(time);
}

