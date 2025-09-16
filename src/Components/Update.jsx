import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategory, getSubCategoriesByCategoryId, productList, updateProduct } from "../Redux/action";
import { Container, Form, Button } from "react-bootstrap";

const Update = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const record = location.state?.card;  // Get the product details passed via location state

    const categoryData = useSelector((state) => state.category)
    const subCategories = useSelector((state) => state.subCategory)

    const [productData, setProductData] = useState({
        title: "",
        description: "",
        image: null,
        price: "",
        numberOfItems: 0,
        category: "",
        subCategory: ""
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        numberOfItems: "",
        price: "",
        image: null,
        category: "",
        subCategory: ""
    });

    useEffect(() => {
        dispatch(getCategory());
        const dataid = categoryData.id;

    }, [dispatch])

    console.log('categories are: ', categoryData);
    console.log("subCategories are: ", subCategories);

    const changeHandler = (e, fieldValue) => {
        const value1 = e.target.value;
        console.log('value1..................', value1);


        setProductData((prevState) => ({
            ...prevState,
            [fieldValue]: value1,
        }));


        setErrors((prevState) => ({
            ...prevState,
            [fieldValue]: '',
        }));
    }
    const changeCategoryHandler = (e, fieldValue) => {
        const value1 = e.target.value;
        console.log('value1..................', value1);

        setProductData((prevState) => ({
            ...prevState,
            [fieldValue]: value1,
        }));
        dispatch(getSubCategoriesByCategoryId(value1));

        setErrors((prevState) => ({
            ...prevState,
            [fieldValue]: '',
        }));
    }
    const changeSubHandler = (e, fieldValue) => {
        const value1 = e.target.value;
        console.log('value sub..................', value1);


        setProductData((prevState) => ({
            ...prevState,
            [fieldValue]: value1,
        }));

        setErrors((prevState) => ({
            ...prevState,
            [fieldValue]: '',
        }));
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductData((prevState) => ({
                ...prevState,
                image: file,
            }));

            setErrors((prevState) => ({
                ...prevState,
                image: "",
            }));
        }
    };

    useEffect(() => {
        if (record) {
            setProductData(record);  // Set form data from the record if available
        }
    }, [record]);

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!productData.title.trim()) {
            formErrors.title = "Title is required";
            isValid = false;
        }

        if (!productData.description.trim()) {
            formErrors.description = "Description is required";
            isValid = false;
        }

        if (!productData.category.trim()) {
            formErrors.category = 'Category is required';
            isValid = false;
        }

        if (!productData.subCategory.trim()) {
            formErrors.subCategory = 'Sub-Category is required';
            isValid = false;
        }

        if (productData.numberOfItems < 0) {
            formErrors.numberOfItems = "Stock quantity cannot be negative";
            isValid = false;
        }

        if (productData.price < 0) {
            formErrors.price = "Price quantity cannot be negative";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        // Preparing form data to dispatch for updating product
        const formData = new FormData()
        formData.append("title", productData.title)  // Ensure the product ID is included in the form data
        formData.append("description", productData.description)
        formData.append("price", productData.price)
        formData.append("numberOfItems", productData.numberOfItems)
        formData.append("image", productData.image)
        formData.append("category", productData.category)
        formData.append("subCategory", productData.subCategory)

        // Dispatch the update product action
        const id = record.id
        dispatch(updateProduct(id, formData));
        dispatch(productList());

        // Clear the form after submission
        setProductData({
            title: "",
            description: "",
            image: null,
            price: "",
            numberOfItems: 0,
            category: "",
            subCategory: ""
        });

        navigate("/home");  // Redirect to home page after update
    };

    const renderImagePreview = () => {
        if (productData.image) {
            return (
                <img
                    src={URL.createObjectURL(productData.image)}
                    alt="Product"
                    style={{ width: "120px", height: "80px", marginTop: "20px" }}
                />
            );
        }
        return null;
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Update Card</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={productData.title}
                        onChange={(e) => changeHandler(e, "title")}
                    />
                    {errors.title && <div className="text-danger">{errors.title}</div>}
                </Form.Group>

                <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        value={productData.description}
                        onChange={(e) => changeHandler(e, "description")}
                    />
                    {errors.description && (
                        <div className="text-danger">{errors.description}</div>
                    )}
                </Form.Group>

                <Form.Group controlId="formCategory" className="mt-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        rows={3}
                        placeholder="Enter category"
                        value={productData.category}
                        onChange={(e) => changeCategoryHandler(e, "category")}
                    >
                        <option value="">Select Category</option>
                        {categoryData.map(i => (
                            <option key={i.id} value={i.id}>{i.category}</option>
                        ))}

                    </Form.Control>
                    {errors.category && <div className='text-danger'>{errors.category}</div>}
                </Form.Group>

                <Form.Group controlId="formSubCategory" className="mt-3">
                    <Form.Label>Sub-Category</Form.Label>
                    <Form.Control
                        as="select"
                        name='subCategory'
                        placeholder="Enter subCategory"
                        value={productData.subCategory}
                        onChange={(e) => changeSubHandler(e, "subCategory")}
                    >
                        <option value="">Select Sub Category</option>
                        {subCategories.map(index => (
                            <option key={index.id} value={index.id}>{index.subCategoryName}</option>
                        ))}
                    </Form.Control>
                    {errors.subCategory && <div className='text-danger'>{errors.subCategory}</div>}
                </Form.Group>


                <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Price"
                        value={parseInt(productData.price.replace(/,/g, ""), 10)}
                        onChange={(e) => changeHandler(e, "price")}
                    />
                    {errors.price && <div className="text-danger">{errors.price}</div>}
                </Form.Group>

                <Form.Group controlId="formNumberOfItems">
                    <Form.Label>Number of Items</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Number of Items available for sale"
                        value={productData.numberOfItems}
                        onChange={(e) => changeHandler(e, "numberOfItems")}
                    />
                    {errors.numberOfItems && (
                        <div className="text-danger">{errors.numberOfItems}</div>
                    )}
                </Form.Group>

                <Form.Group controlId="formFile" className="mt-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file" onChange={handleImageUpload} />
                </Form.Group>

                {/* {renderImagePreview()} */}

                <Button variant="primary" type="submit" className="mt-3">
                    Update
                </Button>
            </Form>
        </Container>
    );
};

export default Update;
