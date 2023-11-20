import {useState} from  'react'
import { Category } from "../App"
import Menu from './Menu'

type MenuItemProps = {
    category : Category,
    onCategoryClick: (category:Category | null) => void
  }
  
function MenuItem({category,onCategoryClick} : MenuItemProps){
    const [isCollapsed,setCollapse]=useState(false)
  
    // Evitamos la propagación del evento al tener un onClick dentro de otro click
    function handleCollapse(event: React.MouseEvent){
      event.stopPropagation()
      if(isCollapsed){
        onCategoryClick(null)
      }
      setCollapse((isCollapsed) => !isCollapsed)
    }
  
    return (
      <li key={category.id}>
            <div onClick={()=>onCategoryClick(category)}>
              <span> {category.name}</span>
              {category.sublevels && <button onClick={handleCollapse}>{isCollapsed ?  'Cerrar' : 'Abrir'}</button>}
            </div>
            {category.sublevels && isCollapsed &&  <Menu onCategoryClick={onCategoryClick} categories={category.sublevels}/>}
      </li>
    )
  }

  export default MenuItem
