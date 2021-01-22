// import _ from 'lodash';
import { ChannelBuilder } from 'src/classes/ChannelBuilder';
import { memoGenerator } from 'src/testUtils/memoGenerator';
import { channelGenerator } from 'src/testUtils/channelGenerator';

jest.setTimeout(10000);

describe('Channelクラス', () => {
  describe('ビルダーパターンの検証', () => {
    it('何も値をセットしないでbuildを呼び出しても、初期値が返ってくる', () => {
      const channel = new ChannelBuilder().build();
      expect(channel.id).toBe(undefined);
      expect(channel.name).toBe(undefined);
      expect(channel.workspaceId).toBe(undefined);
      expect(channel.createdAt).toBeTruthy();
    });
    it('ChannelBuilder関数を通してビルダーパターンのChannelクラスのインスタンスを作成する', () => {
      const channel = new ChannelBuilder()
        .id('')
        .workspaceId('')
        .index(0)
        .name('')
        .bookmarks([])
        .color('')
        .build();
      expect(channel.index).toBe(0);
    });
  });

  describe('memosに対する操作', () => {
    it('Memoクラスのインスタンスを渡すと、memosの末尾に追加する', () => {
      const channel = channelGenerator();
      const memo = memoGenerator();
      const memo2 = memoGenerator();
      channel.push(memo);
      channel.push(memo2);
      expect(channel.memos?.findIndex({ id: memo2.id }).value()).toBe(1);
    });
    it('現在のmemosの長さを取得する', () => {
      const channel = channelGenerator();
      for (let i = 0; i < 10; i += 1) {
        const memo = memoGenerator();
        channel.push(memo);
      }
      expect(channel.length()).toBe(10);
    });
    it('idと位置を指定したらそのidに対応するmemoは指定した位置に移動する', () => {
      const channel = channelGenerator();
      for (let i = 0; i < 9; i += 1) {
        const memo = memoGenerator();
        channel.push(memo);
      }
      const memo = memoGenerator();
      const memoId = memo.get('id') as string;
      channel.push(memo);
      expect(channel.memos?.value[4].id).not.toBe(memoId);
      channel.swap(memoId, 4);
      expect(channel.memos?.value[4].id).toBe(memoId);
    });
    it('idを指定したらそのidに対応するmemoを削除する', () => {
      const channel = channelGenerator();
      for (let i = 0; i < 10; i += 1) {
        const memo = memoGenerator();
        channel.push(memo);
      }
      const memo = channel.memos?.value[9];
      const memoId = memo?.get('id') as string;
      channel.delete(memoId);
      expect(channel.length()).toBe(9);
      expect(channel.get('memos')?.value[8].id).not.toBe(memoId);
    });
  });
});
