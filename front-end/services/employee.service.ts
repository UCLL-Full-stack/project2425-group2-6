const getAccessToken = (): { message: string, token: string, email: string, fullname: string, role: string } | null => {
    try {
      const loggedInUser = sessionStorage.getItem('loggedInUser');
  
      if (!loggedInUser) {
        return null; // No user data found in session storage
      }
  
      const parsedUser = JSON.parse(loggedInUser);
  
      if (parsedUser && typeof parsedUser.token === 'string') {
        return {
          message: parsedUser.message,
          token: parsedUser.token,
          email: parsedUser.email,
          fullname: parsedUser.fullname,
          role: parsedUser.role
        };
      }
  
      return null; // User data is not available or invalid
    } catch (error) {
      console.error('Error retrieving user data from session storage:', error);
      return null; // Handle potential parsing errors gracefully
    }
  };

const getAllEmployees = async () => {
    const token = getAccessToken();
    try {
        const response = fetch(process.env.NEXT_PUBLIC_API_URL + `/employees`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token?.token}`,
                }
            }
        )
        return (await response).json();
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw new Error("Failed to fetch employees. Please try again later.");
    }
};

const EmployeeService = {
    getAllEmployees,
};

export default EmployeeService;
