import React, { useState, useEffect } from "react";
import styles from "../pages/InstrumentsListPage.module.css";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import InstrumentModal from "../components/InstrumentModal";
import InstrumentSearchModal from "../components/InstrumentSearchModal";

function InstrumentsListPage({ user }) {
  const headers = [
    { name: "Instrument Name", accessor: "instrument_name" },
    { name: "ID", accessor: "instrument_id" },
    { name: "Quantity", accessor: "instrument_quantity" },
    { name: "Location", accessor: "instrument_location" },
  ];

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [setData, setSetData] = useState([]);
  const [instrumentModalOpen, setInstrumentModalOpen] = useState(false);
  const navigateTo = useNavigate();
  const [newInstrumentData, setNewInstrumentData] = useState({});

  const handleInstrumentClick = (instrument) => {
    navigateTo(`/instruments/${instrument.id}`);
  };

  const handleItemClick = (item) => {
    if (handleInstrumentClick) {
      handleInstrumentClick(item);
    }
  };

  function getDataWithSearchString(data) {
    return data.filter((item) =>
      ["instrument_name", "instrument_id", "instrument_location"].some((key) =>
        item[key].toUpperCase().includes(query.toUpperCase())
      )
    );
  }

  const handlePagination = (pageNumbers) => setCurrentPage(pageNumbers);

  const allPosts = getDataWithSearchString(setData);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);


  
  const handleSubmit = async (newRow) => {
    try {
      const newInstrumentData = {
        instrumentName: newRow.instrument_name,
        instrumentId: newRow.instrument_id,
        instrumentQuantity: newRow.instrument_quantity,
        instrumentLocation: newRow.instrument_location,
        instrumentImage: newRow.instrument_image, 
      };
  

      const response = await fetch("/api/singleInstruments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInstrumentData),
      });
      const responseData = await response.json();
      console.log(responseData.message);

      setSetData([...setData, newRow]);
      if (response.ok) {
        fetchData();
        setInstrumentModalOpen(false);

        // Clear the form fields if needed
        setNewInstrumentData({
          instrument_name: "",
          instrument_id: "",
          instrument_quantity: "",
          instrument_location: "",
          instrumentImage: "",
        });
      } else {
        const data = await response.json();
        console.error("Error adding instrument:", data.error);
      }
    } catch (error) {
      console.error("Error adding instrument:", error);
    }
  };

  //fetching data from the API
  const fetchData = () => {
    fetch("/api/singleInstruments")
      .then((response) => response.json())
      .then((data) => {

        setSetData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.instrumentsListPageContainer}>
      <div className={styles.instrumentWrapper}>
        <SearchBar setQuery={setQuery} handlePagination={handlePagination} />
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.accessor}>{header.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
  {currentPosts.map((item) => (
    <tr
      key={item.id}
      onClick={() => {
        handleItemClick(item);
        handleInstrumentClick(item);
      }}
    >
      {headers.map((header) => (
        <td key={header.accessor}>
          {header.accessor === "instrumentImage" ? (
            <img
              src={item[header.accessor]} // Assuming item["instrumentImage"] contains the image URL
              alt="Instrument Image"
              style={{ maxWidth: "50px", maxHeight: "50px" }} // Adjust size as needed
            />
          ) : (
            item[header.accessor]
          )}
        </td>
      ))}
    </tr>
  ))}
</tbody>
        </table>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={allPosts.length}
          paginate={handlePagination}
          currentPage={currentPage}
        />
        {instrumentModalOpen && (
          <InstrumentModal
            closeInstrumentModal={() => {
              setInstrumentModalOpen(false);
            }}
            onSubmit={handleSubmit}
            defaultValue={{
              setName: newInstrumentData.instrument_name,
              setId: newInstrumentData.instrument_id,
              setQuantity: newInstrumentData.instrument_quantity,
              setLocation: newInstrumentData.instrument_location,
              setImage: newInstrumentData.instrumentImage, 
              id: newInstrumentData.id,
            }}
          />
        )}

        {user?.role === "ADMIN" && (
          <button
            className={styles.addButton}
            onClick={() => setInstrumentModalOpen(true)}
          >
            Add New Instrument
          </button>
        )}
      </div>
    </div>
  );
}

export default InstrumentsListPage;


