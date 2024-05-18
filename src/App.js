// Import all components
import './App.css'
import MOCK_API_URL from './guitar-api'
import {useEffect, useState} from 'react'

// Function to run main application
function App() {

  // Declare endpoint to be fetched, variable and useState hook
  const [guitars, setGuitars] = useState([{}])

  const [newGuitarMake, setNewGuitarMake] = useState('')
  const [newGuitarModel, setNewGuitarModel] = useState('')
  const [newGuitarPrice, setNewGuitarPrice] = useState('')

  const [updatedMake, setUpdatedMake] = useState('')
  const [updatedModel, setUpdatedModel] = useState('')
  const [updatedPrice, setUpdatedPrice] = useState('')
  // Fetch the API URL and then data will shown as JSON
  function getGuitars() {
    fetch(MOCK_API_URL)
      .then(data => data.json())
      .then(data => setGuitars(data))
  }
  // Synchonize with external system
  useEffect((guitars) => {
    getGuitars()
    console.log(guitars)
  }, [])
  // Delete guitars using function with delete method
  function deleteGuitar(id) {
    fetch(`${MOCK_API_URL}/${id}`, {
      method: 'DELETE'
    }).then(() => getGuitars())
  }
  // Post guitars using function with post method
  function postNewGuitar(e) {
    e.preventDefault()

    fetch(MOCK_API_URL, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        make: newGuitarMake,
        model: newGuitarModel,
        price: newGuitarPrice,
      })
    }).then(() => getGuitars())
  }
  // Update guitars using function with PUT method
  function updateGuitar(e, guitarObject) {
    e.preventDefault()
    // Declare variable to spread and write to API objects
    let updatedGuitarObject = {
      ...guitarObject,
      make: updatedMake,
      model: updatedModel,
      price: updatedPrice,
    }
    // Fetch guitar API and create PUT method
    fetch(`${MOCK_API_URL}/${guitarObject.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedGuitarObject),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => getGuitars())

  }
  
  // Render JSX for app
  return (
    <div classMake="App">
      {/* Add new guitar form */}
      <form>
        <h1>My Guitar Store Inventory</h1>
        <img src='https://images.unsplash.com/photo-1519508234439-4f23643125c1?q=80&w=1798&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='guitars'/>
        <h2>Add New Guitars</h2>
        <p></p>
        <label>Make</label>
        <input onChange={(e) => setNewGuitarMake(e.target.value)}></input>
        <label>Model</label>
        <input onChange={(e) => setNewGuitarModel(e.target.value)}></input>
        <label>Price</label>
        <input onChange={(e) => setNewGuitarPrice(e.target.value)}></input><br />
        <button onClick={(e) => postNewGuitar(e)}>Submit</button>
      </form>
      <hr class="solid"></hr>
      {/* Return current list of guitars from API */}
      <h2>Current Inventory</h2>
      {/* Map API for guitar object properties */}
      {guitars.map((guitar, index) => (
        <div key={index}>
          <div>
            Make: {guitar.make} <br></br>
            Model: {guitar.model} <br></br>
            Company Make: {guitar.price} <br></br>
            {/* Delete guitar button */}
            <button onClick={() => deleteGuitar(guitar.id)}>Delete</button>
          </div>
          {/* Update guitars form */}
          <form>
            <h3>Update This Guitar</h3>
            <label>Update Make</label>
            <input onChange={(e) => setUpdatedMake(e.target.value)}></input>

            <label>Update Model</label>
            <input onChange={(e) => setUpdatedModel(e.target.value)}></input>

            <label>Update Price</label>
            <input onChange={(e) => setUpdatedPrice(e.target.value)}></input><br></br>
            <button onClick={(e) => updateGuitar(e, guitar)}>Update</button>
          </form>
          <hr class="solid-2"></hr>
        </div>
      ))}
    </div>
  )
}

// Export main app
export default App;
