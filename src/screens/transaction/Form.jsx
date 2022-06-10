import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { TransactionService } from '@/services/DatabaseService'

import PageHeading from '@/components/ui/PageHeading'
import TransactionForm from '@/components/transaction/Form'
import Alert from '@/components/ui/Alert'

function ScreenTransactionForm() {
  const { id } = useParams()
  const { data, isLoading, error, status } = useQuery(
    ['transaction', { id }],
    TransactionService.getOne
  )

  const queryClient = useQueryClient()

  const saveData = (data) => {
    if (id) {
      return TransactionService.update(id, data)
    } else {
      TransactionService.create(data)
    }
  }

  const mutation = useMutation((data) => saveData(data), {
    onSuccess: () => {
      if (id) queryClient.invalidateQueries(['transaction', { id }])
    },
  })

  const { isSuccess } = mutation

  const onSubmit = async (submittedData) => {
    mutation.mutate(submittedData)
  }

  if (isSuccess) {
    return <Redirect to="/transaction" />
  }

  if (!id) {
    return (
      <>
        <PageHeading title="Create Transaction" />
        <div className="mt-12">
          {error && <Alert type="error" message={error.message} />}
          <TransactionForm transaction={{ transactionType: 'notransactiontype', accountName: 'noaccountname' }} submit={onSubmit} />
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeading title={`Transaction ${data?.account}`} />
      <div className="mt-12">
        {error && <Alert type="error" message={error.message} />}
        {isLoading && (
          <Alert
            type="info"
            message="Loading..."
            innerClass="animate animate-pulse"
          />
        )}
        {status === 'success' && <TransactionForm transaction={data} submit={onSubmit} />}
      </div>
    </>
  )
}

export default ScreenTransactionForm
