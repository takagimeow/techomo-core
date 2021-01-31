import { parseUniToMultiDimensional } from 'src/utils/parser';
import { BODY_LENGTH_MAX } from 'src/constants';
import { MemoBuilder } from 'src/classes/MemoBuilder';
import { textGenerator } from 'src/testUtils/textGenerator';
import _ from 'lodash';

describe('一次元から多次元の配列に変換する関数', () => {
  it.todo('groupIDで指定されているidを持つインスタンスが持つ配下に所属する');
  it('id:parentMemoをgroupIdに持つメモが2つ存在する場合parentがid:parentMemoでchildrenに要素を2つ持つ配列があるオブジェクトが返される', () => {
    const parentMemo = new MemoBuilder()
      .id('parentMemo')
      .groupId('memo')
      .index(0)
      .name('')
      .body('')
      .color('')
      .build();
    let body = textGenerator(BODY_LENGTH_MAX);
    parentMemo.editBody(body);
    const children = ['childeMemoA', 'childMemoB'].map((id) => {
      body = textGenerator(BODY_LENGTH_MAX);
      const memo = new MemoBuilder()
        .id(id)
        .groupId(parentMemo.id || '')
        .index(0)
        .name('')
        .body(body)
        .color('')
        .build();
      return memo;
    });
    const uniDimensional = _.flattenDeep([parentMemo, ...children]);
    expect(uniDimensional.length).toBe(3);
    const multiDimensional = parseUniToMultiDimensional(uniDimensional, uniDimensional, '', [
      'parentMemo',
    ]);
    expect(multiDimensional.length).toBe(1);
    expect(multiDimensional[0].children.length).toBe(2);
  });

  /**
   * parentMemo
   *  memoA
   *    memoA_0
   *    memoB_0
   *  memoB
   *    memoA_1
   *    memoB_1
   */
  it('上記のような構造を一元化した配列を渡されたときに、上記の形に復元することができる', () => {
    const parentMemo = new MemoBuilder()
      .id('parentMemo')
      .groupId('memo')
      .index(0)
      .name('')
      .body('')
      .color('')
      .build();
    let body = textGenerator(BODY_LENGTH_MAX);
    parentMemo.editBody(body);
    const childrenA = ['childeMemoA', 'childeMemoB'].map((id, index) => {
      body = textGenerator(BODY_LENGTH_MAX);
      const childrenAMemo = new MemoBuilder()
        .id(id)
        .groupId(parentMemo.id || '')
        .index(0)
        .name('')
        .body(body)
        .color('')
        .build();
      const childrenAA = [`childeMemoA_${index}`, `childeMemoB_${index}`].map(
        (childrenAAMemoId) => {
          body = textGenerator(BODY_LENGTH_MAX);
          const childrenAAMemo = new MemoBuilder()
            .id(childrenAAMemoId)
            .groupId(childrenAMemo.id || '')
            .index(0)
            .name('')
            .body(body)
            .color('')
            .build();

          return childrenAAMemo;
        },
      );
      return _.flattenDeep([childrenAMemo, ...childrenAA]);
    });
    const uniDimensional = _.flattenDeep([parentMemo, ...childrenA]);
    const result = parseUniToMultiDimensional(uniDimensional, uniDimensional, '', ['parentMemo']);
    console.log('result: ', result[0].children[1].children[1]);
    expect(result[0].children[0].children.length).toBe(2);
  });
});
