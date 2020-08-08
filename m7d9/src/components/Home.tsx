import React, { useState } from "react";
import { Button, FormControl, Form, Row } from "react-bootstrap";
import SongList from "./SongList";

const Home = () => {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);

  const updateMessage = (e: any): void => {
    e.preventDefault();
    setSearch(e.currentTarget.value);
  };
  async function handleSearch(value: string): Promise<any> {
    const Response = await fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?callback=test&id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q=$`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "8275c582bamshd83a3179dd00459p19f0b2jsn94c889368579",
        },
      }
    );
    const data = await Response.json();
    console.log(data);
    setSongs(data.data);
    console.log(songs);
  }
  return (
    <>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => updateMessage(e)}
          className="mr-sm-2"
        />
        <Button variant="outline-success" onClick={() => handleSearch(search)}>
          Search
        </Button>
      </Form>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mt-4 mx-2 text-center">
        {songs.length > 0 &&
          songs
            .slice(0, 6)
            .map((song: any, index) => (
              <SongList
                key={index}
                source={song.album.cover}
                title={song.album.title}
                id={song.album.id}
              />
            ))}
      </Row>
    </>
  );
};

export default Home;
