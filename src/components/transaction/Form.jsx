import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Alert from '@/components/ui/Alert'

const schema = yup.object().shape({
  account: yup.string().label('account').required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(8, 'Must be exactly 8 digits')
    .max(8, 'Must be exactly 8 digits'),
  accountName: yup.string().label('accountName').required(),
  currencyCode: yup.string().label('currencyCode').required().min(3).max(20),
  amount: yup.number().label('amount').required().positive(),
  transactionType: yup.string().label('transactionType').required(),
})

function TransactionForm({ transaction, submit }) {
  const [errorMsg, setErrorMsg] = useState('')
  const [mode, setMode] = useState(false)
  const location = useLocation();

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const transactionTypes = ['deposit', 'withdrawal', 'invoice', 'payment']
  const accountNames = ['Savings Account', 'Checking Account', 'Auto Loan Account', 'Credit Card Account', 'Investment Account', 'Personal Loan Account', 'Money Market Account', 'Home Loan Account']
  const watchTransactionType = watch('transactionType')
  const watchAccountName = watch('accountName')

  // Load current transaction if available
  useEffect(() => {
    if (location.pathname.includes('view')) {
      setMode(true)
    }
    reset(transaction)
  }, [reset])

  const tTypePrinter = (tType) => {
    return tType.charAt(0).toUpperCase() + tType.slice(1)
  }

  const onSubmit = (submittedData) => {
    try {
      submit(submittedData)
    } catch (err) {
      setErrorMsg(err.message)
    }
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {errorMsg && <Alert type="error" message={errorMsg} />}

        <div className="form-control">
          <label className="label" htmlFor="account">
            <span className="label-text">Account No.</span>
          </label>
          <input
            type="number"
            autoComplete="off"
            disabled={mode ? true : false}
            {...register('account')}
            className={`input input-bordered ${errors.account && 'input-error'}`}
          />
          {errors.account && (
            <span className="mt-1 text-xs text-error">
              {errors.account.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="accountName">
            <span className="label-text">{mode ? 'Account Name' : 'Select Account Name'}</span>
          </label>
          <div className="flex items-center">
            <select
              {...register('accountName')}
              value={watchAccountName}
              disabled={mode ? true : false}
              className={`select select-bordered w-full ${errors.accountName ? 'select-error' : ''
                }`}
            >
              <option disabled="disabled" value="noaccountname">
                Choose an Account Name
              </option>
              {accountNames && accountNames.map((aName, index) => (
                <option key={index} value={aName}>
                  {aName}
                </option>
              ))}
            </select>
          </div>
          {errors.accountName && (
            <span className="mt-1 text-xs text-error">
              {errors.accountName.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="currencyCode">
            <span className="label-text">Currency Code</span>
          </label>
          <input
            type="text"
            autoComplete="off"
            disabled={mode ? true : false}
            {...register('currencyCode')}
            className={`input input-bordered ${errors.currencyCode && 'input-error'}`}
          />
          {errors.currencyCode && (
            <span className="mt-1 text-xs text-error">
              {errors.currencyCode.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="amount">
            <span className="label-text">Amount</span>
          </label>
          <input
            type="number"
            step="0.01"
            autoComplete="off"
            disabled={mode ? true : false}
            {...register('amount')}
            className={`input input-bordered ${errors.amount && 'input-error'}`}
          />
          {errors.amount && (
            <span className="mt-1 text-xs text-error">
              {errors.amount.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="transactionType">
            <span className="label-text">{mode ? 'Transaction Type' : 'Select Transaction Type'}</span>
          </label>
          <div className="flex items-center">
            <select
              {...register('transactionType')}
              disabled={mode ? true : false}
              value={watchTransactionType}
              className={`select select-bordered w-full ${errors.transactionType ? 'select-error' : ''
                }`}
            >
              <option disabled="disabled" value="notransactiontype">
                Choose a Transaction Type
              </option>
              {transactionTypes && transactionTypes.map((tType, index) => (
                <option key={index} value={tType}>
                  {tTypePrinter(tType)}
                </option>
              ))}
            </select>
          </div>
          {errors.transactionType && (
            <span className="mt-1 text-xs text-error">
              {errors.transactionType.message}
            </span>
          )}
        </div>

        {!mode ?
          <div className="flex justify-end space-x-4">
            <button type="submit" className="btn btn-primary btn-sm w-24">
              Save
            </button>
            <Link to="/transaction" className="btn btn-outline btn-sm w-24">
              Cancel
            </Link>
          </div>
          : <></>}

      </form>
    </div>
  )
}

export default TransactionForm
