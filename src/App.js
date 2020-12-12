import React, { useState } from 'react'
import { useAlert } from "react-alert";
import './App.css'
import rules from './rules.pdf'

function App() {
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
    .then( () => { 
      alert.show("Thank you, the form has been successfully submitted!", {
        onClose: () => {
          window.location.reload()
        }
      })
    })
		.catch( err => {
      alert.show("Something went wrong. Please try again")
      console.log("err: ", err.message)
    })
  }
    
  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value })
  const alert = useAlert()
  const star = <span style={{color: "red"}}>*</span>

  return (
    <div className="app">
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
              placeholder="name"
              required 
            />
            <br />
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="email"
              required
            />
            <br />
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="phone"
            />
            <br />
            <button id="submit" type="submit" className="submit-btn">submit</button>
          </form>
        </div>
        <div className="credits">
          <a href="https://aanufriev.com" target="_blank" rel="noopener noreferrer" className="gosha-link">photo</a>
          <span style={{color: "white"}}>|</span>
          <a href="https://github.com/egor-sadanov" target="_blank" rel="noopener noreferrer" className="gosha-link">design</a>
        </div>
      </main>

      <footer>
        <p className="policy">{star}by submitting this form you agree with our&nbsp;
          <a href={rules} target="_blank" rel="noopener noreferrer" className="code-link">code of conduct</a>
        </p>
      </footer>
    </div>
  )
}

export default App
