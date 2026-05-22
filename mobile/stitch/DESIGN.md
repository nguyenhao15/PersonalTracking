# Personal Tracking App Design System

## 1. App Overview
- **App Name**: Personal Tracking
- **Design Philosophy**: Minimalist, clean, and highly focused on functionality and ease of use.
- **Core Purpose**: Assist users in seamlessly tracking personal finances and daily habits within a unified, distraction-free interface.

## 2. Visual Design & Theme
- **Primary Color**: `#588157` (Muted Green) - Used for primary actions, active states, progress indicators, and key highlights.
- **Aesthetic**: 
  - **Minimalist**: Ample whitespace, clear typography, and removal of unnecessary decorative elements.
  - **Focus**: Emphasize data readability and quick data entry. 
  - **Components**: Use subtle borders, soft shadows (if any), and clean typography to separate content without overwhelming the user.

## 3. Core Modules & Functionality

### 3.1. Personal Finance Module
A comprehensive but simple system to manage daily cash flow, debts, and wallets.

- **Dashboard**: 
  - Visual tracking of finances.
  - Overview of current balance, recent transactions, and spending patterns.
- **Wallet Management**:
  - Add, edit, and manage multiple wallets (e.g., Cash, Bank Account, E-Wallet).
- **Category Structure**:
  - Hierarchical or flat list of categories for detailed expense and income tracking.
- **Transaction Types**:
  - **Income & Expense**:
    - *Required/Available Fields*: Amount, Currency, Date, Wallet, Monthly Subscriptions (recurring flag), Category, Note, Attachment (e.g., receipt image).
  - **Transfer**:
    - *Required/Available Fields*: From Wallet, To Wallet, Transfer Fee, Date.
  - **Debt & Loan**:
    - *Required/Available Fields*: Date, Amount, Wallet.
    - *Features*: Ability to record repayments and track the remaining balance of the debt/loan.

### 3.2. Habit Tracker Module
A streamlined tool to build and maintain daily routines.

- **Dashboard & Progress**:
  - Visual representation of habit completion rates and streaks.
- **Habit Management**:
  - Add or remove habits.
  - Set frequencies (e.g., daily, specific days of the week).
- **User Interaction**:
  - **Check/To-do Style**: Focus on simple, one-tap "check-off" actions so users can easily mark habits as complete for the day without complex navigation.
