import React, { useContext } from 'react'
import { UserContext } from './Settings'

const Profile = () => {

    const user = useContext(UserContext)

  return (
    <div>
        <h2>hello {user.name}</h2>

    </div>
  )
}

export default Profile