import { describe, it, expect, vi } from 'vitest';

vi.mock('./firebase.js', () => ({ db: {} }));
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => 'colRef'),
  addDoc: vi.fn(async () => ({ id: '1' })),
  getDocs: vi.fn(async () => ({
    forEach: cb => cb({ id: '1', data: () => ({ titre: 'Salut', contenu: 'Mon texte' }) }),
  })),
}));

import { addArticle, getArticles } from './articles.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

describe('articles firestore', () => {
  it('adds an article', async () => {
    const id = await addArticle({ titre: 'Salut', contenu: 'Mon texte' });
    expect(collection).toHaveBeenCalledWith({}, 'articles');
    expect(addDoc).toHaveBeenCalledWith('colRef', { titre: 'Salut', contenu: 'Mon texte' });
    expect(id).toBe('1');
  });

  it('retrieves articles', async () => {
    const articles = await getArticles();
    expect(collection).toHaveBeenCalledWith({}, 'articles');
    expect(getDocs).toHaveBeenCalledWith('colRef');
    expect(articles).toEqual([{ id: '1', titre: 'Salut', contenu: 'Mon texte' }]);
  });
});
