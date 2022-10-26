import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'

export default function DefaultPage ({children}){

    return (
        <div>
            <Topbar />
            <div className='container'>
                <Sidebar />
                {children}
            </div>
        </div>
    )
}