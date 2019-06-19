import React, { useEffect, useContext, useState } from "react";
import { hasSome } from "../../module/utils";
import { usePaginator } from "../../module/hooks";
import { APIContext } from "../context";
import Searchbar from "./Searchbar";
import Card from "./Card";
import FilterPanel from "./FilterPanel";
import styled from "@emotion/styled";

const arrow_r = require("../../assets/icons/chevron_right.svg");
const arrow_l = require("../../assets/icons/chevron_left.svg");

// @media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
//   /* Styles */
//   }
// @media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio : 2) {
//   /* Styles */
//   }

const SKIP_PAGINATION = 6;

const List = styled.div`
  display: grid;
  grid-template-columns: 40% 40%;
  grid-column-gap: 20%;
  -webkit-transition: heigth 12s;
  transition: heigth 12s;
`;

const PaginatorPanel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Icon = styled.img`
  width: 40px;
  background: gray;
  border-radius: 100%;
`;

const Home = () => {
  const {
    page,
    setPage,
    nextPage,
    prevPage,
    currentPage,
    totalPages
  } = usePaginator();

  const { habitants, professions } = useContext(APIContext);
  const [habitantsCookedData, setHabitantsCookedData] = useState(habitants);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);

  const toggleFilter = element => {
    const hasIndexArray = filter.indexOf(element);
    const newFilterState = filter;

    hasIndexArray > -1
      ? newFilterState.pop(hasIndexArray)
      : newFilterState.push(element);

    setFilter([...newFilterState]);
  };

  useEffect(() => {
    let cookedData = habitants;
    if (searchTerm.length > 0) {
      cookedData = cookedData.filter(({ name }) =>
        name
          .trim()
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
      );
    }

    if (filter.length > 0) {
      cookedData = cookedData.filter(({ professions }) =>
        hasSome(filter, professions)
      );
    }
    setPage(0);
    setHabitantsCookedData(cookedData);
  }, [habitants, searchTerm, filter]);

  window.pa = page => setPage(page * SKIP_PAGINATION);

  return (
    <>
      <Searchbar value={searchTerm} onChange={setSearchTerm} />

      <FilterPanel buttons={professions} onClick={toggleFilter} />

      <List>
        {habitantsCookedData
          .slice(page, page + SKIP_PAGINATION)
          .map(habitant => (
            <Card key={habitant.id} {...habitant} />
          ))}
      </List>

      <PaginatorPanel>
        <Icon
          onClick={currentPage !== 1 && prevPage}
          src={arrow_l}
          alt={"previous"}
        />
        <p>
          {currentPage} / {totalPages(habitantsCookedData)}
        </p>
        <Icon
          onClick={currentPage < totalPages(habitantsCookedData) && nextPage}
          src={arrow_r}
          alt={"next"}
        />
      </PaginatorPanel>
    </>
  );
};

export default Home;
