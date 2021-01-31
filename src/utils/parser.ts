import { Base } from 'src/classes/Base';
import _ from 'lodash';

type Relationship<T extends Base> = {
  parent: T;
  children: Relationship<T>[];
};

/**
 * allCollectionの要素をひとつずつ取り出し、idを使ってフィルタリングし、subCollectionを生成する
 * そのsubCollectionと取り出された要素（のちのparentフィールドの値）をもとに生成したbreadclumbsを再帰的に渡して、
 * 全階層の構造化を行う
 *
 * @param allCollection すべてのリスト
 * @param subCollection すべてのリストから抽出されたリスト
 * @param breadclumbs 現在の履歴
 * @param groupIds 一番上の階層にいる親のIDのリスト
 */
export function parseUniToMultiDimensional<T extends Base>(
  allCollection: T[],
  subCollection: T[],
  breadclumbs: string,
  groupIds: string[],
): Relationship<T>[] {
  const result = subCollection.map((document) => {
    const { id } = document;
    let exists = false;
    groupIds.forEach((groupId) => {
      if (groupId === id) exists = true;
    });

    if (exists || breadclumbs.split('/').length >= 2) {
      const newBreadclumbs = `${breadclumbs}/${id}`;
      const newSubCollection = _.filter(allCollection, { groupId: id }) as T[];
      const children = parseUniToMultiDimensional(
        allCollection,
        newSubCollection,
        newBreadclumbs,
        groupIds,
      );
      return {
        parent: document,
        children,
      };
    }
    return null;
  });

  return _.remove(result, null) as Relationship<T>[];
}
