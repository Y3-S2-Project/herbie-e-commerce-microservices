import { NavLink } from 'react-router-dom'
import './sidebar.scoped.css'
import { useRef } from 'react'

export default function SideBar(props) {
  const ref = useRef(null)
  return (
    <nav
      id="sidebar"
      ref={ref}
      className={
        (props.isActive ? 'active ' : '') +
        'sidebar tw-mt-4 tw-min-h-full tw-w-64 tw-bg-white tw-border-r     tw-shadow-x'
      }
    >
      <ul className="list-unstyled components font-color">
        <li className="text-center font-weight-bold">
          {!props.isActive ? (
            <img id="rimage-title" alt="bit-logo"></img>
          ) : (
            <img alt="mini-logo"></img>
          )}
        </li>
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? 'font-color side-link selected' : 'font-color side-link '
            }
          >
            <i className="fa fa-cubes" aria-hidden="true"></i>
            {!props.isActive ? <small> Dashboard</small> : <small> </small>}
          </NavLink>
        </li>
        <li>
          <a
            href="#customer"
            className={`font-color  side-link ${!props.isActive ? 'dropdown-toggle' : ''}`}
            data-toggle="collapse"
            aria-expanded="false"
          >
            <i className="fa fa-users" aria-hidden="true"></i>
            {!props.isActive ? <small> Product Management</small> : <small> </small>}
          </a>
          <ul className="collapse list-unstyled font-color" id="customer">
            <li>
              <NavLink
                to="./product-management/products"
                className={({ isActive }) =>
                  isActive ? 'font-color side-link selected' : 'font-color side-link '
                }
              >
                <i className="fas fa-user"></i>
                {!props.isActive ? <small> All Products</small> : <small> </small>}
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <a
            href="#company"
            className="font-color dropdown-toggle side-link"
            data-toggle="collapse"
            aria-expanded="false"
          >
            <i className="fas fa-glasses"></i>
            {!props.isActive ? <small> Category Management</small> : <small> </small>}
          </a>
          <ul className="collapse list-unstyled font-color" id="company">
            <li>
              <NavLink
                to="/admin/admin-company"
                className={({ isActive }) =>
                  isActive ? 'font-color side-link selected' : 'font-color side-link '
                }
              >
                <i className="fa fa-users" aria-hidden="true"></i>
                All Category
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <a
            href="#payments"
            className={`font-color  side-link ${!props.isActive ? 'dropdown-toggle' : ''}`}
            data-toggle="collapse"
            aria-expanded="false"
          >
            <i className="fas fa-money-bill-alt"></i>
            {!props.isActive ? <small> Payments</small> : <small> </small>}
          </a>
          <ul className="collapse list-unstyled font-color" id="payments">
            <li>
              <NavLink
                to="./admin-customer-payments"
                className={({ isActive }) =>
                  isActive ? 'font-color side-link selected' : 'font-color side-link '
                }
              >
                <i className="fa fa-users" aria-hidden="true"></i>
                {!props.isActive ? <small> Customers</small> : <small> </small>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./admin-company-payments"
                className={({ isActive }) =>
                  isActive ? 'font-color side-link selected' : 'font-color side-link '
                }
              >
                <i className="fas fa-building"></i>
                {!props.isActive ? <small> Company</small> : <small> </small>}
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="./adminorder"
            className={({ isActive }) =>
              isActive ? 'font-color side-link selected' : 'font-color side-link '
            }
          >
            <i className="fas fa-shopping-cart"></i>
            {!props.isActive ? <small> Order Management</small> : <small> </small>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="./commission"
            className={({ isActive }) =>
              isActive ? 'font-color side-link selected' : 'font-color side-link '
            }
          >
            <i className="fas fa-money-bill"></i>
            {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-comments-dollar" /> */}
            {!props.isActive ? <small> Commission Management</small> : <small> </small>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? 'font-color side-link selected' : 'font-color side-link '
            }
          >
            <i className="fas fa-wrench"></i>
            {!props.isActive ? <small> Settings</small> : <small> </small>}
          </NavLink>
        </li>
      </ul>

      <ul className="px-0 ">
        <li></li>
        <hr id="last-navlink" />{' '}
        <li>
          <NavLink
            to="/signout"
            className={({ isActive }) =>
              isActive ? 'font-color side-link selected' : 'font-color side-link '
            }
          >
            <i className="fas fa-sign-out-alt"></i>
            {!props.isActive ? <small> Sign out</small> : <small> </small>}
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
