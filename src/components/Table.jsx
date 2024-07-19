import { useState } from "react";
import { useFilter } from "../../hooks/useFilter";
import ContextMenu from "./ContextMenu";

const Table = ({ expenses, setExpenses, expense, setExpense }) => {
  const [filteredData, setQuery] = useFilter(expenses, "category");
  const [month, SetMonth] = useState("");
  const [menuPosition, setMenuPosition] = useState({});
  const [rowID, setrowID] = useState("");

  function handleSortASC() {
    const sorted = [...expenses].sort((a, b) => a.amount - b.amount);

    setExpenses(sorted);
  }
  function handleSortDESC() {
    const sorted = [...expenses].sort((a, b) => b.amount - a.amount);

    setExpenses(sorted);
  }
  function handleChange(e) {
    setQuery(e.target.value.toLowerCase());
  }

  function handleMonth(e) {
    SetMonth(e.target.value);
  }

  const finalMap = filteredData.filter((expense) =>
    expense.date.includes(month)
  );

  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        setMenuPosition={setMenuPosition}
        setExpenses={setExpenses}
        rowID={rowID}
        expense={expense}
        setExpense={setExpense}
        expenses={expenses}
      />
      <table className="expense-table" onClick={() => setMenuPosition({})}>
        <thead>
          <tr>
            <th className="title-column">Title</th>
            <th>
              <select name="category" onChange={handleChange}>
                <option value="">All</option>
                <option value="Medicine">Medicine</option>
                <option value="Grocery">Grocery</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Food">Food</option>
                <option value="Occassion">Occassion</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  onClick={handleSortASC}
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  onClick={handleSortDESC}
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>

            <th className="date-column">
              Date
              <input
                type="month"
                name="month"
                id="month"
                onChange={handleMonth}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {finalMap.map(({ id, title, category, amount, date }) => {
            return (
              <tr
                key={id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setMenuPosition({ left: e.clientX, top: e.clientY });
                  setrowID(id);
                }}
              >
                <td>{title}</td>
                <td>{category}</td>
                <td>₹{amount}</td>
                <td>{date}</td>
              </tr>
            );
          })}
          <tr>
            <th>Total</th>
            <th></th>
            <th>
              ₹
              {filteredData.reduce(
                (accumulator, current) =>
                  accumulator + parseInt(current.amount),
                0
              )}
            </th>
            <th></th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
