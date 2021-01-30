import faker from 'faker';
import { WorkspaceBuilder } from 'src/classes/workspaceBuilder';

export function workspaceGenerator() {
  const id = faker.random.uuid();
  const groupId = faker.random.uuid();
  const name = faker.lorem.text();
  const workspace = new WorkspaceBuilder()
    .id(id)
    .groupId(groupId)
    .index(0)
    .name(name)
    .channels([])
    .color('#000000')
    .build();
  return workspace;
}
