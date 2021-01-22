import faker from 'faker';
import { ChannelBuilder } from 'src/classes/ChannelBuilder';

export function channelGenerator() {
  const id = faker.random.uuid();
  const workspaceId = faker.random.uuid();
  const name = faker.lorem.text();
  const channel = new ChannelBuilder()
    .id(id)
    .workspaceId(workspaceId)
    .index(0)
    .name(name)
    .memos([])
    .bookmarks([])
    .color('#000000')
    .build();
  return channel;
}
