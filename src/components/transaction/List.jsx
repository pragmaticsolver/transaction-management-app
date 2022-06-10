import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CreditCardIcon,
  PencilAltIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/outline'

import EmptyState from '@/components/ui/EmptyState'
import DeleteModal from '@/components/ui/DeleteModal'

function TransactionList({ transactions = [], deleteAction, getFilteredTransactions }) {

  const [selected, setSelected] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [filters, setFilters] = useState({ transactionType: [], accountName: [] })

  // const transactionTypes = ['deposit', 'withdrawal', 'invoice', 'payment']
  const accountNames = ['Savings Account', 'Checking Account', 'Auto Loan Account', 'Credit Card Account', 'Investment Account', 'Personal Loan Account', 'Money Market Account', 'Home Loan Account']

  const showDeleteModal = (id) => {
    setSelected(id)
    setOpenModal(true)
  }

  const deleteModalAction = () => {
    deleteAction(selected)
    setOpenModal(false)
  }

  const cancelModalAction = () => {
    setOpenModal(false)
  }

  const handleFilterChange = (e) => {
    const { target: { name, value, checked } } = e
    if (checked) {
      setFilters((prev) => ({
        ...prev,
        [name]: [...prev[name], value]
      }))
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: prev[name].filter(item => item !== value)
      }))
    }
  }

  useEffect(() => {
    getFilteredTransactions(filters)
  }, [filters])

    if (!transactions || transactions.length == 0) {
    return (
      <EmptyState
        icon={CreditCardIcon}
        title="No transactions"
        message="Start by adding a new transaction"
        btnLabel="Add Transaction"
        link="/transaction/create"
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <DeleteModal
        open={openModal}
        deleteAction={deleteModalAction}
        cancelAction={cancelModalAction}
      />
      <div className="mb-4 flex justify-between">
        <Link to="/transaction/create" className="btn btn-secondary btn-sm">
          <CreditCardIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
          New Transaction
        </Link>
      </div>

      <div className="grid grid-cols-6 mt-6">

        <div className="col-start-1 col-end-2">
          <div className="w-48 p-4 place-items-center bg-neutral rounded-box w-36">
            <h3 className="text-lg font-bold mb-2">Account Name</h3>
            {accountNames && accountNames.map((aName, index) => (
              <div key={index} className="pt-1">
                <input type="checkbox" className="rounded" name="accountName" value={aName} onChange={handleFilterChange} />
                <label className='ml-2'>{aName}</label>
              </div>
            ))}
          </div>

          <br />

          {/* <div className="w-48 p-4 place-items-center bg-neutral rounded-box w-36">
            <h3 className="text-lg font-bold mb-2">Transaction Type</h3>
            {transactionTypes && transactionTypes.map((tType, index) => (
              <div key={index} className="pt-1">
                <input type="checkbox" className="rounded" name="transactionType" value={tType} onChange={handleFilterChange} />
                <label className='ml-2'>{tType}</label>
              </div>
            ))}
          </div> */}
        </div>

        <div className="col-end-7 col-span-5">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ACCOUNT NO.</th>
                <th>ACCOUNT NAME</th>
                <th>CURRENCY</th>
                <th>AMOUNT</th>
                <th>TRANSACTION TYPE</th>
                <th scope="col">
                  <span className="sr-only">View</span>
                </th>
                <th scope="col">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>

                  <td>{transaction.account}</td>
                  <td>{transaction.accountName}</td>
                  <td>{transaction.currencyCode}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.transactionType}</td>
                  <td>
                    <Link
                      to={`/transaction/view/${transaction.id}`}
                      className="text-primary hover:text-primary-focus"
                      title={`View ${transaction.account}`}
                    >
                      <EyeIcon
                        className="w-5 h-5 mr-2 -ml-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/transaction/edit/${transaction.id}`}
                      className="text-primary hover:text-primary-focus"
                      title={`Edit ${transaction.account}`}
                    >
                      <PencilAltIcon
                        className="w-5 h-5 mr-2 -ml-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      title={`Delete ${transaction.account}`}
                      className="text-secondary-content"
                      onClick={() => showDeleteModal(transaction.id)}
                    >
                      <TrashIcon
                        className="w-5 h-5 mr-2 -ml-1"
                        aria-hidden="true"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default TransactionList
