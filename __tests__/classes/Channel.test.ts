// import _ from 'lodash';
import { ChannelBuilder } from 'src/classes/ChannelBuilder';
import { memoGenerator } from 'src/testUtils/memoGenerator';
import { channelGenerator } from 'src/testUtils/channelGenerator';
import { textGenerator } from 'src/testUtils/textGenerator';
import { Memos, NAME_LENGTH_MAX } from 'src/classes/Channel';

jest.setTimeout(10000);

describe('Channelクラス', () => {
  describe('ビルダーパターンの検証', () => {
    it('何も値をセットしないでbuildを呼び出しても、初期値が返ってくる', () => {
      const channel = new ChannelBuilder().build();
      expect(channel.id).toBe(undefined);
      expect(channel.name).toBe(undefined);
      expect(channel.groupId).toBe(undefined);
      expect(channel.createdAt).toBeTruthy();
    });
    it('ChannelBuilder関数を通してビルダーパターンのChannelクラスのインスタンスを作成する', () => {
      const channel = new ChannelBuilder()
        .id('')
        .groupId('')
        .index(0)
        .name('')
        .bookmarks([])
        .color('')
        .build();
      expect(channel.index).toBe(0);
    });
  });

  describe('文字列に対する検証', () => {
    it('名前は設定した文字数しか与えることができない', () => {
      let name = textGenerator(NAME_LENGTH_MAX + 1);
      let channel = new ChannelBuilder()
        .id('')
        .groupId('')
        .index(0)
        .name(name)
        .bookmarks([])
        .color('')
        .build();
      expect(channel.name).toBe('');

      name = textGenerator(NAME_LENGTH_MAX);
      channel = new ChannelBuilder()
        .id('')
        .groupId('')
        .index(0)
        .name(name)
        .bookmarks([])
        .color('')
        .build();
      expect(channel.name).toBe(name);
    });
    it('編集するとき名前は設定した文字数しか入力できない', () => {
      let name = textGenerator(NAME_LENGTH_MAX + 1);
      const channel = new ChannelBuilder()
        .id('')
        .groupId('')
        .index(0)
        .name('')
        .bookmarks([])
        .color('')
        .build();
      channel.editName(name);
      expect(channel.name).toBe('');

      name = textGenerator(NAME_LENGTH_MAX);
      channel.editName(name);
      expect(channel.name).toBe(name);
    });

    it('色を指定して初期化しないと、黒色がデフォルト値で設定される', () => {
      let channel = new ChannelBuilder()
        .id('')
        .groupId('')
        .index(0)
        .name('')
        .bookmarks([])
        .color('')
        .build();
      expect(channel.color).toBe('#000000');

      channel = new ChannelBuilder()
        .id('')
        .groupId('')
        .index(0)
        .name('')
        .bookmarks([])
        .color('#ffffff')
        .build();
      expect(channel.color).toBe('#ffffff');
    });

    it('色は16進数のカラーコードしか編集できない', () => {
      const channel = new ChannelBuilder()
        .id('')
        .groupId('')
        .index(0)
        .name('')
        .bookmarks([])
        .color('')
        .build();
      channel.editColor('hellow');
      expect(channel.color).toBe('#000000');
      channel.editColor('#ffffff');
      expect(channel.color).toBe('#ffffff');
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
    it('push関数を呼び出した後は、すべてのmemosの要素のindexの値が更新される', () => {
      const channel = channelGenerator();
      for (let i = 0; i < 10; i += 1) {
        const memo = memoGenerator();
        channel.push(memo);
      }
      for (let i = 0; i < 10; i += 1) {
        expect(channel.memos?.value[i].index).toBe(i);
      }
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
    it('swap関数を呼び出した後は、すべてのmemosの要素のindexの値が更新される', () => {
      const channel = channelGenerator();
      for (let i = 0; i < 10; i += 1) {
        const memo = memoGenerator();
        channel.push(memo);
      }
      const memo = memoGenerator();
      const memoId = memo.get('id') as string;
      channel.push(memo);
      channel.swap(memoId, 4);
      for (let i = 0; i < 10; i += 1) {
        expect(channel.memos?.value[i].index).toBe(i);
      }
      expect(channel.memos?.value[channel.memos?.findIndex({ id: memoId }).value()].index).toBe(4);
    });
    it('idを指定したらそのidに対応するmemoを削除する', () => {
      const channel = channelGenerator();
      for (let i = 0; i < 10; i += 1) {
        const memo = memoGenerator();
        channel.push(memo);
      }
      const memo = channel.memos?.value[4];
      const memoId = memo?.get('id') as string;
      channel.delete(memoId);
      expect(channel.length()).toBe(9);
      expect(channel.get('memos')?.value[4].id).not.toBe(memoId);
    });
    it('対応するidを持つMemoクラスのインスタンスに新しいインデックスを割り当てる', () => {
      const channel = channelGenerator();
      for (let i = 0; i < 10; i += 1) {
        const memo = memoGenerator();
        channel.push(memo);
      }
      const memo = channel.memos?.value[9];
      const memoId = memo?.get('id') as string;
      channel.swap(memoId, 4);
      channel.allocate(memoId);
      expect(channel.memos?.value[4].index).toBe(4);
    });
    it('memosの要素のすべてにindexを割り当てる', () => {
      const channel = channelGenerator();
      for (let i = 0; i < 10; i += 1) {
        const memo = memoGenerator();
        channel.push(memo);
      }
      channel.allocateAll();
      for (let i = 0; i < 10; i += 1) {
        expect(channel.memos?.value[i].index).toBe(i);
      }
    });

    it('追加した際に、所属するChannelのIDが設定される', () => {
      const channel = channelGenerator();
      for (let i = 0; i < 9; i += 1) {
        const memo = memoGenerator();
        channel.push(memo);
      }
      for (let i = 0; i < 9; i += 1) {
        expect(channel.memos?.value[i].groupId).toBe(channel.id);
      }
    });
  });

  describe('ブックマーク機能', () => {
    it('ブックマークに追加する場合、memosに同一のidをもつインスタンスが存在していない場合は追加できない', () => {
      const channel = channelGenerator();
      for (let i = 0; i < 9; i += 1) {
        const memo = memoGenerator();
        channel.push(memo);
      }
      const memos = channel.memos as Memos;
      channel.bookmark(memos.value[5].id as string);
      channel.bookmark(memos.value[3].id as string);
      let bookmarks = channel.getBookmarks();
      expect(bookmarks.length).toBe(2);

      channel.bookmark('not exist');
      bookmarks = channel.getBookmarks();
      expect(bookmarks.length).toBe(2);
      for (let i = 0; i < bookmarks.length; i += 1) {
        expect(bookmarks[i].id).not.toBe('not exist');
      }
    });

    it('ブックマークを削除する場合、memosに同一のidをもつインスタンスが存在していない場合は削除できない', () => {
      const channel = channelGenerator();
      for (let i = 0; i < 10; i += 1) {
        const memo = memoGenerator();
        channel.push(memo);
      }

      const memos = channel.memos as Memos;
      channel.bookmark(memos.value[5].id as string);
      channel.bookmark(memos.value[3].id as string);
      let bookmarks = channel.getBookmarks();
      channel.unbookmark(memos.value[5].id as string);
      bookmarks = channel.getBookmarks();
      expect(bookmarks.length).toBe(1);

      channel.unbookmark(memos.value[9].id as string);
      bookmarks = channel.getBookmarks();
      expect(bookmarks.length).toBe(1);
      expect(bookmarks[0].id).toBe(memos.value[3].id as string);
    });
  });
});
