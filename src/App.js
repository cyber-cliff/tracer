import React, { useState } from 'react'
import './App.css'
import rules from './test.txt'

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
    
		fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formData })
    })
    // .then( () => { alert("Success!") })
    .then( () => { console.log("Success!") })

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
          <form onSubmit={e => handleSubmit(e)}>
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={handleChange} />
              </label>
            </p>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Name"
              required 
            />{star}
            <br />
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email"
              required
            />{star}
            <br />
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="Phone"
              style={{marginRight:"7px"}}
            />
            <br />
            <button type="submit" className="submit-btn">submit</button>
            <p className="policy">{star}by submitting this form you agree with our <a href={rules} target="_blank" rel="noopener noreferrer">code of conduct</a></p>
          </form>
        </div>
      </main>

      <footer>
        <a href="https://github.com/egor-sadanov" target="_blank" rel="noopener noreferrer">gosha mogёt</a>
      </footer>
    </div>
  )
}

export default App
