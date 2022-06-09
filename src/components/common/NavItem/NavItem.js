import { Link } from "react-router-dom";
import Classes from "./NavItem.module.css";

export default function NavItem({ items }) {

    const el = items.map(item => {
        return (
            <li>
                <Link to={`/${item.name}`} activeStyle={{
                    border: '1px solid white',
                    textDecoration: 'underline',
                    padding: '1em',
                }}>
                    {item.icon} {item.label}
                </Link>
            </li >
        );
    });

    return (
        <>
            {el}
        </>
    )
}
