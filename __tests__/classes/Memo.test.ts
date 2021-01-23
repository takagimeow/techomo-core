// import _ from 'lodash';
import { MemoBuilder } from 'src/classes/MemoBuilder';
import { textGenerator } from 'src/testUtils/textGenerator';

describe('Memoクラス', () => {
  describe('ビルダーパターンの検証', () => {
    it('何も値をセットしないでbuildを呼び出しても、初期値が返ってくる', () => {
      const memo = new MemoBuilder().build();
      expect(memo.id).toBe(undefined);
      expect(memo.title).toBe(undefined);
      expect(memo.body).toBe(undefined);
      expect(memo.createdAt).toBeTruthy();
    });
    it('MemoBuilder関数を通してビルダーパターンのMemoクラスのインスタンスを作成する', () => {
      const memo = new MemoBuilder().id('').channelId('').index(0).title('').body('').build();
      expect(memo.index).toBe(0);
    });
  });

  describe('メソッド', () => {
    it('getメソッドに存在するプロパティを渡した場合、そのプロパティに値を設定している場合は値が返ってくる', () => {
      const memo = new MemoBuilder().id('testID').build();
      expect(memo.get('id')).toStrictEqual('testID');
    });
    it('getメソッドに存在するプロパティを渡した場合、そのプロパティに値を設定していない場合は初期値が返ってくる', () => {
      const memo = new MemoBuilder().id('testID').build();
      expect(memo.get('title')).toStrictEqual(undefined);
    });
  });

  describe('文字列の検証', () => {
    it('タイトルは140文字しか与えることができない', () => {
      let title = textGenerator(141);
      let memo = new MemoBuilder()
        .id('testID')
        .channelId('testChannelId')
        .index(0)
        .title(title)
        .body('')
        .build();
      expect(memo.title).toBe('');

      title = textGenerator(140);
      memo = new MemoBuilder()
        .id('testID')
        .channelId('testChannelId')
        .index(0)
        .title(title)
        .body('')
        .build();
      expect(memo.title).toBe(title);
    });
    it('編集するときタイトルは140文字しか入力できない', () => {
      const memo = new MemoBuilder()
        .id('testID')
        .channelId('testChannelId')
        .index(0)
        .title('')
        .body('')
        .build();
      let title = textGenerator(141);
      memo.editTitle(title);
      expect(memo.title).toBe('');
      title = textGenerator(140);
      memo.editTitle(title);
      expect(memo.title).toBe(title);
    });
    it('本文は140文字しか与えることができない', () => {
      let body = textGenerator(141);
      let memo = new MemoBuilder()
        .id('testID')
        .channelId('testChannelId')
        .index(0)
        .title('')
        .body(body)
        .build();
      expect(memo.body).toBe('');

      body = textGenerator(140);
      memo = new MemoBuilder()
        .id('testID')
        .channelId('testChannelId')
        .index(0)
        .title('')
        .body(body)
        .build();
      expect(memo.body).toBe(body);
    });
    it('編集するとき本文は140文字しか入力できない', () => {
      const memo = new MemoBuilder()
        .id('testID')
        .channelId('testChannelId')
        .index(0)
        .title('')
        .body('')
        .build();
      let body = textGenerator(141);
      memo.editBody(body);
      expect(memo.body).toBe('');
      body = textGenerator(140);
      memo.editBody(body);
      expect(memo.body).toBe(body);
    });
  });
});
