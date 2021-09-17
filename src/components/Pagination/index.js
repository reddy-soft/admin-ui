import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineRight,
  AiOutlineLeft,
} from 'react-icons/ai'

import './index.css'

const Pagination = props => {
  const {
    userData,
    onDeleteSelectedUsers,
    activePage,
    onchangeToNextPage,
    onChangeToPreviousPage,
    totalActivePageCount,
    onChangeToFirstPage,
    onChangeToLastPage,
  } = props

  const changeToLastPage = () => {
    onChangeToLastPage(totalActivePageCount)
  }

  const onDeleteUsers = () => {
    onDeleteSelectedUsers(userData)
  }

  return (
    <div className="pagination-container">
      <button
        type="button"
        className="delete-all-button"
        onClick={onDeleteUsers}
      >
        Delete Selected
      </button>

      <div className="pagination-buttons-container">
        <button
          type="button"
          className={`pagination-navigation-button ${
            activePage <= 1 ? 'light-button' : ''
          }`}
        >
          <AiOutlineDoubleLeft onClick={onChangeToFirstPage} />
        </button>
        <button
          type="button"
          className={`pagination-navigation-button ${
            activePage <= 1 ? 'light-button' : ''
          }`}
        >
          <AiOutlineLeft onClick={onChangeToPreviousPage} />
        </button>
        <button type="button" className="pagination-navigation">
          {activePage} of {totalActivePageCount}
        </button>
        <button
          type="button"
          className={`pagination-navigation-button ${
            activePage >= totalActivePageCount ? 'light-button' : ''
          }`}
        >
          <AiOutlineRight onClick={onchangeToNextPage} />
        </button>
        <button
          type="button"
          className={`pagination-navigation-button ${
            activePage >= totalActivePageCount ? 'light-button' : ''
          }`}
        >
          <AiOutlineDoubleRight onClick={changeToLastPage} />
        </button>
      </div>
    </div>
  )
}

export default Pagination
