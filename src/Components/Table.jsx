import React, { useEffect, useState } from "react";
import { Button, Container, Table, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, productList } from "../Redux/action";

const TableComponent = () => {
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [page, setPage] = useState(0); // Current page number
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    const itemsPerPage = 5; // Number of items per page

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.items);

    // Fetch data when the page number changes
    useEffect(() => {
        dispatch(productList(page, itemsPerPage));
    }, [dispatch, page]);

    // Handle search filtering
    useEffect(() => {
        const result = data.filter((a) =>
            a.title && a.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredItems(result);
    }, [search, data]);

    // Calculate the total number of pages based on the total number of items
    useEffect(() => {
        // console.log("datalength in useEffect: ", data.length)
        if (data.length > 0) {
            setTotalPages(Math.ceil(data.length / itemsPerPage));
        }
    }, [data]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
        dispatch(productList(0, itemsPerPage)); // Reload first page after delete
    };

    const handleUpdate = (card) => {
        navigate("/update", { state: { card } });
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber); // Update the page number on click
    };

    // Generate the pagination range to show 5 pages around the current page
    const getPaginationRange = () => {
        const range = 5; // Show 5 page numbers at a time
        let start = Math.max(0, page - Math.floor(range / 2));
        let end = Math.min(totalPages - 1, start + range - 1);

        if (end - start < range - 1) {
            start = Math.max(0, end - range + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <Container className="my-4" style={{ minHeight: "100vh" }}>
            <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: "20px", padding: "5px", width: "100%" }}
            />
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th><b>Sr.No</b></th>
                        <th><b>Title</b></th>
                        <th><b>Description</b></th>
                        <th><b>Image</b></th>
                        <th><b>Stock Quantity</b></th>
                        <th><b>Price</b></th>
                        <th><b>Actions</b></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((record, index) => (
                            <tr key={record.id}>
                                <td>{index + 1}</td>
                                <td>{record.title || "N/A"}</td>
                                <td>{record.description || "N/A"}</td>
                                <td>
                                    <img
                                        src={`data:image/jpeg;base64,${record.image}`|| "placeholder.jpg"}
                                        alt="img"
                                        width="75"
                                        height="75"
                                        style={{ borderRadius: "5px" }}
                                    />
                                </td>
                                <td>{record.numberOfItems || 0}</td>
                                <td>{record.price || "N/A"}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        style={{ margin: "5px" }}
                                        onClick={() => handleUpdate(record)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="danger"
                                        style={{ margin: "5px" }}
                                        onClick={() => handleDelete(record.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No items found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Pagination Controls */}
            <Pagination>
                {/* "Previous" Button */}
                <Pagination.Prev
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                />
                {getPaginationRange().map((number) => (
                    <Pagination.Item
                        key={number}
                        active={number === page}
                        onClick={() => handlePageClick(number)}
                    >
                        {number + 1}
                    </Pagination.Item>
                ))}
                {/* "Next" Button */}
                <Pagination.Next
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages + 3}
                />
            </Pagination>
        </Container>
    );
};

export default TableComponent;














// import React, { useEffect, useState } from "react";
// import { Button, Container, Table } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteProduct, productList } from "../Redux/action";

// const TableComponent = () => {
//     const [search, setSearch] = useState("");
//     const [filteredItems, setFilteredItems] = useState([]);
//     const [cards, setCards] = useState([]); // Cards to be displayed
//     const [page, setPage] = useState(0); // Current page number
//     const [loading, setLoading] = useState(false); // Loading state for infinite scroll
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const data = useSelector((state) => state.items);

//     useEffect(() => {
//         dispatch(productList(0, 10));
//     }, [dispatch]);

//      // Append new cards when data is updated
//      useEffect(() => {
//         if (page === 0) {
//             // On initial load, just set the cards
//             setCards(data);
//         } else {
//             // On further page load, append the new data
//             setCards((prevCards) => {
//                 // Avoid duplicates by checking the current cards
//                 const newCards = data.filter(
//                     (card) => !prevCards.some((existingCard) => existingCard.id === card.id)
//                 );
//                 return [...prevCards, ...newCards];
//             });
//         }
//     }, [data, page]); // Run when data or page changes

//     // Handle loading more data when scroll reaches the bottom
//     const handleScroll = () => {
//         const documentHeight = document.documentElement.scrollHeight;
//         const windowHeight = window.innerHeight;
//         const scrollPosition = document.documentElement.scrollTop;

//         const bottom = (scrollPosition + windowHeight) >= documentHeight -1;

//         if (bottom && !loading) {
//                 setLoading(true);
//                 setPage((page) => {
//                     const newPage =page + 1;
//                     dispatch(productList(newPage, 4)); // Fetch next page
//                     return newPage;
//                 });
//                 setTimeout(() => setLoading(false), 500);
//         }
//     };

//     useEffect(() => {
//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, [loading]);


//     useEffect(() => {
//         const result = data.filter((a) =>
//             a.title && a.title.toLowerCase().includes(search.toLowerCase())
//         );
//         setFilteredItems(result);
//     }, [search, data]);

//     const handleDelete = (id) => {
//         dispatch(deleteProduct(id));
//         dispatch(productList(0, 10));
//     };

//     const handleUpdate = (card) => {
//         console.log("The card is: ", card);
//         navigate("/update", { state: { card } });
//     };

//     return (
//         <Container className="my-4" style={{ minHeight: "100vh" }}>
//             <input
//                 type="text"
//                 placeholder="Search by title..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 style={{ marginBottom: "20px", padding: "5px", width: "100%" }}
//             />
//             <Table striped bordered hover responsive>
//                 <thead>
//                     <tr>
//                         <th><b>Sr.No</b></th>
//                         <th><b>Title</b></th>
//                         <th><b>Description</b></th>
//                         <th><b>Image</b></th>
//                         <th><b>Stock Quantity</b></th>
//                         <th><b>Price</b></th>
//                         <th><b>Actions</b></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredItems.length > 0 ? (
//                         filteredItems.map((record, index) => (
//                             <tr key={record.id}>
//                                 <td>{index + 1}</td>
//                                 <td>{record.title || "N/A"}</td>
//                                 <td>{record.description || "N/A"}</td>
//                                 <td>
//                                     <img
//                                         src={record.image || "placeholder.jpg"}
//                                         alt="img"
//                                         width="100"
//                                         height="100"
//                                         style={{ borderRadius: "5px" }}
//                                     />
//                                 </td>
//                                 <td>{record.numberOfItems || 0}</td>
//                                 <td>{record.price || "N/A"}</td>
//                                 <td>
//                                     <Button
//                                         variant="primary"
//                                         style={{ margin: "5px" }}
//                                         onClick={() => handleUpdate(record)}
//                                     >
//                                         Update
//                                     </Button>
//                                     <Button
//                                         variant="danger"
//                                         style={{ margin: "5px" }}
//                                         onClick={() => handleDelete(record.id)}
//                                     >
//                                         Delete
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="7">No items found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// export default TableComponent;