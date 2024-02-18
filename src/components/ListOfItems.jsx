import { useState, useEffect } from 'react';
import axios from 'axios';
import imgNotAvailable from '../assets/imgNotAvailable.svg';

function ListOfItems() {
  const [items, setItems] = useState([]);
  const [errorItems, setErrorItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
  const [isMob, setIsMob] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 700) {
        setIsMob(true);
      } else {
        setIsMob(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
        response.data.forEach((item) => {
            const img = new Image();
            img.src = item.avatar;
            img.onload = () => {
              setItems((prevItems) => [...prevItems, item]);
            };
            img.onerror = () => {
              setErrorItems((prevErrorItems) => [...prevErrorItems, item]);
            };
        });
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    getItems();
  }, []); 

  const outerContainer = {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'start',
    flexDirection: isMob ? 'column' : 'row',
    width: '100%',
    color: 'white',
  }


  return (
    <div style={outerContainer}>
      {selectedItem && (
        <div key={54357437} className="updated-card" style={{marginTop: isMob ? "20px" : "calc(50vh - 150px)"}}>
        <img src={selectedItem.avatar} alt={selectedItem.username} />
        <h3 className='nameSelectedCard' style={{fontWeight:"100"}}><span style={{fontWeight:"600"}}>Name: </span>{selectedItem.profile.firstName} {selectedItem.profile.lastName}</h3>
        <h3 style={{fontWeight:"100"}}><span style={{fontWeight:"600"}}>Bio: </span>{selectedItem.Bio}</h3>
        <h3 style={{fontWeight:"100"}}><span style={{fontWeight:"600"}}>Job Title: </span>{selectedItem.jobTitle}</h3>
        <h3 style={{fontWeight:"100"}}><span style={{fontWeight:"600"}}>User Name: </span>{selectedItem.profile.username}</h3>
        <h3 style={{fontWeight:"100"}}><span style={{fontWeight:"600"}}>Email: </span>{selectedItem.profile.email}</h3>
      </div>
      
      )}

      <div className="card-container" 
      style={{
        width: isMob ? "100%" : "70%" , 
        height: isMob ? "calc(100vh -  320px)" : "100vh"}}>
        {items.map((item, idx) => (
          <div key={idx} 
          style={{
            backgroundColor: selectedItem === item ? "black" : "rgba(255, 255, 255, 0.1)",
          }} 
           className="card" onClick={() => setSelectedItem(item)}>
            <img
              src={item.avatar}
              onClick={() => setSelectedItem(item)}
              alt={item.username}
            />
            <h3 className="card-title" onClick={() => setSelectedItem(item)}>
              User:{item.profile.username}
            </h3>
          </div>
        ))}
        {errorItems.map((item) => (
          <div
            key={item.id}
            className="card"
            onClick={() => setSelectedItem(item)}
            style={{
              backgroundColor: selectedItem === item ? "black" : "rgba(255, 255, 255, 0.1)",
            }} 
          >
            <img
              src={imgNotAvailable}
              alt={item.username}
              onClick={() => setSelectedItem(item)}
            />
            <h3 className="card-title" onClick={() => setSelectedItem(item)}>
              {item.profile.username}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfItems;
