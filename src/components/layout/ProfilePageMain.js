import React from 'react';
import {Outlet} from 'react-router-dom'
import ProfileSideBar from './ProfileSideBar';

const ProfilePageMain = () => {
    return (
        <div className='flex max-w-[1080px] mx-auto md:flex-row flex-col gap-10 justify-between'>
            <ProfileSideBar></ProfileSideBar>
            <Outlet></Outlet>
        </div>
    );
};

export default ProfilePageMain;