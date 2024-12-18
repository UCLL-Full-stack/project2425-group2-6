import { useEffect, useState } from "react";
import OrderService from "@/services/order.service";
import { useRouter } from "next/router";
import EmployeeService from "@/services/employee.service";

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
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const employeeList = await EmployeeService.getAllEmployees(); // Fetch all employees
      setEmployees(employeeList);
    } catch (err: any) {
      console.error("Error fetching employees:", err.message);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    fetchEmployees();
  }, [orderId]); // Re-run the effect when orderId changes
  

  const handleAddRemoveEmployee = async () => {
    if (!orderId) return;
  
    console.log("Selected Employees for Add/Remove:", selectedEmployees);
  
    for (let email of selectedEmployees) {
      try {
        const isEmployeeAssigned = order.employees.some((e: any) => e.email === email); // Check if the employee is already assigned
        if (isEmployeeAssigned) {
          // Employee is part of the order, so remove them
          const response = await OrderService.removeEmployeeFromOrder(orderId, email);
          console.log(`Removed employee with email: ${email} from order ${orderId}`, response);
        } else {
          // Employee is not part of the order, so add them
          const response = await OrderService.addEmployeeToOrder(orderId, email);
          console.log(`Added employee with email: ${email} to order ${orderId}`, response);
        }
      } catch (err: any) {
        console.error("Error updating employee:", err.message);
      }
    }
  
    // Refresh the order data after changes
    await fetchOrderDetails();
  };
  

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
        <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {order.status}</p>
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
              <option key={employee.email} value={employee.email} disabled={order.employees.find((e: any) => e.email === employee.email)} className="p-2">
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
    </div>
  );
};

export default OrderIdOverviewPageAdmin;
