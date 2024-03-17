import { useEffect } from "react";
import { statusOpt, typeOpt } from "../constant";
import { v4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setLoading,
  setJobs,
  setError,
  createJob,
} from "../redux/slices/jobSlice";
const AddJob = () => {
  const state = useSelector((store) => store.jobSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //iş verilerini alma
  useEffect(() => {
    //yüklenme durumunu günceller
    dispatch(setLoading());

    axios
      .get("http://localhost:4003/jobs")
      //data gelirse stora aktarır
      .then((res) => dispatch(setJobs(res.data)))
      //hata olursa storu günceller
      .catch((err) => dispatch(setError(err.message)));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //inputlardaki verilere eriş
    const formData = new FormData(e.target);
    const newJob = Object.fromEntries(formData.entries());

    //tarih ve id ekle
    newJob.id = v4();
    newJob.date = new Date().toLocaleDateString();
    //api a veriyi ekle
    axios
      .post("http://localhost:4003/jobs", newJob)
      //başarılı olursa stora ekle
      .then(() => {
        toast.success("yeni iş eklendi");
        dispatch(createJob(newJob));
        navigate("/");
      })
      //başarısız olursa uyarı ver
      .catch(() => {
        toast.warn("ekleme işleminde sorun oluştu");
      });
  };

  //dizideki aynı elemanları kaldır
  const removeDuplicates = (key) => {
    const arr = state.jobs.map((i) => i[key]);
    const filtred = arr.filter((value, index) => arr.indexOf(value) === index);
    return filtred;
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni iş ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="positions" name="position" type="text" required />

            <datalist id="positions">
              {removeDuplicates("position").map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Şirket</label>
            <input list="companies" name="company" type="text" required />

            <datalist id="companies">
              {removeDuplicates("company").map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Lokasyon</label>
            <input list="locations" name="location" type="text" required />
            <datalist id="locations">
              {removeDuplicates("location").map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Durum</label>
            <select name="status" required>
              <option value="" hidden>
                Seçiniz
              </option>
              {statusOpt.map((i) => (
                <option>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Tür</label>
            <select name="type" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {typeOpt.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <button className="btn">İş ekle</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
