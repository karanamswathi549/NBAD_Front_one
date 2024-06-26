// Import necessary dependencies and components
import React, { useEffect, useState } from 'react';
import { useBudget } from '../contexts/budgetContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { toast } from 'react-toastify';
import { CirclesWithBar } from 'react-loader-spinner';

import DoubleBarChart from '../charts/doubleBarChart';
import PieChart from '../charts/pieChart';
import LineChart from '../charts/lineChart';

import './Dashboard.css'; // Add a separate CSS file for styling

const Dashboard = () => {
  const navigate = useNavigate();
  const [expenseMonth, setExpenseMonth] = useState(getCurrentMonth());

  const handleMonthChange = (e) => {
    setExpenseMonth(e.target.value);
    console.log(e.target.value);
  };
  const { budget, fetchInitialBudget } = useBudget();
  const { isLoggedin } = useAuth();
  const [loading, setLoading] = useState(false);
  let totalBudget = 0;
  let totalSpent = 0;

  const expenseLabels = [];
  const expenseData = [];
  budget.expenses.forEach(function (expense) {
    expenseLabels.push(expense.description);
    expenseData.push(expense.amount);
    if (areMonthsAndYearsEqual(expense.date, expenseMonth)) {
      totalSpent += parseInt(expense.amount);
    }
  });
  // double bar chart 
  const doubleBarLabels = []; // categories
  const doubleBarData1 = []; // total Amount allocated
  const doubleBarData2 = []; // total amount spent
  budget.categories.forEach(function (category) {
    doubleBarLabels.push(category.name)
    doubleBarData1.push(category.allocatedAmount)
    totalBudget += parseInt(category.allocatedAmount);
    let totalAmountSpent = 0;
    budget.expenses.forEach(function (expense) {

      if (expense.categoryName === category.name && areMonthsAndYearsEqual(expense.date, expenseMonth)) {
        totalAmountSpent += expense.amount
      }
    })
    doubleBarData2.push(totalAmountSpent)
  })

  function areMonthsAndYearsEqual(date1, date2) {
    console.log("date2", date2);
    let d1Year = new Date(date1).getFullYear();
    let d1Month = new Date(date1).getMonth() + 1; // Month is zero-based, so adding 1

    let d2Parts = date2.split('-');
    let d2Year = parseInt(d2Parts[0]);
    let d2Month = parseInt(d2Parts[1]);

    return (d1Year === d2Year && d1Month === d2Month);
  }

  //sorted expense
  const sortedExpenseLabels = [];
  const sortedExpenseData = [];
  budget.sortedExpenses.forEach(function (expense) {
    sortedExpenseData.push(expense.totalAmountSpent)
    sortedExpenseLabels.push(expense.date)
  })




  useEffect(() => {
    const resetBudget = async () => {
      if (!isLoggedin()) {
        toast.error('Please login first');
        navigate('/login');
      }
      await fetchInitialBudget();
      setLoading(true);
    };
    resetBudget();
  }, [loading]);

  function getCurrentMonth() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    return `${year}-${month}`;
  }

  return loading ? (
    <div className="container mt-4">

      <h1 className="mb-4">Budget Application</h1>
      <div style={{ width: "200px", cursor: "pointer" }}>
        <input
          type="month"
          className="form-control"
          id="expenseMonth"
          value={expenseMonth}
          onChange={handleMonthChange}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className="budget-box p-4 mb-4 bg-light rounded shadow">
        <h2 className="display-4 text-center mb-4">Dashboard</h2>
        <div className="container">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="budget-highlight-box p-3 mb-4 bg-info text-light rounded shadow">
                  <h3 className="mb-3">
                    <span className="budget-icon"></span> Total Budget
                  </h3>
                  <p className="lead">{totalBudget}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="budget-highlight-box p-3 mb-4 bg-success text-light rounded shadow">
                  <h3 className="mb-3">
                    <span className="budget-icon"></span> Total Spent
                  </h3>
                  <p className="lead text-md-right">{totalSpent}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="row">
        <div className="col-md-6" id="doubleBarChart">
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <div className="card-body">
              <h2 className="card-title">Double Bar Chart</h2>
              <DoubleBarChart labels={doubleBarLabels} data1={doubleBarData1} data2={doubleBarData2} />
            </div>
          </div>
        </div>

        <div className="col-md-6" id="lineChart">
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <div className="card-body">
              <h2 className="card-title">Line Chart</h2>
              <LineChart labels={sortedExpenseLabels} data={sortedExpenseData} />
            </div>
          </div>
        </div>


      </div>
      <div className="row">


        <div className="col-md-4">
          <div className="card shadow p-3 mb-5 bg-white rounded" id='pieChart'>
            <div className="card-body">
              <h2 className="card-title">Pie Chart</h2>
              <PieChart labels={doubleBarLabels} data={doubleBarData2} />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {/* <h3>Expenses</h3> */}
          <table className="table table-bordered table-striped table-hover shadow p-3 mb-5 bg-white rounded " id='expenseTable'>
            <thead>
              <tr>
                <th>Expense Name</th>
                <th>Category Name</th>
                <th>Amount Spend</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {budget.expenses.map((expense, index) => {
                const isSameMonthAndYear = areMonthsAndYearsEqual(expense.date, expenseMonth);
                if (isSameMonthAndYear) {
                  return (
                    <tr key={index}>
                      <td>{expense.description}</td>
                      <td>{expense.categoryName}</td>
                      <td>${expense.amount}</td>
                      <td>{expense.date?.slice(0, 10)}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>


      </div>






      <div className="row mt-4">
        <div className="col-md-12">

        </div>
      </div>
    </div>
  ) : (
    <div className="loader-container">
      <CirclesWithBar height="100" width="100" color="#4fa94d" visible={true} />
    </div>
  );
};

export default Dashboard;
