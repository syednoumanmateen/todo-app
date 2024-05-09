import { Children, FC, Suspense, lazy, memo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Spinner from './components/Spinner';
import { Toaster } from 'react-hot-toast';
import VideoGallery from './pages/VideoGallery';

const MainLayout = lazy(() => import('./components/MainLayout'));
const AuthLayout = lazy(() => import('./components/AuthLayout'));
const Notfound = lazy(() => import('./components/Notfound'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Blogadd = lazy(() => import('./pages/blog/Add'));
const Bloglist = lazy(() => import('./pages/blog/List'));
const Blogview = lazy(() => import('./pages/blog/View'));
const Todoadd = lazy(() => import('./pages/todo/Add'));
const Todolist = lazy(() => import('./pages/todo/List'));
const Todoview = lazy(() => import('./pages/todo/View'));
const Profile = lazy(() => import('./pages/user/Profile'));
const ForgotPassword = lazy(() => import('./pages/user/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/user/ResetPassword'));
const SignIn = lazy(() => import('./pages/user/SignIn'));
const SignUp = lazy(() => import('./pages/user/SignUp'));
const Chat = lazy(() => import('./pages/chat/Chat'));
const MessageContainer = lazy(() => import('./pages/chat/MessageContainer'));
const Expense = lazy(() => import('./pages/expense/ExpenseTracker'));
const ExpenseList = lazy(() => import('./pages/expense/ExpenseList'));
const ExpenseAdd = lazy(() => import('./pages/expense/ExpenseAdd'));
const IncomeAdd = lazy(() => import('./pages/expense/IncomeAdd'));
const videoGallery = lazy(() => import('./pages/VideoGallery'));
const ImagesGallery = lazy(() => import('./pages/ImageGallery'));

const publicRoutes = [
  { path: '/signIn', element: <SignIn /> },
  { path: '/signUp', element: <SignUp /> },
  { path: '/forgotPassword', element: <ForgotPassword /> },
  { path: '/resetPassword/:email/:token', element: <ResetPassword /> },
  { path: '*', element: <Notfound /> }];

const protectedRoutes = [
  {
    path: '/todo', element: <ProtectedRoute />, childrens: [
      { path: 'list', element: <Todolist /> },
      { path: 'view/:id', element: <Todoview /> },
      { path: 'add', element: <Todoadd /> }]
  },
  {
    path: '/blog', element: <ProtectedRoute />, childrens: [
      { path: 'list', element: <Bloglist /> },
      { path: 'view/:id', element: <Blogview /> },
      { path: 'add', element: <Blogadd /> }]
  },
  {
    path: '/expense', element: <ProtectedRoute />, childrens: [
      { path: 'dashboard', element: <Expense /> },
      { path: 'list', element: <ExpenseList /> },
      { path: 'expenseAdd', element: <ExpenseAdd /> },
      { path: 'incomeAdd', element: <IncomeAdd /> }]
  }]

interface props { }

const App: FC<props> = ({ }) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={<Suspense fallback={<Spinner />}> {route.element}</Suspense>} />
            ))}
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Suspense fallback={<Spinner />}> <ProtectedRoute /> </Suspense>}>
              <Route index element={<Suspense fallback={<Spinner />}> <Dashboard /> </Suspense>} />
              <Route path="/imageGallery" element={<Suspense fallback={<Spinner />}> <ImagesGallery /> </Suspense>} />
              <Route path="/VideoGallery" element={<Suspense fallback={<Spinner />}> <VideoGallery /> </Suspense>} />
              <Route path="/profile" element={<Suspense fallback={<Spinner />}> <Profile /> </Suspense>} />
              <Route path="/chat" element={<Suspense fallback={<Spinner />}> <Chat /> </Suspense>}>
                <Route path=":id" element={<Suspense fallback={<Spinner />}> <MessageContainer /> </Suspense>} />
              </Route>
            </Route>

            {protectedRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={<Suspense fallback={<Spinner />}> {route.element}</Suspense>}>
                {route.childrens.map((childRoute, childIndex) => (
                  <Route key={childIndex} path={childRoute.path} element={<Suspense fallback={<Spinner />}> {childRoute.element}</Suspense>} />
                ))}
              </Route>
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default memo(App)
