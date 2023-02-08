import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import {db} from '../firestore/config';

const getAllCategories = async () => {
  let categoryList = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    querySnapshot.forEach(doc => {
      const categoryObj = doc.data();
      categoryList.push({...categoryObj, _id: doc.id});
    });
    return {data: categoryList, err: null};
  } catch (err) {
    return {data: null, err: 'SOMETHING WENT WRONG'};
  }
};

const addNewCategory = async categoryName => {
  try {
    const res = await getAllCategories();
    const dataRef = res?.data?.filter(cat => {
      return cat?.name?.toLowerCase() === categoryName?.toLowerCase();
    });
    if (dataRef?.length > 0) {
      return {data: null, err: 'Category Allready Exists'};
    }
    const docRef = await addDoc(collection(db, 'categories'), {
      name: categoryName,
    });
    return {data: true, err: ''};
  } catch (e) {
    console.log('err', e);
    return {data: null, err: 'SOMETHING WENT WRONG'};
  }
};

// const upDateCategory = async (docID, updatedName, prevName) => {
//   try {
//     await setDoc(doc(db, 'categories', docID), {name: updatedName});

//     return {data: true, err: null};
//   } catch (e) {
//     console.error('Error adding document: ', e);
//     return {data: null, err: 'SOMETHING WENT WRONG'};
//   }
// };

const deleteCategory = async docID => {
  if (docID) {
    try {
      const docRef = await deleteDoc(doc(db, 'categories', docID));
      return {data: true, err: null};
    } catch (e) {
      console.log('err', e);
      return {data: null, err: 'SOMETHING WENT WRONG'};
    }
  }
};

export {addNewCategory, getAllCategories, deleteCategory};
