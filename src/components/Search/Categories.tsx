import React from 'react';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';


type CategoriesProps = {
  value:number;
  onChangeCategory: (i: number)=> void;
}

const Categories: React.FC<CategoriesProps> = React.memo(({value, onChangeCategory }) =>{
  const categories = ['Все', 'Мясные','Вегетарианская','Гриль','Острые','Закрытые']
  useWhyDidYouUpdate('Categories',{value, onChangeCategory} )
  return (
      <div className="categories">
        <ul>
          {categories.map((categoryValue, i) => (
            <li key={i} onClick={()=>onChangeCategory (i)} className={value === i ? 'active' : ''}>
              {categoryValue}
            </li>
          ))}
        </ul>
      </div>
    )
  }) 

  export default Categories