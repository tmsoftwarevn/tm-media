import { useLocation } from "react-router-dom";


const DichVuMedia = () =>{
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let id = params.get("id");
  return(
    <>
      <div>
        media is {id}
      </div>
    </>
  )
}

export default DichVuMedia;