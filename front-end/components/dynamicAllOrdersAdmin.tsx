import { useEffect, useState } from "react";
import OrderService from "@/services/order.service";
import EmployeeService from "@/services/employee.service";
import { useRouter } from "next/router";

const OrderIdOverviewPageAdmin: React.FC = () => {
  const router = useRouter();
  const { orderId } = router.query; // Get orderId from the query string

  const [order, setOrder] = useState<any>(null); // Store the fetched order data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling
  const [employees, setEmployees] = useState<any[]>([]); // Store employee list
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]); // Track selected employees' emails

  // Fetch order data based on the orderId from the URL
  const fetchOrderDetails = async () => {
    if (!orderId) return; // If orderId is not yet available, return

    try {
      setLoading(true);
      const fetchedOrder = await OrderService.getOrderById(orderId); // Fetch order by ID
      setOrder(fetchedOrder);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const employeeList = await EmployeeService.getAllEmployees(); // Fetch all employees
      setEmployees(employeeList);
    } catch (err: any) {
      console.error("Error fetching employees:", err.message);
    }
  };

  // Handle toggling employees in the order
  const handleAddRemoveEmployee = async () => {
    if (!orderId) return;

    try {
      const responses = await Promise.all(
        selectedEmployees.map(async (email) => {
          return OrderService.toggleEmployee(orderId, email);
        })
      );

      // console.log("Employee toggle responses:", responses);

      // Refresh the order data after changes
      await fetchOrderDetails();
      setSelectedEmployees([]); // Clear the selection after updating
    } catch (err: any) {
      console.error("Error updating employees:", err.message);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    fetchEmployees();
  }, [orderId]); // Re-run the effect when orderId changes

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!order) {
    return <p className="text-center">Order not found.</p>;
  }

  return (
    <div className="p-10">
      <h2 className="font-bold text-center text-xl">Order Details - ID: {order.orderId}</h2>

{/* Order Info */}
<div className="mt-5 p-5 border rounded-lg shadow-sm">
  <h3 className="text-lg font-semibold">Order Information</h3>
  <p><strong>Status:</strong> {order?.status}</p> {/* Add optional chaining to avoid errors if order is not loaded */}
  <div className="flex items-center space-x-4">
    {/* Pending Radio Option */}
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name="orderStatus"
        value="Pending"
        checked={order?.status?.toLowerCase() === "pending"} // Use optional chaining to avoid errors
        onChange={async (e) => {
          if (e.target.checked) {
            try {
              const updatedOrder = await OrderService.modifyOrderStatus(order.orderId, "Pending");
              setOrder((prevOrder: any) => ({
                ...prevOrder,
                status: updatedOrder.status
              })); // Update local order state
            } catch (error) {
              console.error("Failed to update status to Pending:", error);
            }
          }
        }}
        className="form-radio"
      />
      <span>Pending</span>
    </label>

    {/* Approved Radio Option */}
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name="orderStatus"
        value="Approved"
        checked={order?.status?.toLowerCase() === "approved"} // Use optional chaining to avoid errors
        onChange={async (e) => {
          if (e.target.checked) {
            try {
              const updatedOrder = await OrderService.modifyOrderStatus(order.orderId, "Approved");
              setOrder((prevOrder: any) => ({
                ...prevOrder,
                status: updatedOrder.status
              })); // Update local order state
            } catch (error) {
              console.error("Failed to update status to Approved:", error);
            }
          }
        }}
        className="form-radio"
      />
      <span>Approved</span>
    </label>
  </div>
  <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>

  {/* Order Status */}
  {/* <p><strong>Status:</strong></p> */}


<p><strong>Start Date:</strong> {new Date(order.startDate).toLocaleDateString()}</p>
<p><strong>Price:</strong> ${order.price}</p>
</div>



      {/* House Info */}
      <div className="mt-5 p-5 border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">House Information</h3>
        <p><strong>Address:</strong> {order.house.houseNumber} {order.house.street}, {order.house.city}, {order.house.zip}, {order.house.country}</p>
        <p><strong>Type:</strong> {order.house.type}</p>
      </div>

      {/* Rooms Info */}
      <div className="mt-5 p-5 border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">Rooms</h3>
        {order.rooms.length > 0 ? (
          order.rooms.map((room: any, index: number) => (
            <div key={index}>
              <p><strong>{room.name}:</strong> {room.workDescription}</p>
            </div>
          ))
        ) : (
          <p>No rooms listed</p>
        )}
      </div>

      {/* Customer Info */}
      <div className="mt-5 p-5 border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">Customer</h3>
        <p><strong>Name:</strong> {order.customer.firstName} {order.customer.lastName}</p>
      </div>

      {/* Assigned Employees Table */}
      <div className="mt-5 p-5 border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">Assigned Workers</h3>
        {order.employees.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Employee Name</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {order.employees.map((employee: any, index: number) => (
                <tr key={index}>
                  <td className="px-4 py-2">{employee.firstName} {employee.lastName}</td>
                  <td className="px-4 py-2">{employee.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No workers assigned</p>
        )}
      </div>

      {/* Add/Remove Employees */}
      <div className="mt-5 p-5 border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-center">Add/Remove Employees</h3>
        <div className="mt-3">
          <select
            multiple
            className="w-full p-2 border rounded-md"
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
              setSelectedEmployees(selectedOptions);
            }}
          >
            {employees.map((employee: any) => (
              <option
                key={employee.email}
                value={employee.email}
                // disabled={order.employees.find((e: any) => e.email === employee.email)}
                className="p-2"
              >
                {employee.firstName} {employee.lastName} ({employee.email})
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            onClick={handleAddRemoveEmployee}
          >
            Add/Remove Selected Employees
          </button>
        </div>
      </div>
      
      {/* Delete order */}
      <div className="mt-5 p-5 border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-center">Delete Order</h3>
        <div className="flex justify-center">
          <button
            className="mt-3 bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
            onClick={async () => {
              if (window.confirm("Are you sure you want to delete this order?")) {
                try {
                  await OrderService.deleteOrder(orderId);
                  router.push("/orders");
                } catch (err: any) {
                  console.error("Error deleting order:", err.message);
                }
              }
            }}
          >
            Delete Order
          </button>
        </div>
    </div>
      
      </div>
  );
}

export default OrderIdOverviewPageAdmin;
