import React from "react";
import { useSelector } from "react-redux";
// import qs from "qs";
// import { useNavigate } from "react-router-dom";

import Categories from "../components/Search/Categories";
import Sort from "../components/Search/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/skeleton";
import Pagination from "../components/Pagination";
import {
  setCategoryId,
  setCurrentPage,
  // setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { RootState, useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const isSearch = useRef(false);
  // const isMounted = useRef(false);
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const sortType = useSelector(
    (state: RootState) => state.filter.sort.sortProperty
  );
  const currentPage = useSelector(
    (state: RootState) => state.filter.currentPage
  );
  const items = useSelector((state: RootState) => state.pizza.items);
  const { status } = useSelector((state: RootState) => state.pizza);


  const searchValue = useSelector(
    (state: RootState) => state.filter.searchValue
  );

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizza = async () => {
    // setIsLoading(true);
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        currentPage,
        search,
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    fetchPizza();
  }, [categoryId, sortType, currentPage]);

  const pizzas = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading" ? skeletons : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
