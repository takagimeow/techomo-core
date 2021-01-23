import { WorkspaceBuilder } from 'src/classes/WorkspaceBuilder';
import { workspaceGenerator } from 'src/testUtils/workspaceGenerator';
import { channelGenerator } from 'src/testUtils/channelGenerator';
import { Channels } from 'src/classes/Workspace';

jest.setTimeout(10000);

describe('Workspaceクラス', () => {
  describe('channelsに対する操作', () => {
    it('チャンネルを作成', () => {
      const workspace = new WorkspaceBuilder()
        .id('')
        .groupId('')
        .index(0)
        .name('')
        .channels([])
        .color('')
        .build();
      const channel = channelGenerator();

      workspace.push(channel);
      expect(workspace.length()).toBe(1);
    });

    it('チャンネルを削除', () => {
      const workspace = workspaceGenerator();
      for (let i = 0; i < 10; i += 1) {
        const channel = channelGenerator();
        workspace.push(channel);
      }
      expect(workspace.length()).toBe(10);
      let channels = workspace.channels as Channels;
      const channelId = channels.value[4].id as string;
      workspace.delete(channelId);
      channels = workspace.channels as Channels;
      expect(workspace.length()).toBe(9);
      expect(channels.value[4].id).not.toBe(channelId);
    });
  });
});
