import React, { useState } from 'react'
import './App.css'

function App() {
  // const [submitted, setSubmit] = useState(false)
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: ""
	})

  function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    console.log(formData)
		fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contant", ...formData })
    })
		.then( () => { alert("Success!") })
		.catch( err => console.log("err: ", err.message))
  }
    
  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value })
  const star = <span style={{color: "red"}}>*</span>

  return (
    <div className="app">
      <header>
        <span>leave you contacts and go have fun</span>
      </header>

      <main className="wrapper">
        <div className="form-shell">
          <form name="contact" method="POST" netlify data-netlify-honeypot="bot-field" onSubmit={e => handleSubmit(e)}>
            <input type="hidden" name="form-name" value="contact" />
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Name"
              required 
            />
            <br />
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email"
              required
            />
            <br />
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="Phone"
            />
            <br />
            <button type="submit">submit</button>
          </form>
        </div>
      </main>

      <footer>
        <a href="https://github.com/egor-sadanov" target="_blank" rel="noopener noreferrer">gosha mogёt</a>
      </footer>
    </div>
  )
}

export default App;
