import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db }                               from '../firebase'

export const useFirestore = (collectionName) => {
  const collectionRef = collection(db, collectionName)

  const getAll = async () => {
    try {
      const result = await getDocs(collectionRef)
      return result.docs.map((element) => (
        { ...element.data(), id: element.id }
      ))
    }
    catch (e) {
      return []
    }
  }
  const getById = async (id) => {
    const docRef = doc(db, collectionName, id)
    try {
      const result = await getDoc(docRef)
      return result.data()
    }
    catch (e) {
      return undefined
    }
  }
  return { getAll, getById }
}