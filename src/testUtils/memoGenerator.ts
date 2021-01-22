import faker from 'faker';
import { MemoBuilder } from 'src/classes/MemoBuilder';

export function memoGenerator() {
  const id = faker.random.uuid();
  const channelId = faker.random.uuid();
  const title = faker.lorem.text();
  const body = faker.lorem.paragraph();
  const memo = new MemoBuilder()
    .id(id)
    .channelId(channelId)
    .index(0)
    .title(title)
    .body(body)
    .build();
  return memo;
}
