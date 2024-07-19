const ContextMenu = ({
  menuPosition,
  setMenuPosition,
  rowID,
  expenses,
  setExpenses,
  setExpense,
}) => {
  if (!menuPosition.left) return;

  function handleEdit() {
    const { title, category, amount, date } = expenses.find(
      (expense) => expense.id === rowID
    );
    setExpense({
      title: title,
      category: category,
      amount: amount,
      date: date,
    });
    setExpenses((prevState) => {
      return prevState.filter((state) => state.id !== rowID);
    });
    setMenuPosition({});
  }

  return (
    <div className="context-menu" style={menuPosition}>
      <div onClick={handleEdit}>Edit</div>

      <div
        onClick={() => {
          setExpenses((prevState) => {
            return prevState.filter((state) => state.id !== rowID);
          });
          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
};

export default ContextMenu;
