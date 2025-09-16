import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCartAction,
	getItemsByCategory,
	getItemsBySubCategory,
	getItemsByTitleName,
	productList,
} from "../Redux/action";
import MyNavbar from "./Navbar";

const Home = () => {
	const dispatch = useDispatch();
	const items = useSelector((state) => state.items);
	const totalPages = useSelector((state) => state.totalPages);
	const size = useSelector((state) => state.size);
	const page = useSelector((state) => state.page);
	const user = localStorage.getItem("UserName");

	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");
	const [selectedCategoryhome, setSelectedCategoryhome] = useState("");
	const [selectedSubCategoryhome, setSelectedSubCategoryhome] = useState("");
	const [fetchType, setFetchType] = useState("all");

	useEffect(() => {
		dispatch(productList(0, size));
		setFetchType("all");
	}, [dispatch, size]);

	useEffect(() => {
		if (selectedCategoryhome && selectedCategoryhome !== "ALL") {
			if (selectedSubCategoryhome && selectedSubCategoryhome !== "ALL") {
				dispatch(getItemsBySubCategory(selectedSubCategoryhome, 0, size));
				setFetchType("subcategory");
			} else {
				dispatch(getItemsByCategory(selectedCategoryhome, 0, size));
				setFetchType("category");
			}
		} else {
			dispatch(productList(0, size));
			setSelectedSubCategoryhome("");
			setFetchType("all");
		}
	}, [selectedCategoryhome, selectedSubCategoryhome, dispatch, size]);

	const handleScroll = () => {
		const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
		if (bottom && !loading && page < totalPages - 1) {
			setLoading(true);
			const nextPage = page + 1;

			switch (fetchType) {
				case "category":
					dispatch(getItemsByCategory(selectedCategoryhome, nextPage, size));
					break;
				case "subcategory":
					dispatch(getItemsBySubCategory(selectedSubCategoryhome, nextPage, size));
					break;
				case "search":
					dispatch(getItemsByTitleName(search, nextPage, size));
					break;
				default:
					dispatch(productList(nextPage, size));
					break;
			}

			setTimeout(() => setLoading(false), 500);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [loading, page, totalPages, selectedCategoryhome, selectedSubCategoryhome, fetchType, search]);

	const handleAddToCart = (card) => {
		if (card?.numberOfItems > 0) {
			dispatch(addToCartAction({ id: card.id }, user));
		} else {
			alert("Out of stock");
		}
	};

	const handleSearch = (query) => {
		setSearch(query);
		if (query) {
			dispatch(getItemsByTitleName(query, 0, size));
			setFetchType("search");
		} else {
			dispatch(productList(0, size));
			setFetchType("all");
		}
	};

	const bgColor = `rgba(${245}, ${245}, ${250}, ${1})`;

	return (
		<>
			<MyNavbar
				selectedCategory={selectedCategoryhome}
				onCategoryChange={setSelectedCategoryhome}
				selectedSubCategory={selectedSubCategoryhome}
				onSubCategoryChange={setSelectedSubCategoryhome}
				onSearchChange={handleSearch}
			/>

			<Container className="mt-4 container-elevated" style={{ borderRadius: "15px", minHeight: "100vh" }}>
				<Row style={{ margin: "7vmin" }}>
					{items.length > 0 ? items.map((card) => (
						<Col key={card.id} xs={12} sm={6} md={4} lg={3} xl={3}>
							<Card className="mb-4 product-card">
								<Card.Img
									variant="top"
									src={`data:image/jpeg;base64,${card.image}`}
									alt={card.title}
									className="product-image"
								/>

 									<Card.Body style={{ backgroundColor: bgColor }}>
									<Card.Title style={{ display: "flex", justifyContent: "center", fontSize: "1rem",margin: 0 }}>
										{card.title}
									</Card.Title>
									<Card.Text style={{ textAlign: "center", fontSize: "0.9rem", opacity: .9,margin: 0 }}>{card.description}</Card.Text>
									<Card.Text style={{ textAlign: "center", fontSize: "0.9rem",margin: 0 }}><b>Price:</b> {card.price}</Card.Text>
									<Card.Text style={{ textAlign: "center", fontSize: "0.9rem",margin: 0 }}><strong>Available:</strong> {card.numberOfItems}</Card.Text>
									<div className="flex-center">
										<Button
											variant="primary"
											onClick={() => handleAddToCart(card)}
											disabled={card.numberOfItems <= 0}
											className="button-primary"
										>
											{card.numberOfItems > 0 ? "Add To Cart" : "Out of Stock"}
										</Button>
									</div>
								</Card.Body>
							</Card>
						</Col>
					)) : <p>No products found.</p>}
				</Row>

				{loading && <div style={{ textAlign: "center", padding: "10px" }}>Loading more items...</div>}
			</Container>
		</>
	);
};

export default Home;



// import { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     addToCartAction,
//     getItemsByCategory,
//     getItemsBySubCategory,
//     productList,
// } from "../Redux/action";
// import MyNavbar from "./Navbar";

// const Home = () => {
//     const dispatch = useDispatch();

//     const items = useSelector((state) => state.items);
//     const totalPages = useSelector((state) => state.totalPages);
//     const size = useSelector((state) => state.size);
//     const page = useSelector((state) => state.page);

//     // const [pages, setPage] = useState(0);    
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [selectedCategoryhome, setSelectedCategoryhome] = useState("");
//     const [selectedSubCategoryhome, setSelectedSubCategoryhome] = useState("");

//     const user = localStorage.getItem("UserName");

//     useEffect(() => {
//         dispatch(productList(page, size));
//     }, [dispatch, page, size]);

//     const handleScroll = () => {
//         const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
//         console.log("Scroll Triggered - bottom:", bottom, "page:", page, "totalPages:", totalPages);
    
//         if (bottom && !loading && page < totalPages - 1) {
//             if (selectedCategoryhome) {
//                 console.log("selectedCategoryhome",selectedCategoryhome);
//                 dispatch(getItemsByCategory(selectedCategoryhome, page + 1, size));
                
//             }
//             else{
                
//                 dispatch(productList(page + 1, size));
//             }
//             // console.log("Fetching more data...");
//             // const nextPage = pages + 1;
            
//             // setPage(nextPage);
//         }
//         else{
//             setLoading(true);
//             setTimeout(() => setLoading(false), 500);

//         }
//     };
    

//     useEffect(() => {
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [loading, page, totalPages]);

