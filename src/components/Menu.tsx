import MenuItem from "./MenuItem"
import { Category } from "../App"

type MenuProps ={
    categories: Category [],
    onCategoryClick: (category:Category | null) => void
}

function Menu({categories,onCategoryClick}: MenuProps){
    return (
        <ol>
          {categories.map(category =>(
            <MenuItem onCategoryClick={onCategoryClick} key={category.id} category={category} />
          )) 
          }
      </ol>
    )
  }
  export default Menu