import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Timeline(){
   return (
     <div className="container col-span-2">
         <Skeleton count={10} height={220} />
     </div>
    );
}

export default  Timeline;