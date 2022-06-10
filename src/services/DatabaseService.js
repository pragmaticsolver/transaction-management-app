import { db, documentId } from '@/firebase'

class DatabaseService {
  collection

  constructor(collectionName) {
    this.collection = db.collection(collectionName)
  }

  getAll = async () => {
    const snapshot = await this.collection.orderBy(documentId).limit(100).get();
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
  }

  getFilteredAll = async (filters) => {
    let ref = this.collection
    if (filters.accountName.length > 0) {
      ref = ref.where('accountName', 'in', filters.accountName)
    }
    const snapshot = await ref.orderBy(documentId).limit(100).get();
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
  }

  getOne = async ({ queryKey }) => {
    const { id } = queryKey[1]
    if (!id) return
    const snapshot = await this.collection.doc(id).get()
    return snapshot.data()
  }

  getReference = async (documentReference) => {
    const res = await documentReference.get()
    const data = res.data()

    if (data && documentReference.id) {
      data.uid = documentReference.id
    }

    return data
  }

  create = async (data) => {
    data.bic = "test-WQNICWJ1"
    data.iban = "test-RS27197003783280110014"
    data.currencySymbol = "test-₡"
    data.currencyName = "test-currencyName"
    data.mask = "test-mask"
    return await this.collection.add(data)
  }

  update = async (id, data) => {
    return await this.collection.doc(id).update(data)
  }

  remove = async (id) => {
    return await this.collection.doc(id).delete()
  }
}

export const TransactionService = new DatabaseService('transactions')
