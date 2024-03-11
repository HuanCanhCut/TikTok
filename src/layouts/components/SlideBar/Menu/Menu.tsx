interface Props {
    children: React.ReactNode
}

const Menu: React.FC<Props> = ({ children }) => {
    return <nav>{children}</nav>
}

export default Menu
