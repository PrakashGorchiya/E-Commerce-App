import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, productList } from "../Redux/action";

const Home = () => {
    const [cards, setCards] = useState([]); // Cards to be displayed
    const [page, setPage] = useState(1); // Current page number
    const [loading, setLoading] = useState(false); // Loading state for infinite scroll
   
    const data = useSelector((state) => state.items); // Get items from Redux state
    const dispatch = useDispatch();

    // Fetch the product list on mount
    useEffect(() => {
        dispatch(productList());
    }, [dispatch]);

    // Handle loading more data when scroll reaches the bottom
    const handleScroll = () => {
        if (loading || data.length <= page * 4) return; // If already loading or no more data
        const bottom = Math.floor(window.innerHeight + document.documentElement.scrollTop) === (document.documentElement.scrollHeight);
        
        console.log('bottom',bottom);
        console.log(window.innerHeight); 
        console.log(document.documentElement.scrollTop);
        console.log(document.documentElement.scrollHeight);
        
        if (bottom) {
            // setLoading(false);
            setTimeout(() => {
                setPage((prevPage) => prevPage + 1); // Increase the page number when reaching the bottom
                setLoading(false);
            }, 500); // Simulate loading delay
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loading, page]);

    useEffect(() => {
        // Slice the data to display 3 cards per page
        const cardsToDisplay = data.slice(0, page * 3);

        setCards(cardsToDisplay); // Update the cards state
    }, [data, page]); // Only re-run when `data` or `page` changes 

    const handleAddToCart = (card) => {
        if (card?.numberOfItems > 0) {
            dispatch(addToCartAction(card.id));
        } else {
            alert("Out of stock");
        }
    };

    return (
        <Container className="mt-4">
            <Row style={{ margin: "10vmin" }}>
                {cards.map((card) => (
                    <Col key={card.id} sm={12} md={4} lg={4} xl={4}>
                        <Card
                            className="mb-4"
                            style={{
                                width: "310px",
                                height: "450px",
                                border: "1px solid rgb(65, 64, 64)",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.3s ease-in-out",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            <Card.Img variant="top" src={card.image} alt={card.title} height={220} width={80} />
                            <Card.Body>
                                <Card.Title className="cardTextStyle" style={{ display: "flex", justifyContent: "center", backgroundColor: "#d2f8d2", }}>
                                    {card.title}
                                </Card.Title>
                                <Card.Text className="cardTextStyle" style={{ display: "flex", justifyContent: "center", backgroundColor: "#d2f8d2", }}>
                                    {card.description}
                                </Card.Text>
                                <Card.Text className="cardTextStyle" style={{ display: "flex", justifyContent: "center", backgroundColor: "#d2f8d2", }}>
                                    <b>Price: </b> {card.price}
                                </Card.Text>
                                <Card.Text className="cardTextStyle" style={{ display: "flex", justifyContent: "center", backgroundColor: "#d2f8d2", }}>
                                    <strong>Number of available items: </strong> {card.numberOfItems}
                                </Card.Text>
                                <div style={{ margin: "5px", display: "flex", justifyContent: "center" }}>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleAddToCart(card)}
                                        disabled={card.numberOfItems <= 0}
                                    >
                                        {card.numberOfItems > 0 ? "Add To Cart" : "Out of Stock"}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {loading && <div className="loading-text">Loading more items...</div>}
        </Container>
    );
};

export default Home;

