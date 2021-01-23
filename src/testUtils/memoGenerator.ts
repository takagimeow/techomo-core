import faker from 'faker';
import { MemoBuilder } from 'src/classes/MemoBuilder';

export function memoGenerator() {
  const id = faker.random.uuid();
  const groupId = faker.random.uuid();
  const name = faker.lorem.text();
  const body = faker.lorem.paragraph();
  const memo = new MemoBuilder()
    .id(id)
    .groupId(groupId)
    .index(0)
    .name(name)
    .color('')
    .body(body)
    .build();
  return memo;
}
