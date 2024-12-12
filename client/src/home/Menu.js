import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Menu() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [user] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    return userData ? userData._id : null;
  });

  const getAllItems = async () => {
    try {
      const { data } = await axios.get("/api/v1/item/get-item");
      if (data?.success) {
        const items = data.item.map((item) => ({
          ...item,
          selectedOption: "",
        }));
        setItems(items);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting food");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const handleAddToCart = async (cartItem, selectedOption) => {
    if (user == null) {
      navigate("/login");
    } else {
      const selectedItem = items.find((item) => item._id === cartItem);

      if (selectedItem) {
        let selectedPrice = selectedItem.price1; // Set default price to price1

        if (selectedOption === "Both") {
          selectedPrice = selectedItem.price2;
        }

        try {
          const cartItemWithSchedule = {
            item: cartItem,
            schedule: selectedOption,
            price: selectedPrice,
          };

          const cartItems = [...cart, cartItemWithSchedule];
          const result = await axios.post("/api/v1/cart/add-cart", {
            user,
            cartItems,
          });

          if (result.data.success) {
            toast.success("Cart Added Successfully!");
            setCart(cartItems);

            // Reset selected option after adding to cart
            const updatedItems = items.map((item) =>
              item._id === cartItem ? { ...item, selectedOption: "" } : item
            );
            setItems(updatedItems);
          }
        } catch (error) {
          toast.error("Failed to place the order.");
        }
      } else {
        toast.info("Invalid item selected");
      }
    }
  };

  const handleSelectChange = (e, itemId) => {
    const updatedItems = items.map((item) =>
      item._id === itemId ? { ...item, selectedOption: e.target.value } : item
    );
    setItems(updatedItems);
  };

  const handleButtonClick = (cartItem) => {
    const selectedItem = items.find((item) => item._id === cartItem);
    if (!selectedItem.selectedOption) {
      toast.error("Please select a schedule before adding to cart.");
    } else {
      handleAddToCart(cartItem, selectedItem.selectedOption);
    }
  };

  return (
    <>
      <Header cartCount={cart.length} />
      <div className="container mx-auto py-8">
        <div className="mt">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            All Tiffin Centers
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img
                  src={`/api/v1/item/get-photo/${item._id}`}
                  className="w-80 h-[300px] mb-4 border border-pink-500 bg-orange-100 rounded-[5px] p-3"
                  alt={item.name}
                />
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600 mb-2">
                  ₹ {item.selectedOption === "Both" ? item.price2 : item.price1}
                </p>
                <p className="text-gray-500">{item.description.slice(0,25)}</p>
                <p className="text-gray-500 bg-slate-200 italic">
                  {item.thaliType}
                </p>

                <div className="sm:col-span-3 mb-4">
                  <label
                    htmlFor={`schedule-${item._id}`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Select Schedule
                  </label>
                  <div className="mt-2">
                    <select
                      id={`schedule-${item._id}`}
                      name={`schedule-${item._id}`}
                      value={item.selectedOption}
                      onChange={(e) => handleSelectChange(e, item._id)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option disabled value="" selected>
                        Select Schedule
                      </option>
                      <option value="Morning">Morning Only </option>
                      <option value="Evening">Evening Only</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                </div>

                <button
                  className="bg-blue-500 text-white p-2 rounded-md mt-2"
                  onClick={() => handleButtonClick(item._id)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}
