import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import { withSession } from '../../context/session';
import { People } from '../../helper/routes.helper';

function ExploreComponent({ user }) {
    useEffect(() => {
      document.title = "Instagram";
    }, []);
  
    return (
      <div className="bg-gray-100 space-y-16 h-screen">
        <Header user={user} />
        <main className="py-4">
          <div className="">
           <People />
          </div>
        </main>
      </div>
    );
  }
  const ExplorePage = withSession(ExploreComponent);
  export default ExplorePage;
  