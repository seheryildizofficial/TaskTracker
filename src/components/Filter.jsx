import { useEffect, useState } from "react";
import { sortOpt, statusOpt, typeOpt } from "../constant.js";
import { useDispatch } from "react-redux";
import {
  clearFilters,
  filterBySearch,
  sortJobs,
} from "../redux/slices/jobSlice";

const Filter = ({ jobs }) => {
  const [text, setText] = useState("");
  console.log(text);
  const dispatch = useDispatch();
  useEffect(() => {
    // bir sayaç başlat ve işlemi sayaç durudğunda yap
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ field: "company", text }));
    }, 500);

    // eğerki süre bitmeden tekrardan useEffect çalışırsa önceki sayacı sıfırla
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filtreleme formu</h2>
      <form>
        <div>
          <label>Şirket ara</label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>

        <div>
          <label>Durum</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({
                  field: "status",
                  text: e.target.value,
                })
              )
            }
            name="status"
          >
            <option value={""} hidden>
              Seçiniz
            </option>
            {statusOpt.map((i) => (
              <option value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({
                  field: "type",
                  text: e.target.value,
                })
              )
            }
            name="type"
          >
            <option value={""} hidden>
              Seçiniz
            </option>
            {typeOpt.map((i) => (
              <option value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Sırala</label>
          <select
            onChange={(e) => dispatch(sortJobs(e.target.value))}
            name="type"
          >
            <option value={""} hidden>
              Seçiniz
            </option>
            {sortOpt.map((i) => (
              <option value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => dispatch(clearFilters())}
            type="reset"
            className="btn"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
