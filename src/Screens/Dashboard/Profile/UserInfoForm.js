import React, { useState, useEffect } from "react";

const UserInfoForm = () => {
  const [userInfo, setUserInfo] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    fullName: '',
    username: '',
    phone: '',
    email: '',
    dob: '',
    country: '',
    state: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // Mock data - replace with your actual API call
        const mockCountries = [
          { name: 'United States', states: ['California', 'Texas', 'New York'] },
          { name: 'India', states: ['Maharashtra', 'Delhi', 'Karnataka'] },
          { name: 'Canada', states: ['Ontario', 'Quebec', 'British Columbia'] }
        ];
        setCountries(mockCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // Mock data - replace with your actual API call
        const mockUserData = {
          firstname: 'John',
          middlename: 'D',
          lastname: 'Doe',
          username: 'johndoe',
          phone: '1234567890',
          email: 'john@example.com',
          dob: '1990-01-01',
          country: 'United States',
          state: 'California'
        };
        
        setUserInfo(prev => ({
          ...prev,
          ...mockUserData,
          email: mockUserData.email
        }));
        
        // Set states based on selected country
        const selectedCountry = countries.find(c => c.name === mockUserData.country);
        if (selectedCountry) {
          setStates(selectedCountry.states);
        }
      } catch (error) {
        setError('Failed to fetch user data.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [countries]); // Added countries to dependency array

  // ... rest of the component code remains the same ...
};

export default UserInfoForm;