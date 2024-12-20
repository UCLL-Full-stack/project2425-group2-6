import { useEffect, useState } from "react";
import OrderService from "@/services/order.service";
import EmployeeService from "@/services/employee.service";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const OrderIdOverviewPageAdmin: React.FC = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    const role = sessionStorage.getItem('role') || '';
    setRole(role);
  }, []);
  

  // Local state for employees and selected employees
  const [employees, setEmployees] = useState<any[]>([]); 
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]); // Track selected employees' emails
  const [error, setError] = useState<string | null>(null);

  // Fetch order details based on orderId using SWR
  const fetchOrderDetails = async (orderId: string) => {
    fetchEmployees(); // Fetch employees for the order
    try {
      const fetchedOrder = await OrderService.getOrderById(orderId);
      return fetchedOrder; // Return fetched order details
    } catch (err: any) {
      throw new Error(err.message || 'Something went wrong fetching order details');
    }
  };

  const fetchEmployees = async () => {
    try {
      const employeeList = await EmployeeService.getAllEmployees();
      setEmployees(employeeList); // Store employees
    } catch (err: any) {
      console.error('Error fetching employees:', err.message);
    }
  };

  // useSWR to handle order fetching
  const { data: order, error: orderError, isLoading: orderLoading } = useSWR(
    orderId ? [`orderDetails`, orderId] : null,
    () => fetchOrderDetails(orderId as string)
  );

  // Polling with useInterval to periodically refresh order data
  useInterval(() => {
    if (orderId) {
      mutate([`orderDetails`, orderId]); // Trigger mutate to refresh data
    }
  }, 3000); // Refresh every 3 seconds

  // Handle toggling employees for the order
  const handleAddRemoveEmployee = async () => {
    if (!orderId) return;

    try {
      const responses = await Promise.all(
        selectedEmployees.map(async (email) => {
          return OrderService.toggleEmployee(orderId, email);
        })
      );

      // Refresh the order data after changes
      await mutate([`orderDetails`, orderId]);
      setSelectedEmployees([]); // Clear selection after update
    } catch (err: any) {
      console.error('Error updating employees:', err.message);
    }
  };

  // Handle errors
  if (orderError) {
    setError(orderError.message || 'Error fetching order details');
  }

  if (orderLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!order) {
    return <p className="text-center">Order not found.</p>;
  }

  return (
    <>
      {role !== 'admin' ? (
        <p className="text-center">Access Denied</p>
      ) : (
        <div>
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
        value="pending"
        checked={order?.status?.toLowerCase() === "pending"} // Use optional chaining to avoid errors
        onChange={async (e) => {
          if (e.target.checked) {
            try {
              const updatedOrder = await OrderService.modifyOrderStatus(order.orderId, "pending");
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
        value="approved"
        checked={order?.status?.toLowerCase() === "approved"} // Use optional chaining to avoid errors
        onChange={async (e) => {
          if (e.target.checked) {
            try {
              const updatedOrder = await OrderService.modifyOrderStatus(order.orderId, "approved");
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
        <p><strong>Email:</strong> {order.customer.email}</p>
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
        </div>
      )}
    </>
  );
}

export default OrderIdOverviewPageAdmin;
