import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import {db} from '../firestore/config';
import {getStoreData, setStoreData} from '../hooks/Storage';

const mappedCat = categoryName => {
  let collectionName = `${categoryName}-questions`;
  if (categoryName === 'General Knowledge') {
    collectionName = `GK-questions`;
  }
  return collectionName;
};

const shuffleList = list => {
  let shuffeldList = [...list];
  try {
    return shuffeldList
      .map(value => ({value, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({value}) => value);
  } catch (e) {
    return shuffeldList;
  }
};

//GET All Questions
const getQuestions = async categoryName => {
  const collectionName = mappedCat(categoryName);
  const questionsList = [];
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach(doc => {
      const questionObj = doc.data();
      questionsList.push({...questionObj, _id: doc.id});
    });
    questionsList;
    setStoreData(`total-${collectionName}-questions`, +questionsList.length);
    const newquestionsList = shuffleList(questionsList);
    const filterdQues = newquestionsList.slice(0, 20);
    return {data: filterdQues, err: null};
  } catch (err) {
    return {data: null, err: 'SOMETHING WENT WRONG'};
  }
};

//ADD new question
const addnewQuestion = async (questionObj, categoryName) => {
  const collectionName = mappedCat(categoryName);
  const value = getStoreData(`total-${collectionName}-questions`);
  if (value > 30) {
    return {data: null, err: 'LIMIT EXCEEDS : 30'};
  }
  try {
    const docRef = await addDoc(collection(db, collectionName), questionObj);
    return {data: true, err: null};
  } catch (e) {
    return {data: null, err: 'SOMETHING WENT WRONG'};
  }
};

//EDIT question
const editQuestion = async (updatedQuestionObj, categoryName) => {
  const {_id} = updatedQuestionObj;
  const collectionName = mappedCat(categoryName);
  try {
    await setDoc(doc(db, collectionName, _id), {...updatedQuestionObj});
    console.log('success');
    return {data: true, err: null};
  } catch (e) {
    console.log('error', e);
    return {data: null, err: `SOMETHING WENT WRONG`};
  }
};

//DELETE question
const deleteQuestion = async (questionObj, categoryName) => {
  try {
    const collectionName = mappedCat(categoryName);
    const {_id} = questionObj;
    if (_id) {
      const docRef = await deleteDoc(doc(db, collectionName, _id));
      return {data: true, err: null};
    } else {
      return {data: null, err: 'SOMETHING WENT WRONG'};
    }
  } catch (e) {
    console.log('err1 -> ', e);
    return {data: null, err: 'SOMETHING WENT WRONG'};
  }
};

export {getQuestions, addnewQuestion, editQuestion, deleteQuestion};
