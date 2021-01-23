// import _ from 'lodash';
import { TITLE_LENGTH_MAX, BODY_LENGTH_MAX } from 'src/classes/Memo';
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
    it('タイトルは設定した文字数しか与えることができない', () => {
      let title = textGenerator(TITLE_LENGTH_MAX + 1);
      let memo = new MemoBuilder()
        .id('testID')
        .channelId('testChannelId')
        .index(0)
        .title(title)
        .body('')
        .build();
      expect(memo.title).toBe('');

      title = textGenerator(TITLE_LENGTH_MAX);
      memo = new MemoBuilder()
        .id('testID')
        .channelId('testChannelId')
        .index(0)
        .title(title)
        .body('')
        .build();
      expect(memo.title).toBe(title);
    });
    it('編集するときタイトルは設定した文字数しか入力できない', () => {
      const memo = new MemoBuilder()
        .id('testID')
        .channelId('testChannelId')
        .index(0)
        .title('')
        .body('')
        .build();
      let title = textGenerator(TITLE_LENGTH_MAX + 1);
      memo.editTitle(title);
      expect(memo.title).toBe('');
      title = textGenerator(TITLE_LENGTH_MAX);
      memo.editTitle(title);
      expect(memo.title).toBe(title);
    });
    it('本文は設定した文字数しか与えることができない', () => {
      let body = textGenerator(BODY_LENGTH_MAX + 1);
      let memo = new MemoBuilder()
        .id('testID')
        .channelId('testChannelId')
        .index(0)
        .title('')
        .body(body)
        .build();
      expect(memo.body).toBe('');

      body = textGenerator(BODY_LENGTH_MAX);
      memo = new MemoBuilder()
        .id('testID')
        .channelId('testChannelId')
        .index(0)
        .title('')
        .body(body)
        .build();
      expect(memo.body).toBe(body);
    });
    it('編集するとき本文は設定した文字数しか入力できない', () => {
      const memo = new MemoBuilder()
        .id('testID')
        .channelId('testChannelId')
        .index(0)
        .title('')
        .body('')
        .build();
      let body = textGenerator(BODY_LENGTH_MAX + 1);
      memo.editBody(body);
      expect(memo.body).toBe('');
      body = textGenerator(BODY_LENGTH_MAX);
      memo.editBody(body);
      expect(memo.body).toBe(body);
    });
  });
});
