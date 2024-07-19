import { useState } from "react";
import Input from "./Input";
import Select from "./Select";

const Form = ({ setExpenses, expense, setExpense }) => {
  const [errors, setErrors] = useState({});

  const validateConfig = {
    title: [{ required: true, message: "Title is Required!" }],
    category: [{ required: true, message: "Category is Required!" }],
    amount: [
      { required: true, message: "Amount is Required!" },
      { min: 0, message: "Amount must be greater than 0" },
    ],
    date: [{ required: true, message: "Date is Required!" }],
  };

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
        }

        if (!rule.min && parseInt(value) < 0) {
          errorsData[key] = rule.message;
        }
      });
    });

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validate(expense);

    if (Object.keys(validateResult).length) return;

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({ title: "", category: "", amount: "", date: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        error={errors.title}
        value={expense.title}
        onChange={handleChange}
        name="title"
        id="title"
        type="text"
      />

      <Select
        defaultOption="Choose Category"
        error={errors.category}
        id="category"
        onChange={handleChange}
        optionArray={[
          "Grocery",
          "Fashion",
          "Bills",
          "Education",
          "Medicine",
          "Food",
          "Occassion",
          "Electronics",
        ]}
        value={expense.category}
      />

      <Input
        label="Amount"
        error={errors.amount}
        value={expense.amount}
        onChange={handleChange}
        name="amount"
        id="amount"
        type="number"
      />

      <Input
        label="Date"
        error={errors.date}
        value={expense.date}
        onChange={handleChange}
        name="date"
        id="date"
        type="date"
      />

      <button type="submit" className="add-btn">
        Add
      </button>
      <button
        type="button"
        className="add-btn"
        onClick={() => {
          setExpenses([]);
        }}
      >
        Clear Data
      </button>
    </form>
  );
};

export default Form;
