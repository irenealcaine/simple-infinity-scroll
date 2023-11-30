import React, { useState, useEffect } from "react";
import GalleryItem from "../GalleryItem/GalleryItem";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMoreItems = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=5&page=${page}`
      );
      const data = await response.json();

      const newItems = data.results.map((result) => ({
        id: result.login.uuid,
        name: `${result.name.first} ${result.name.last}`,
        picture: result.picture.large
      }));

      setItems([...items, ...newItems]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreItems();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const {
        scrollTop,
        clientHeight,
        scrollHeight
      } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
        fetchMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div>
      {items.map((item) => (
        <GalleryItem key={item.id} data={item} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Gallery;
