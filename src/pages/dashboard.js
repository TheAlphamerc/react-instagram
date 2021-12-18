import {useEffect} from "react";
import * as Components from "../components/index";

function Dashbaord(){
useEffect(() => {
    document.title = "Instagram";
});

   return (
       <div className="bg-gray-100 h-screen">
            <Components.Header/>
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
               <Components.Timeline/>
               <Components.Sidebar/>
            </div>
       </div>
    );
}

export default  Dashbaord;