import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCcAmazonPay, FaShoppingBag } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

const CustomerCart = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("auth");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartData, setCartData] = useState("");

  const fetchCart = async () => {
    try {
      const res = await axios.get(`/api/v1/cart/get-cart/${userData._id}`);

      if (res.data.getItems && res.data.getItems.cartItems) {
        setCartData(res.data);
        // console.log(res, "get cart");

        setCart(res.data.getItems.cartItems);
        // console.log(res.data.getItems.cartItems, "carrrrt");
        //console.log(res.data.getItems.cartItems, "cartItems");
        //console.log(res.data.getItems.cartItems[0].schedule, "schedule");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  const removeCart = async () => {
    try {
      await axios.delete(`/api/v1/cart/delete-cart/${userData._id}`);
      toast.success("cart Deleted Successfully");
      window.location.reload();
    } catch (error) {
      toast.error("cart was not deleted");
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchCart();

    fetchOrderId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const itemPromises = cart.map((cartItem) => fetchDetail(cartItem.item));

      const itemsData = await Promise.all(itemPromises);
      setItems(itemsData.filter((item) => item));
    };

    fetchData();
  }, [cart]);
  const fetchDetail = async (itemId) => {
    try {
      const response = await axios.get(
        `/api/v1/item/get-singleItemById/${itemId}`
      );
      // console.log(response.data, "data of item");
      // console.log(cart, " this is  cart ");

      return response.data.item;
    } catch (error) {
      console.log("Error fetching item details:", error);
      return null;
    }
  };

  function generateUniqueId(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let id = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      id += characters.charAt(randomIndex);
    }

    return id;
  }

  //for uuid
  async function fetchOrderId() {
    try {
      const orderid = "dharmaId" + generateUniqueId(12);
      setOrderId(orderid);
    } catch (error) {
      console.error("Error fetching order ID:", error);
    }
  }

  const totalPrice = () => {
    try {
      let totalAmount = 0;

      cart.forEach((cartItem) => {
        const item = items.find((item) => item._id === cartItem.item);

        if (item) {
          const itemPrice =
            cartItem.schedule === "Both" ? item.price2 : item.price1;
          totalAmount += Math.round(itemPrice);
        }
      });

      localStorage.setItem("amount", JSON.stringify(totalAmount));

      return totalAmount;
    } catch (error) {
      console.log(error);
    }
  };
  const parsedValue = localStorage.getItem("amount")
    ? JSON.parse(localStorage.getItem("amount"))
    : 0;
  totalPrice();
  function loadRazorpay() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post("/api/v1/payment/create-order", {
          cart,
          amount: parsedValue * 100,
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get("/api/v1/payment/get-razorpay-key");

        const options = {
          key: razorpayKey,
          amount: amount,
          currency: currency,
          name: "manasvi technologies",
          description: "transction to manasvi",
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post("/api/v1/payment/pay-order", {
              paymentMode: true,
              amount: amount,
              products: cart,
              razorpay: {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              },
              buyer: userData._id,
            });
            removeCart();
            // localStorage.removeItem("cart");
            // setCart([]);
            // navigate("/");

            toast.success("Payment Completed Successfully ");
          },
          prefill: {
            name: "Manasvi technologies",
            email: "staff.manasvi@gmail.com",
            contact: "1111111111",
          },
          notes: {
            address: "30, minal residency bhopal D.",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  return (
    <>
      <Link to="/">
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            borderRadius: "10px",
            display: "flex", // Use flex display
            alignItems: "center", // Align items vertically in the center
            width: "150px",
          }}
        >
          <IoArrowBackSharp style={{ marginLeft: "30px", height: "50px" }} />{" "}
          Back {/* Add margin to the right of the icon */}
        </button>
      </Link>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold text-center mb-4 my-14">
          {!userData ? "Hello Guest" : `Hello  ${userData.name}`}
        </h1>
        <p className="text-center">
          {cart?.length
            ? `You Have ${cart.length} items in your cart ${
                token ? "" : "please login to checkout !"
              }`
            : " Your Cart Is Empty"}
        </p>
        {cart.length < 1 && (
          <h1 className="text-center font-bold text-2xl mt-4 rounded-2xl">
            <button
              className="p-1 bg-green-500 text-white
               rounded-full hover:bg-pink-300 focus:bg-red-500
                active:bg-yello-500 disabled:bg-gray-300 
                disabled:cursor-not-allowed"
              onClick={() => navigate("/menu")}
            >
              <i
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                }}
              >
                Add Item
              </i>
            </button>
          </h1>
        )}

        <div className="flex flex-col lg:flex-row justify-between mt-8">
          <div className="lg:w-2/3 p-4">
            {cart.length > 0 &&
              items.map((item, index) => {
                const cartItem = cart[index];

                return (
                  <div
                    className="flex items-center mb-4 border-b border-gray-200"
                    key={item._id}
                  >
                    <div className="w-20 h-20 mr-4">
                      <img
                        src={`/api/v1/item/get-photo/${item._id}`}
                        className="w-full h-full object-cover"
                        alt={item.name}
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-lg font-semibold">
                        <i>{item.name}</i>
                      </p>
                      <p>
                        <i>Price:</i>{" "}
                        <b>
                          ₹
                          {cartItem.schedule === "Both"
                            ? item.price2
                            : item.price1}
                        </b>
                      </p>
                      <p>Description: {item.description}</p>
                      {cartItem && (
                        <p>
                          <i>Schedule:</i> {cartItem.schedule}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* for delete all cart items
           */}

          <div className="text-center lg:w-1/3 p-4">
            <h2 className="text-2xl font-semibold">Cart Details</h2>

            <hr className="my-4" />

            <h4>Total Payable amount: ₹{totalPrice()}</h4>

            {userData.address ? (
              <>
                <div className="mb-3">
                  <h5>Current Address</h5>
                  <h5>{userData.address}</h5>

                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      if (userData.role === 0) {
                        navigate("/cpua%b%c%d%e%f$q$w$e$r$t$y$u$d$h$a$rM$a");
                      } else if (userData.role === 1) {
                        navigate("/apua%b%c%d%e%f$q$w$e$r$t$y$u$d$h$a$rM$a");
                      } else if (userData.role === 2) {
                        navigate("/tpua%b%c%d%e%f$q$w$e$r$t$y$u$d$h$a$rM$a");
                      }
                    }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {userData ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      if (userData.role === 0) {
                        navigate("/cpua%b%c%d%e%f$q$w$e$r$t$y$u$d$h$a$rM$a");
                      } else if (userData.role === 1) {
                        navigate("/apua%b%c%d%e%f$q$w$e$r$t$y$u$d$h$a$rM$a");
                      } else if (userData.role === 2) {
                        navigate("/tpua%b%c%d%e%f$q$w$e$r$t$y$u$d$h$a$rM$a");
                      }
                    }}
                  >
                    Add Address
                  </button>
                ) : (
                  <button
                    className="bg-gray-900  text-white px-4 py-2 m-5 hover:scale-105 w-60 rounded-3xl"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!token || !cart?.length ? (
                ""
              ) : (
                <>
                  <button
                    className="bg-lime-900 text-white w-32 pl-5 pr-5 pt-1 pb-2 hover:scale-105 w-30 rounded-3xl"
                    onClick={loadRazorpay}
                    disabled={loading || !userData.address}
                  >
                    {loading ? "Processing ...." : "Pay Online"}
                  </button>
                </>
              )}
            </div>
            <div className="mt-2">
              <button
                className="bg-red-600 text-white  w-32 pt-1 pb-2 hover:scale-105  w-30 rounded-3xl"
                onClick={() => {
                  removeCart();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerCart;
