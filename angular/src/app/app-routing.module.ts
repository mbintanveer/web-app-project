import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SummaryComponent } from './components/summary/summary.component';

import { ClientsListComponent } from './components/client-list/client-list.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ViewClientComponent } from './components/view-client/view-client.component';

import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { InvoicesDetailsComponent } from './components/invoices-details/invoices-details.component';
import { AddInvoicesComponent } from './components/add-invoices/add-invoices.component';

import { ReceivingsListComponent } from './components/receivings-list/receivings-list.component';
import { ReceivingsDetailsComponent } from './components/receivings-details/receivings-details.component';
import { AddReceivingsComponent } from './components/add-receivings/add-receivings.component';

import { ServicesListComponent } from './components/services-list/services-list.component';
import { CashflowsComponent } from './components/cashflows/cashflows.component';
import { AccountsComponent } from './components/accounts/accounts.component';

import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { ExpensesDetailsComponent } from './components/expenses-details/expenses-details.component';
import { AddExpensesComponent } from './components/add-expenses/add-expenses.component';
// import { ViewExpenseComponent } from './components/view-expenses/view-expenses.component';


import { VendorsListComponent } from './components/vendors-list/vendors-list.component';
import { VendorsDetailsComponent } from './components/vendors-details/vendors-details.component';
import { AddVendorsComponent } from './components/add-vendors/add-vendors.component';
import { ViewVendorComponent } from './components/view-vendors/view-vendors.component';

import { AddBillsComponent } from './components/add-bills/add-bills.component';
import { BillsDetailsComponent } from './components/bills-details/bills-details.component';

import { PaymentsDetailsComponent } from './components/payments-details/payments-details.component';
import { AddPaymentsComponent } from './components/add-payments/add-payments.component';


const routes: Routes = [
  // { path: '', redirectTo: 'Clients', pathMatch: 'full' },
  { path: '', component: SummaryComponent, pathMatch: 'full' },
  { path: 'Clients', component: ClientsListComponent },
  { path: 'Clients/:id', component: ClientDetailsComponent },
  { path: 'View-Clients/:id', component: ViewClientComponent },
  { path: 'Add-Client', component: AddClientComponent },

  { path: 'Invoices', component: InvoicesListComponent },
  { path: 'Invoices/:id', component: InvoicesDetailsComponent },
  { path: 'Add-Invoice', component: AddInvoicesComponent },

  { path: 'Receivings', component: ReceivingsListComponent },
  { path: 'Receivings/:id', component: ReceivingsDetailsComponent },
  { path: 'Add-Receiving', component: AddReceivingsComponent },

  { path: 'Services', component: ServicesListComponent },
  { path: 'Cashflows', component: CashflowsComponent },
  { path: 'Accounts', component: AccountsComponent },

  { path: 'Expenses', component: ExpensesListComponent },
  { path: 'Expenses/:id', component: ExpensesDetailsComponent },
  // { path: 'View-Expenses/:id', component: ViewExpensesComponent },
  { path: 'Add-Expense', component: AddExpensesComponent },


  { path: 'Vendors', component: VendorsListComponent },
  { path: 'Vendors/:id', component: VendorsDetailsComponent },
  { path: 'View-Vendors/:id', component: ViewVendorComponent },
  { path: 'Add-Vendor', component: AddVendorsComponent },

  { path: 'Add-Bill', component: AddBillsComponent },
  { path: 'Bills/:id', component: BillsDetailsComponent },

  { path: 'Add-Payment', component: AddPaymentsComponent },
  { path: 'Payments/:id', component: PaymentsDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
