import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import Table from "./Table";
import { SingleInstrumentsData } from "./dataStorage/SingleInstrumentsData";
import Pagination from "./Pagination";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const search = (data) => {
    return data.filter((item) => item.instrument_name.toLowerCase().includes(query));
  }
  
// To change pages
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = SingleInstrumentsData.slice(indexOfFirstPost, indexOfLastPost);

  // To change pages
const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  return (
    <div className="inputWrapper">
      <i id="searchIcon" class="fa-solid fa-magnifying-glass"></i>
      <input 
      type="text" 
      placeholder="Search for instrument..." 
      className="search"
      onChange={(e) => setQuery(e.target.value)} 
      />
      <Table data={search(currentPosts)} /> 
      <Pagination postsPerPage={postsPerPage} totalPosts={SingleInstrumentsData.length} paginate={paginate} />
    </div>
  );
}

export default Searchbar;