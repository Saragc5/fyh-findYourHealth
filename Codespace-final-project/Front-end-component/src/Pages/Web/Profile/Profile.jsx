import React from 'react';
import ProfileProf from './Profiles/ProfileProf';
import ProfileClient from './Profiles/ProfileClient';


export default function Profile(categoryProf) {

  if (categoryProf === true) {

    return (
      <div>
        <ProfileProf />
      </div>
    )
  } else {
    return (
      <div>
        <ProfileClient />
      </div>
    )
  }
}
  
