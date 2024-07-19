
import { useState } from 'react'
import './App.css'
// import expenseData from './components/expenseData'
import Form from './components/Form'
import Table from './components/Table'

function App() {

  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('data')) || [])

  localStorage.setItem('data',JSON.stringify(expenses))
      
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
  });

  return (
    <main>
    <h1>Track Your Expense</h1>
    <div className="expense-tracker">
      <Form setExpenses = {setExpenses} expense={expense} setExpense={setExpense} expenses={expenses}/>
      <Table expenses={expenses} setExpenses={setExpenses} expense={expense} setExpense={setExpense}/>

    </div>
  </main>
  )
}

export default App
