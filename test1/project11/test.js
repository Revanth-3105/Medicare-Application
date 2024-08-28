const getLocation = async () => {
    try {
      const response = await fetch('http://ip-api.com/json/');
      const data = await response.json();
      
      if (data.status === 'success') {
        const { lat, lon } = data;
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      } else {
        console.error('Failed to retrieve location data');
      }
    } catch (error) {
      console.error('Error fetching location:', error.message);
    }
  };
  
  getLocation();
  