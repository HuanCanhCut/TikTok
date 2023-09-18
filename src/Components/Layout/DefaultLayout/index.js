import Header from './Header'
import SideBar from './SlideBar'

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <SideBar />
                <div className="content">{children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout
