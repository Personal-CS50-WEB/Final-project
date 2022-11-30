import{ Link, useMatch, useResolvedPath, NavLink  } from "react-router-dom"

export default function Navbar() {
    return <nav className="nav">
        <Link to="/" className="site-title">Survey</Link>
        <ul>
        
        <CustomLink to="/user_surveys">Your surveys</CustomLink>
        <CustomLink to="/user_submissions">Your submissions</CustomLink>
        <CustomLink to="/create_survey">Create survey</CustomLink>
        </ul>
    </nav>
}

function CustomLink({ to, children,  ...props}){
    const resolvedPath = useResolvedPath(to)
    const is_active = useMatch({path: resolvedPath.pathname}) 
    const path = window.location.pathname
    return (
    <li className={is_active ? "active" : ""}>
        <Link to={ to } {...props}>{children}</Link>
        </li>)
}