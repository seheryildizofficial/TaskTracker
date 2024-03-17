import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setJobs, setError } from "../redux/slices/jobSlice";
import axios from "axios";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Filter from "../components/Filter";
const JobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.jobSlice);

  //data yı stora aktarır
  const fetchData = () => {
    //yüklenme durumunu günceller
    dispatch(setLoading());

    axios
      .get("http://localhost:4003/jobs")
      //data gelirse stora aktarır
      .then((res) => dispatch(setJobs(res.data)))
      //hata olursa storu günceller
      .catch((err) => dispatch(setError(err.message)));
  };
  //bileşen ekrana basıldığında fonk. çağırır
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list-page">
      <Filter jobs={state.jobs} />
      {/* 
    1)yüklenme devam ediyorsa loader bas
    2)yüklenme bittiyse ve hata varsa hata mesajı ve tekrar butonu
    3)yüklenme bittiyse ve hata yoksa kartları ekrana bas
    */}

      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <div className="error">
          <p>
            üzgünüz verilere erişirken bir sorun oluştu
            <span>{state.isError}</span>
          </p>
          <button onClick={fetchData} className="btn">
            Reload
          </button>
        </div>
      ) : (
        <div className="job-list">
          {state.jobs?.map((job) => (
            <Card job={job} key={job.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
