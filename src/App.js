import React, { useState, useEffect,useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
const clientID = `?client_id=yJtA8rHjVcmsnnseFdrgu2XoS4DgDs7zwWOn76XTowI`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

// remove current scroll code
// set up page to 1
// setUp two useEffects 
// don"t run scond initial render
// check for query value 
// if page 1 fetch images
// otherwise setPage(1)
// fix scroll functionality
 



function App() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
const [query,setQuery] = useState('')
const [newImages, setNewImages] = useState(false);
const mounted=useRef(false)

  const fetchImages = async () => {
    setLoading(true);
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setNewImages(false);
      setLoading(false);
    } catch (error) {
      setNewImages(false);

      setLoading(false);
    }
  };
/* useEffect--------------------------------------- */
  useEffect(() => {
    fetchImages();
  }, [page]);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
  }, [newImages]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', event);
    return () => window.removeEventListener('scroll', event);
  }, []);

/* handleSubmit--------------------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
    }
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <div className="search-form">
          <input type="text" placeholder="search" className="form-input" value={query} onChange={(e)=>setQuery(e.target.value)} />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />{" "}
          </button>
        </div>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image, index) => {
            console.log({image})
            return <Photo key={image.id} {...image} />;
          })}
        </div>
        {loading && <h2 className="loading">loading....</h2>}
      </section>
    </main>
  );
}

export default App;
