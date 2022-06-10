import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import ReactPaginate from 'react-paginate';

import { TransactionService } from '@/services/DatabaseService'
import PageHeading from '@/components/ui/PageHeading'
import TransactionList from '@/components/transaction/List'
import Alert from '@/components/ui/Alert'
import styled from 'styled-components';

const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active', // default to "disabled"
})`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li {
    background-color: transparent;
  }
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #152747;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
const LIMIT_PER_PAGE = 10;
function ScreenTransactionList() {
  const { data, isLoading, error, status } = useQuery(
    'transactions',
    TransactionService.getAll
  )

  const [totalTransactions, setTotalTransactions] = useState([])
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const queryClient = useQueryClient()

  const deleteMutation = useMutation((id) => TransactionService.remove(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions')
    },
  })

  const deleteAction = (id) => {
    deleteMutation.mutateAsync(id)
  }

  const getFilteredTransactions = async (filters) => {

    if ((filters.accountName.length > 0)) {
      const data = await TransactionService.getFilteredAll(filters)
      setTotalTransactions(data)
      setCurrentTransactions(data.slice(0, LIMIT_PER_PAGE))
      setPageCount(Math.ceil(data.length / LIMIT_PER_PAGE))
    } else {
      setPageCount(Math.ceil(data.length / LIMIT_PER_PAGE))
      setTotalTransactions(data)
      setCurrentTransactions(data.slice(0, LIMIT_PER_PAGE))
    }
  }

  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data.length / LIMIT_PER_PAGE))
      setCurrentTransactions(data.slice(0, LIMIT_PER_PAGE))
    }
  }, [data])

  const handlePageClick = async (ev) => {
    const { selected } = ev
    if (totalTransactions.length > 0) {
      setCurrentTransactions(totalTransactions.slice(LIMIT_PER_PAGE * selected, LIMIT_PER_PAGE * (selected + 1)))
    } else {
      setCurrentTransactions(data.slice(LIMIT_PER_PAGE * selected, LIMIT_PER_PAGE * (selected + 1)))
    }
  };

  return (
    <>
      <PageHeading title="My Transactions" />
      <div className="mt-12">
        {error && <Alert type="error" message={error.message} />}
        {isLoading && (
          <Alert
            type="info"
            message="Loading..."
            innerClass="animate animate-pulse"
          />
        )}
        {status === 'success' && (
          <TransactionList transactions={currentTransactions} getFilteredTransactions={getFilteredTransactions} deleteAction={deleteAction} />
        )}

        <div className="flex items-center space-x-1">
          <MyPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </>
  )
}

export default ScreenTransactionList
