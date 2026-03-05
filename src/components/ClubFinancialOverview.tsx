import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar, CreditCard, Receipt, AlertCircle } from 'lucide-react';

export default function ClubFinancialOverview() {
  // Mock data - in real app, this would come from API
  const financialData = {
    totalRevenue: 250000,
    totalExpenses: 180000,
    netProfit: 70000,
    monthlyData: [
      { month: 'Jan', revenue: 45000, expenses: 32000 },
      { month: 'Feb', revenue: 52000, expenses: 38000 },
      { month: 'Mar', revenue: 48000, expenses: 35000 },
      { month: 'Apr', revenue: 55000, expenses: 41000 },
      { month: 'May', revenue: 50000, expenses: 34000 },
    ],
    recentTransactions: [
      { id: 1, description: 'Tournament Registration Fee', amount: 15000, type: 'income', date: '2024-01-15' },
      { id: 2, description: 'Equipment Purchase', amount: -25000, type: 'expense', date: '2024-01-12' },
      { id: 3, description: 'Membership Fees', amount: 8000, type: 'income', date: '2024-01-10' },
      { id: 4, description: 'Court Rental', amount: -12000, type: 'expense', date: '2024-01-08' },
    ],
    outstandingPayments: [
      { id: 1, description: 'Tournament Entry Fee - Nairobi Open', amount: 5000, dueDate: '2024-02-01' },
      { id: 2, description: 'Equipment Maintenance', amount: 8000, dueDate: '2024-02-15' },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Financial Overview</h1>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          Generate Report
        </button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Revenue</p>
              <p className="text-2xl font-bold text-emerald-600">KES {financialData.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">KES {financialData.totalExpenses.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Net Profit</p>
              <p className="text-2xl font-bold text-blue-600">KES {financialData.netProfit.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trend Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Financial Trend</h3>
        <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-500">Chart visualization would be implemented here</p>
            <p className="text-sm text-slate-400 mt-1">Revenue vs Expenses over time</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {financialData.recentTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-emerald-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{transaction.description}</p>
                    <p className="text-sm text-slate-500">{transaction.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : ''}KES {Math.abs(transaction.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Outstanding Payments */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Outstanding Payments</h3>
          <div className="space-y-4">
            {financialData.outstandingPayments.map(payment => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{payment.description}</p>
                    <p className="text-sm text-slate-500">Due: {payment.dueDate}</p>
                  </div>
                </div>
                <p className="font-semibold text-yellow-700">KES {payment.amount.toLocaleString()}</p>
              </div>
            ))}
            {financialData.outstandingPayments.length === 0 && (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-500">No outstanding payments</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <Receipt className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-900">Record Income</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <CreditCard className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-900">Record Expense</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-900">Schedule Payment</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-900">Budget Planning</p>
          </button>
        </div>
      </div>
    </div>
  );
}