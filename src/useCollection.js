import { useState, useEffect } from 'react'
import { db } from './firebase'

export function useCollection(path, orderBy) {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    let collection = db.collection(path)
    if (orderBy) {
      collection = collection.orderBy(orderBy)
    }
    return collection.onSnapshot(snapshot => {
      const docs = []
      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id
        })
      })
      setDocs(docs)
    })
  }, [orderBy, path])
  return docs
}
