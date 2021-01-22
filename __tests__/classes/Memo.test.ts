// import _ from 'lodash';
import { MemoBuilder } from 'src/classes/MemoBuilder';

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
});
