import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase.js';

export async function addArticle({ titre, contenu }) {
  const docRef = await addDoc(collection(db, 'articles'), { titre, contenu });
  return docRef.id;
}

export async function getArticles() {
  const snapshot = await getDocs(collection(db, 'articles'));
  const articles = [];
  snapshot.forEach(doc => {
    articles.push({ id: doc.id, ...doc.data() });
  });
  return articles;
}
