import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { cartList, getCategory, getItemsByCategory, getItemsBySubCategory, getSubCategoriesByCategoryId } from '../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyNavbar = ({ selectedCategory, onCategoryChange, selectedSubCategory, onSubCategoryChange,  onSearchChange }) => {

	const [seletedCategoryData, setSelectcategoryData] = useState(selectedCategory);
	selectedCategory = seletedCategoryData;
	const page = useSelector((state) => state.page)
	const size = useSelector((state) => state.size)

	const categoryData = useSelector((state) => state.category)
	const subcategories = useSelector((state) => state.subCategory);

	const [selectedSubcategorydata, setSelectedSubcategory] = useState(null);
	const [showSubcategoryDropdown, setShowSubcategoryDropdown] = useState(false);

	const user = localStorage.getItem("UserName");
	const [cartVisible, setCartVisible] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState('');
	
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cards = useSelector((state) => state?.cartItems);
	const allCards = useSelector((state) => state.items);

	const onCategoryChangedata = (event) => {
		const categoryId = event.target.value;
		onCategoryChange(categoryId);
		setSelectcategoryData(categoryId);
		setShowSubcategoryDropdown(true);
	};

	const onSubCategoryChangedata = (event) => {
		const subcategoryId = event.target.value;
		onSubCategoryChange(subcategoryId);
		setSelectedSubcategory(subcategoryId);
		setShowSubcategoryDropdown(true);
	}

	const onSearchChangeData = (event) => {
		const query = event.target.value;
		onSearchChange(query);
		setSearchQuery(query);
	}

	useEffect(() => {
		if (seletedCategoryData === "ALL") {
			dispatch(getItemsByCategory("ALL", page, size));
		} else if (seletedCategoryData) {
			dispatch(getItemsByCategory(seletedCategoryData, page, size));
			setShowSubcategoryDropdown(true);
		}
	}, [seletedCategoryData]);

	useEffect(() => {
		if (seletedCategoryData) {
			dispatch(getSubCategoriesByCategoryId(seletedCategoryData));
			setShowSubcategoryDropdown(true);
		}
	}, [seletedCategoryData]);

	useEffect(() => {
		dispatch(cartList());
		dispatch(getCategory());
	}, [dispatch]);

	const cartItems = () => {
		setCartVisible(!cartVisible);
		navigate("/cart");
	};

	const handlelogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('UserName');
		navigate('/');
	};

	return (
		<nav className="navbar-glass" style={{
			display: 'flex',
			gap: '16px',
			padding: '10px 16px',
			justifyContent: 'space-between',
			alignItems: 'center',
			backgroundColor: 'rgba(255,240,245,1)',
			color: 'var(--color-text)',
			borderBottom: '1px solid var(--color-border)',
			boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
		}}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
				<Link to="/home" style={{ padding: '8px 10px', color: 'var(--color-text)' }}>Home</Link>
				<Link to="/create" style={{ padding: '8px 10px', color: 'var(--color-text)' }}>Create</Link>
				<Link to="/admin" style={{ padding: '8px 10px', color: 'var(--color-text)' }}>Admin</Link>
			</div>

			<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
				<select
					value={selectedCategory || ""}
					onChange={onCategoryChangedata}
					className="form-select input-field"
					style={{ width: '200px' }}
				>
					<option value="">ALL</option>
					{categoryData?.map((e) => (
						<option key={e.id} value={e.id}>
							{e.category}
						</option>
					))}
				</select>

				{showSubcategoryDropdown &&
					seletedCategoryData &&
					subcategories.length > 0 &&
					selectedCategory !== "" && (
						<select
							value={selectedSubCategory || ""}
							onChange={onSubCategoryChangedata}
							className="form-select input-field"
							style={{ width: '200px' }}
						>
							<option value="">Select Subcategory</option>
							{subcategories.map((subcategory) => (
								<option key={subcategory.id} value={subcategory.id}>
									{subcategory.subCategoryName}
								</option>
							))}
						</select>
					)}
			</div>

			<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
				<input
					type="text"
					value={searchQuery || ""}
					onChange={ onSearchChangeData }
					placeholder="Search products"
					className="input-field"
					style={{ padding: '8px 10px', fontSize: '16px' }}
				/>
				<button
					onClick={() => onSearchChange(searchQuery)}
					className="button-primary"
					style={{ fontSize: '15px' }}
				>
					Search
				</button>
			</div>

			<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
				<span style={{ opacity: .9 }}>{user}</span>
				<button onClick={cartItems} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit' }}>
					<FaShoppingCart size={24} />
					{cards.data?.length > 0 && <span style={{ backgroundColor: 'red', color: 'white', borderRadius: '10px', padding: '0 6px', fontSize: '12px', marginLeft: '4px' }}>{cards.data?.length}</span>}
				</button>
				<button onClick={handlelogout} className="button-ghost" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
					<FaSignOutAlt size={16} /> Logout
				</button>
			</div>
		</nav>
	);
};

export default MyNavbar;
