import DashboardPage from '../containers/pages/Dashboard';
import EmployeeDetailPage from '../containers/pages/EmployeeDetail';
import EmployeeListPage from '../containers/pages/EmployeeList';
import HomePage from '../containers/pages/Home';
import LoginPage from '../containers/pages/Login';
import NotFoundPage from '../containers/pages/NotFoundPage';
import ProductDetailPage from '../containers/pages/ProductDetail';
import ProductListPage from '../containers/pages/ProductList';
import RegisterPage from '../containers/pages/Register';
import DetailPage from '../containers/pages/components/productList/Detail';

const components = {
    dashboard: {
        url: "/dashboard",
        page: DashboardPage
    },
    employeeDetail: {
        url: "/employee/detail",
        page: EmployeeDetailPage
    },
    employeeList: {
        url: "/employee/list",
        page: EmployeeListPage
    },
    home: {
        url: "/home",
        page: HomePage
    },
    login: {
        url: "/login",
        page: LoginPage
    },
    notFound: {
        url: "/not-found",
        page: NotFoundPage
    },
    productDetail: {
        url: "/product/detail/:id",
        page: ProductDetailPage
    },
    productList: {
        url: "/product/list",
        page: ProductListPage
    },
    register: {
        url: "/register",
        page: RegisterPage
    }
};

export default {
    guest: {
        allowedRoutes: [
            components.login,
            components.register,
            components.home
        ],
        redirectRoute: "/login"
    },
    user: {
        allowedRoutes: [
            components.dashboard,
            components.employeeDetail,
            components.employeeList,
            components.productDetail,
            components.productList
        ],
        redirectRoute: "/dashboard"
    }
};