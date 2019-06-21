import { useState, useEffect } from 'react'
import { db } from './firebase'

export function useDoc(path) {
  const [doc, setDoc] = useState()
  useEffect(() => {
    let stillMounted = true

    db.doc(path)
      .get()
      .then(doc => {
        if (stillMounted) {
          setDoc({
            ...doc.data(),
            id: doc.id
          })
        }
      })
    return () => {
      stillMounted = false
    }
  }, [path])
  return doc
}