//     const handleAddToCart = (card) => {
//         if (card?.numberOfItems > 0) {
//             const formDataObject = {
//                 id: card.id,
//             };
//             dispatch(addToCartAction(formDataObject, user));
//         } else {
//             alert("Out of stock");
//         }
//     };

//     useEffect(() => {
        
//         if (selectedCategoryhome !== "ALL" && selectedCategoryhome !== "") {
            
//             if (selectedSubCategoryhome !== "ALL" ) {
//                 dispatch(getItemsBySubCategory(selectedSubCategoryhome, page, size));
//             } else {
                
//                 dispatch(getItemsByCategory(selectedCategoryhome, page, size));
//                 console.log('selectedCategoryhome....',selectedCategoryhome);
//             }
//         } else {
//             // setPage(0);
//             dispatch(productList(page, size));
//             setSelectedSubCategoryhome("");
//             // setShowSubcategoryDropdown(false);
//         }
//     }, [selectedCategoryhome, selectedSubCategoryhome, dispatch, size]);

//     const handleSearch = (e) => setSearch(e.target.value);

//     const filteredItems = items?.filter((item) =>
//         item.title?.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <>
//             <MyNavbar
//                 selectedCategory={selectedCategoryhome}
//                 onCategoryChange={setSelectedCategoryhome}
//                 selectedSubCategory={selectedSubCategoryhome}
//                 onSubCategoryChange={setSelectedSubCategoryhome}
//             />

//             <Container className="mt-4" style={{ borderRadius: "15px", minHeight: "100vh", backgroundColor: "rgb(246, 245, 248)" }}>
//                 <Form className="mb-4">
//                     <Form.Group controlId="search">
//                         <Form.Control
//                             type="text"
//                             placeholder="Search products by title..."
//                             value={search}
//                             onChange={handleSearch}
//                             style={{ maxWidth: "400px", margin: "0 auto" }}
//                         />
//                     </Form.Group>
//                 </Form>

