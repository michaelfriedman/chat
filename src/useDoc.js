import { useState, useEffect } from 'react'
import { db } from './firebase'

export default function useDoc(path) {
  const [doc, setDoc] = useState(null)
  useEffect(() => {
    return db.doc(path).onSnapshot(doc => {
      setDoc({
        ...doc.data(),
        id: doc.id
      })
    })
  }, [path])
  return doc
}
