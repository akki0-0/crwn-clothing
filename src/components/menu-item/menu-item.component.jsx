import './menu-item.styles.scss'
import { withRouter } from 'react-router-dom';

const MenuItem = ({ title, imageUrl, size, linkUrl,history, match }) => (
    <div className={`${size} menu-item`}>
    <div 
    className='background-image' 
    style={{
         backgroundImage: `url(${imageUrl})`
         }}
    ></div>
        <div className='item-content' onClick={()=>history.push(`${match.url}${linkUrl}`)}>
            <h1 className='content-title'>{title}</h1>
            <span className='content-subtitle'>Book now!</span>
        </div>
        
    </div>
)
export default withRouter(MenuItem);