//                 <Row style={{ margin: "7vmin" }}>
//                     {items.length > 0 ? items.map((card) => (
//                         <Col key={card.id} xs={12} sm={6} md={4} lg={3} xl={3}>
//                             <Card className="mb-4"
//                                 style={{
//                                     border: "1px solid rgb(65, 64, 64)",
//                                     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                                     transition: "transform 0.3s ease-in-out",
//                                 }}
//                                 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//                                 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//                             >
//                                 <Card.Img
//                                     variant="top"
//                                     src={`data:image/jpeg;base64,${card.image}`}
//                                     alt={card.title}
//                                     style={{ height: "30vmin", width: "100%" }}
//                                 />
//                                 <Card.Body>
//                                     <Card.Title style={{ display: "flex", justifyContent: "center", backgroundColor: "#d2f8d2", fontSize: "1rem" }}>
//                                         {card.title}
//                                     </Card.Title>
//                                     <Card.Text style={{ textAlign: "center", fontSize: "0.8rem", backgroundColor: "#d2f8d2" }}>
//                                         {card.description}
//                                     </Card.Text>
//                                     <Card.Text style={{ textAlign: "center", backgroundColor: "#d2f8d2", fontSize: "0.8rem" }}>
//                                         <b>Price:</b> {card.price}
//                                     </Card.Text>
//                                     <Card.Text style={{ textAlign: "center", backgroundColor: "#d2f8d2", fontSize: "0.8rem" }}>
//                                         <strong>Available:</strong> {card.numberOfItems}
//                                     </Card.Text>
//                                     <div style={{ display: "flex", justifyContent: "center" }}>
//                                         <Button
//                                             variant="primary"
//                                             onClick={() => handleAddToCart(card)}
//                                             disabled={card.numberOfItems <= 0}
//                                         >
//                                             {card.numberOfItems > 0 ? "Add To Cart" : "Out of Stock"}
//                                         </Button>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     )) : <p>No products found.</p>}
//                 </Row>

//                 {loading && <div style={{ textAlign: "center", padding: "10px" }}>Loading more items...</div>}
//             </Container>
//         </>
//     );
// };

// export default Home;












// import { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Button, Form } from "react-bootstrap"; // Added Form
// import { useDispatch, useSelector } from "react-redux";
// import { addToCartAction, getCategory, getItemsByCategory, getItemsBySubCategory, getSubCategory, productList } from "../Redux/action";
// import MyNavbar from "./Navbar";

// const Home = () => {
//     const page = useSelector((state) => state.page)
//     const size = useSelector((state) => state.size);
//     const items = useSelector((state) => state.items);
//     console.log("items......", items);
//    // const [cards, setCards] = useState(items);
//     const [pages, setPage] = useState(page);
//     // const [filteredItems, setFilteredItems] = useState(items?.content);
//     const [selectedCategoryhome, setSelectedCategoryhome] = useState();
//     const [selectedSubCategoryhome, setSelectedSubCategoryhome] = useState();
//      console.log("selectedCategoryhome",selectedCategoryhome)
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch();

//     const user = localStorage.getItem("UserName");
    
//     // console.log("data...",items)    
//     const totalPages = useSelector((state) => state.totalPages);

//     // Fetch the product list when page changes
//     useEffect(() => {
//         dispatch(productList(pages, size));
//     }, [dispatch, pages, size]); // Empty dependency array as per original code


//     // Handle loading more data when scroll reaches the bottom
//     const handleScroll = () => {
//         const documentHeight = document.documentElement.scrollHeight;
//         const windowHeight = window.innerHeight;
//         const scrollPosition = document.documentElement.scrollTop;

//         const bottom = scrollPosition + windowHeight >= documentHeight -1;

//         if (bottom && !loading && pages < totalPages - 1) {
//             setLoading(true);
//             const newPage = pages + 1;
//             setPage(newPage);
//             dispatch(productList(newPage, size));
//             setTimeout(() => setLoading(false), 500);
//         }
        
//     };

//     useEffect(() => {
//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, [loading, pages, totalPages]);

//     const handleAddToCart = (card) => {
//         if (card?.numberOfItems > 0) {
//             const formDataObject = {
//                 id: card.id,
//             };
//             dispatch(addToCartAction(formDataObject, user));
//         } else {
//             alert("Out of stock");
//         }
//     };

//     useEffect(() => {
//         if (selectedCategoryhome && selectedCategoryhome !== "All") {
            
//           if (selectedSubCategoryhome && selectedSubCategoryhome !== "All") {
            
//             dispatch(getItemsBySubCategory(selectedSubCategoryhome, 0, 4));
           
