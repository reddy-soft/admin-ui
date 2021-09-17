import {Component} from 'react'

import UserItem from '../UserItem'
import Pagination from '../Pagination'

import './index.css'

const apiUrl =
  'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'

class AdminUi extends Component {
  state = {searchInputVal: '', membersData: [], isChecked: false, activePage: 1}

  componentDidMount() {
    this.getUsers()
  }

  getUpdatedUsersData = data => {
    const {isChecked} = this.state
    return {...data, isChecked}
  }

  getUsers = async () => {
    const options = {
      method: 'GET',
    }
    const userResponse = await fetch(apiUrl, options)
    const fetchedData = await userResponse.json()
    const updatedUserData = fetchedData.map(eachData =>
      this.getUpdatedUsersData(eachData),
    )

    this.setState({membersData: updatedUserData})
  }

  onClickCheckbox = id => {
    const {membersData} = this.state
    const updatedStatusOfUser = membersData.map(eachData => {
      if (eachData.id === id) {
        return {...eachData, isChecked: !eachData.isChecked}
      }
      return eachData
    })
    this.setState({membersData: updatedStatusOfUser})
  }

  checkItemsOfUsers = () => {
    const {membersData} = this.state
    const updatesUsersStatus = membersData.map(eachData => ({
      ...eachData,
      isChecked: !eachData.isChecked,
    }))
    this.setState({membersData: updatesUsersStatus})
  }

  onChangeSearchInputValue = event => {
    this.setState({searchInputVal: event.target.value})
  }

  deleteUser = id => {
    const {membersData} = this.state
    const updatedUsers = membersData.filter(eachData => eachData.id !== id)
    this.setState({membersData: updatedUsers})
  }

  onDeleteSelectedUsers = data => {
    this.setState({
      membersData: data.filter(eachData => eachData.isChecked !== true),
    })
  }

  onchangeToNextPage = () => {
    this.setState(prevState => ({activePage: prevState.activePage + 1}))
  }

  onChangeToPreviousPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(prevState => ({activePage: prevState.activePage - 1}))
    }
  }

  onChangeToFirstPage = () => {
    this.setState({activePage: 1})
  }

  onChangeToLastPage = count => {
    this.setState({activePage: count})
  }

  render() {
    const {searchInputVal, membersData, activePage} = this.state

    const userSearchList = membersData.filter(
      eachData =>
        eachData.role.toLowerCase().includes(searchInputVal) ||
        eachData.name.toLowerCase().includes(searchInputVal) ||
        eachData.email.toLowerCase().includes(searchInputVal),
    )

    const totalActivePageCount = Math.ceil(userSearchList.length / 10)

    const offset = (activePage - 1) * 10

    const userData = userSearchList.splice(offset, 10)

    return (
      <div className="admin-app-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search by name, email or role"
          onChange={this.onChangeSearchInputValue}
          value={searchInputVal}
        />
        <div className="admin-users-header-container">
          <input
            type="checkbox"
            className="users-checkbox"
            onClick={this.checkItemsOfUsers}
          />
          <h1 className="user-heading">Name</h1>
          <h1 className="user-heading">Email</h1>
          <h1 className="user-heading">Role</h1>
          <h1 className="user-heading">Actions</h1>
        </div>
        <hr />
        <ul className="users-list">
          {userData.map(user => (
            <UserItem
              key={user.id}
              userDetails={user}
              deleteUser={this.deleteUser}
              onClickCheckbox={this.onClickCheckbox}
            />
          ))}
        </ul>
        <Pagination
          onDeleteSelectedUsers={this.onDeleteSelectedUsers}
          activePage={activePage}
          userData={userData}
          totalActivePageCount={totalActivePageCount}
          onchangeToNextPage={this.onchangeToNextPage}
          onChangeToPreviousPage={this.onChangeToPreviousPage}
          onChangeToFirstPage={this.onChangeToFirstPage}
          onChangeToLastPage={this.onChangeToLastPage}
        />
      </div>
    )
  }
}

export default AdminUi
