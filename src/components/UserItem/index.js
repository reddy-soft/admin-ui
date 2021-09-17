import {BiEdit} from 'react-icons/bi'
import {RiDeleteBin7Line} from 'react-icons/ri'

import './index.css'

const UserItem = props => {
  const {userDetails, deleteUser, onClickCheckbox} = props
  const {name, email, role, id, isChecked} = userDetails

  const removeUser = () => {
    deleteUser(id)
  }

  const onSelectUser = () => {
    onClickCheckbox(id)
  }

  const editAccessOfUser = () => {
    document.getElementById(`name${id}`).contentEditable = 'true'
    document.getElementById(`mail${id}`).contentEditable = 'true'
    document.getElementById(`role${id}`).contentEditable = 'true'
  }

  return (
    <li className="user-details-container">
      <div
        className={`admin-users-container ${isChecked ? 'checked-user' : ''}`}
      >
        <input
          type="checkbox"
          className="user-checkbox"
          onChange={onSelectUser}
          checked={isChecked}
        />
        <p className="user-details" id={`name${id}`}>
          {name}
        </p>
        <p className="user-details" id={`mail${id}`}>
          {email}
        </p>
        <p className="user-details" id={`role${id}`}>
          {role}
        </p>
        <p className="user-details">
          <button type="button" className="user-icons">
            <BiEdit className="edit-icon" onClick={editAccessOfUser} />
          </button>
          <button type="button" className="user-icons">
            <RiDeleteBin7Line className="delete-icon" onClick={removeUser} />
          </button>
        </p>
      </div>
      <hr className="seperation-line" />
    </li>
  )
}

export default UserItem
