import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import DomHeader from './DomHeader';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const location = useLocation();
  const [savedResumes, setsaved] = useState({});
  const navigate = useNavigate();
  const resumes = ["Red Resume", "Plain Resume"];
  const Images = ["Plainresume.png", "Redresume.png"];
  
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  const token = useSelector(state => state.resumeEditor.Token);

  const handleCard = (id) => {
    navigate(`/ResumeEditer?id=${id + 1}&edit=true&username=${username}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/resumeRoutes/GetResumeUser',
          {
            params: { username: username },
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        setsaved(response.data);
      } catch (err) {
        // Handle error here
      }
    };
    fetchData(); // Call fetchData inside useEffect
  }, [username, token]); // Added dependencies to useEffect for better optimization

  return (
    <div className='d-flex gap-5 flex-column' style={{ width: "100%", height: "auto" }}>
      <DomHeader />
      <h3>Welcome back {username}</h3>
      <div className='d-flex gap-5 flex-column container' style={{ width: "100%", height: "auto" }}>
        <div className='d-flex flex-column container justify-content-center' style={{ width: "100%", height: "auto" }}>
          <div className='d-flex p-5 pb-0 justify-content-center gap-5' style={{ width: "100%", height: "500px", background: "#D9EAFD" }}>
            <img className="me-5" width="400px" height="400px" src="./images/ResumeDash.jpg" alt="Resume Dash" />
            <div className='d-flex flex-column align-items-center gap-1'>
              <p className='ms-5 fw-bold' style={{ fontSize: "60px" }}>Create Your Resume today !!</p>
              <p>Contextual tips and best practices to help users craft each section of their resume.</p>
              <button className='btn btn-danger col-4'>Build Now</button>
            </div>
          </div>
        </div>
        <h3>Continue Editing your resumes</h3>
        <div className="d-flex gap-3 flex-wrap p-5 justify-items-center" style={{  width: "100%" }}>
          {savedResumes.existingResume && savedResumes.existingResume.map((resmei, index) => (
            <div
              className="card"
              style={{ width: "18rem", height: "350px", margin: "10px" }}
              key={index}
              onClick={() => handleCard(resmei.resumetemplate - 1)}
            >
              <img
                src={"./images/" + Images[resmei.resumetemplate - 1]}
                className="card-img-top"
                alt={`${resmei.username}'s resume`}
                style={{ width: "250px", height: "150px", margin: "10px auto" }}
              />
              <div className="card-body" style={{ textAlign: "center" }}>
                <h5 className="card-title">{resumes[resmei.resumetemplate - 1]}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
