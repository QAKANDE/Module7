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
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + value,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":
            "b41254000bmshb62e314b3254f24p1dac92jsn6f1fc3174939",
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
