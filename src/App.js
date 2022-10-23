import logo from './logo.svg';
import './App.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Header from './components/Header/Header';
import Home from "./components/Home/Home"
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import io from "socket.io-client"
import IncomeSpending from './components/IncomeSpending/IncomeSpending';
import Spinner from './components/spinner/Spinner';
import ViewIncomeSpending from './components/viewIncomeSpending/ViewIncomeSpending';
import CreateGroup from './components/group/CreateGroup';
import GroupManager from './components/group/GroupManager';
import Member from './components/group/Member';
import MyGroup from './components/group/MyGroup';
import AddIncomeGroup from './components/addIncomeGroup/AddSpendingGroup';
import AddSpendingGroup from './components/addIncomeGroup/AddSpendingGroup';
import AcceptSpending from './components/group/acceptSpending/AcceptSpending';
import ChatGroup from './components/chatGroup/ChatGroup';
import { useEffect, useRef, useState } from 'react';
import Warning from './components/warning/Warning';
import SpendingGroupDetail from './components/spendingGroupDetail/SpendingGroupDetail';
import Stats from './components/stats/Stats';
import Spending6Jar from './components/spending6Jar/Spending6Jar';
import ViewSpendingJar from './components/spending6Jar/viewSpendingJar/ViewSpendingJar';
import HomeAdmin from './components/admin/HomeAdmin';
import StatsAdmin from './components/admin/statsAdmin/StatsAdmin';
import LoginAdmin from './components/admin/loginAdmin/LoginAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { updatePathName } from './components/store/PathNameSlice';
import UserAdmin from './components/admin/userAdmin/UserAdmin';
import Test from './components/Test';
import ForgetPassword from './components/forgetPassword/ForgetPassword';
import ResetPassword from './components/resetPassword/ResetPassword';
import Donate from './components/donate/Donate';
import Footer from './components/footer/Footer';

export const socket = io("http://localhost:5000")


const App = () => {


  // return (
  //   <BrowserRouter>
  //      <Header />
  //     <Routes>
  //       <Route path='/' element={<Home />} />
  //       <Route path='/register' element={<Register />} />
  //       <Route path='/login' element={<Login />} />
  //       <Route path='/add-income-spending' element={<IncomeSpending />} />
  //       <Route path='/view-income-spending' element={<ViewIncomeSpending />} />
  //       <Route path='/create-group' element={<CreateGroup />} />
  //       <Route path='/group-manager' element={<GroupManager />} />
  //       <Route path='/group-manager/:groupId/member' element={<Member />} />
  //       <Route path='/my-groups' element={<MyGroup />} />
  //       <Route path='/my-groups/:groupId/add-income' element={<AddSpendingGroup />} />
  //       <Route path='/group-manager/:groupId/accept-spending' element={<AcceptSpending />} />
  //       <Route path='/group-manager/:groupId/chat-group' element={<ChatGroup />} />
  //       <Route path='/warning' element={<Warning />} />
  //       <Route path='/group-manager/:groupId/spending-detail' element={<SpendingGroupDetail />} />
  //       <Route path='/stats' element={<Stats />} />
  //       <Route path='/add-spending-6-jar' element={<Spending6Jar />} />
  //       <Route path='/view-spending-jar' element={<ViewSpendingJar />} />
  //       {/* ADMIN */}
  //       {/* <Route path='/admin' element={<HomeAdmin />} /> */}
  //       <Route path='admin/stats' element={<HomeAdmin />} >
  //         <Route path='test' element={<StatsAdmin />} />
  //       </Route>
  //       <Route path='/login-admin' element={<LoginAdmin />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Header />}>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/add-income-spending' element={<IncomeSpending />} />
          <Route path='/view-income-spending' element={<ViewIncomeSpending />} />
          <Route path='/create-group' element={<CreateGroup />} />
          <Route path='/group-manager' element={<GroupManager />} />
          <Route path='/group-manager/:groupId/member' element={<Member />} />
          <Route path='/my-groups' element={<MyGroup />} />
          <Route path='/my-groups/:groupId/add-income' element={<AddSpendingGroup />} />
          <Route path='/group-manager/:groupId/accept-spending' element={<AcceptSpending />} />
          <Route path='/group-manager/:groupId/chat-group' element={<ChatGroup />} />
          <Route path='/warning' element={<Warning />} />
          <Route path='/group-manager/:groupId/spending-detail' element={<SpendingGroupDetail />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/add-spending-6-jar' element={<Spending6Jar />} />
          <Route path='/view-spending-jar' element={<ViewSpendingJar />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/donate' element={<Donate />} />
        </Route> */}
        <Route path='/' element={<Header />}>
          <Route path='/' element={<Footer />} >
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/add-income-spending' element={<IncomeSpending />} />
            <Route path='/view-income-spending' element={<ViewIncomeSpending />} />
            <Route path='/create-group' element={<CreateGroup />} />
            <Route path='/group-manager' element={<GroupManager />} />
            <Route path='/group-manager/:groupId/member' element={<Member />} />
            <Route path='/my-groups' element={<MyGroup />} />
            <Route path='/my-groups/:groupId/add-income' element={<AddSpendingGroup />} />
            <Route path='/group-manager/:groupId/accept-spending' element={<AcceptSpending />} />
            <Route path='/group-manager/:groupId/chat-group' element={<ChatGroup />} />
            <Route path='/warning' element={<Warning />} />
            <Route path='/group-manager/:groupId/spending-detail' element={<SpendingGroupDetail />} />
            <Route path='/stats' element={<Stats />} />
            <Route path='/add-spending-6-jar' element={<Spending6Jar />} />
            <Route path='/view-spending-jar' element={<ViewSpendingJar />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/donate' element={<Donate />} />
          </Route>
        </Route>
        {/* ROUTE ADMIN */}

        <Route path='/admin' element={<HomeAdmin />}>
          <Route path='stats' element={<StatsAdmin />} />
          <Route path='users' element={<UserAdmin />} />
        </Route>
        <Route path='/login-admin' element={<LoginAdmin />} />

        <Route path='/test' element={<Test />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App;