//           } else {
//             dispatch(getItemsByCategory(selectedCategoryhome, 0, 4));
//           }
//         } else {
//           dispatch(productList(page, size));
//           setSelectedSubCategoryhome("");
//         }
//       }, [selectedCategoryhome, selectedSubCategoryhome, dispatch, size]);

//     // Search handler
//     const handleSearch = (e) => {
//         setSearch(e.target.value);
//     };

//    // Filter cards based on search
//     // useEffect(() => {
//     //     const result = items?.content?.filter((a) =>
//     //         a.title && a.title.toLowerCase().includes(search.toLowerCase())
//     //     );
//     //     setFilteredItems(result);
//     // }, [search, items]);

//     const handleCategoryChange = (e) => {
//         setSelectedCategoryhome(e);
//     }

//     const handleSubCategoryChange = (e) =>{
//         setSelectedSubCategoryhome(e);
//     }

    
//     return (
//         <>
//             <MyNavbar  
//             selectedCategory={selectedCategoryhome}  
//             onCategoryChange={handleCategoryChange} 
//             selectedSubCategory={selectedSubCategoryhome} 
//             onSubCategoryChange={handleSubCategoryChange}
//             />

//             <Container className="mt-4" style={{borderRadius:"15px", minHeight: "100vh", backgroundColor:"rgb(246, 245, 248)" }}>
//                 {/* Search Input Field */}
//                 <Form className="mb-4">
//                     <Form.Group controlId="search">
//                         <Form.Control
//                             type="text"
//                             placeholder="Search products by title..."
//                             value={search}
//                             onChange={handleSearch}
//                             style={{ maxWidth: "400px", margin: "0 auto" }}
//                         />
//                     </Form.Group>
//                 </Form>
//                 <Row style={{ margin: "7vmin" }}>
                    
//                     {Array.isArray(items)?items.map((card) => (
//                         <Col key={card.id} xs={12} sm={6} md={4} lg={3} xl={3}>
//                             <Card
//                                 className="mb-4"
//                                 style={{
//                                     border: "1px solid rgb(65, 64, 64)",
//                                     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                                     transition: "transform 0.3s ease-in-out",
//                                 }}
//                                 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//                                 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//                             >
//                                 <Card.Img
//                                     variant="top"
//                                     src={`data:image/jpeg;base64,${card.image}`}
//                                     alt={card.title}
//                                     style={{
//                                         height: "30vmin",
//                                         width: "100%",
//                                     }}
//                                 />
//                                 <Card.Body>
//                                     <Card.Title
//                                         className="cardTextStyle"
//                                         style={{
//                                             display: "flex",
//                                             justifyContent: "center",
//                                             backgroundColor: "#d2f8d2",
//                                             fontSize: "1rem",
//                                         }}
//                                     >
//                                         {card.title}
//                                     </Card.Title>
//                                     <Card.Text
//                                         className="cardTextStyle"
//                                         style={{
//                                             display: "flex",
//                                             justifyContent: "center",
//                                             backgroundColor: "#d2f8d2",
//                                             fontSize: "0.775rem",
//                                         }}
//                                     >
//                                         {card.description}
//                                     </Card.Text>
//                                     <Card.Text
//                                         className="cardTextStyle"
//                                         style={{
//                                             display: "flex",
//                                             justifyContent: "center",
//                                             backgroundColor: "#d2f8d2",
//                                             fontSize: "0.775rem",
//                                         }}
//                                     >
//                                         <b>Price: </b> {card.price}
//                                     </Card.Text>
//                                     <Card.Text
//                                         className="cardTextStyle"
//                                         style={{
//                                             display: "flex",
//                                             justifyContent: "center",
//                                             backgroundColor: "#d2f8d2",
//                                             fontSize: "0.775rem",
//                                         }}
//                                     >
//                                         <strong>Number of available items: </strong> {card.numberOfItems}
//                                     </Card.Text>
//                                     <div style={{ margin: "5px", display: "flex", justifyContent: "center" }}>
//                                         <Button
//                                             variant="primary"
//                                             onClick={() => handleAddToCart(card)}
//                                             disabled={card.numberOfItems <= 0}
//                                         >
//                                             {card.numberOfItems > 0 ? "Add To Cart" : "Out of Stock"}
//                                         </Button>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     )):"no"}
//                 </Row>
//                 {loading && <div className="loading-text">Loading more items...</div>}
//             </Container>
//         </>
//     );
// };

// export default Home;

