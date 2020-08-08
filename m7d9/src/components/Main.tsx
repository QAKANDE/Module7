import React, { useState } from "react";
import {
  Card,
  CardDeck,
  Form,
  FormControl,
  Button,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import "./Main.css";
const Main = () => {
  const [cloud, setCloud]: any = useState({});
  const [coord, setCoord]: any = useState({});
  const [main, setMain]: any = useState({});
  const [sys, setSys]: any = useState({});
  const [wind, setWind]: any = useState({});
  const [name, setName]: any = useState("");
  const [search, setSearch] = useState("");
  const [tempInCelcius, setTempInCelcuis] = useState(0);
  const [weatherData, setWeatherData] = useState<Array<any>>([]);
  const updateMessage = (e: any): void => {
    e.preventDefault();
    setSearch(e.currentTarget.value);
  };

  const handleSearch = async (value: string, e: any): Promise<any> => {
    e.preventDefault();
    const Response = await fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?q=${value}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "8275c582bamshd83a3179dd00459p19f0b2jsn94c889368579",
        },
      }
    );
    let data = await Response.json();
    setWeatherData(data.weather);
    setCloud(data.clouds);
    setCoord(data.coord);
    setMain(data.main);
    setSys(data.sys);
    setWind(data.wind);
    setName(data.name);
    console.log("weather", weatherData);
    console.log("cloud", cloud);
    console.log("coord", coord);
    console.log("sys", sys);
    console.log("wind", wind);
    console.log("name", name);
    console.log("main", main);
  };

  return (
    <>
      <div id="main-wrapper">
        <div className="d-flex justify-content-center">
          <Form inline className="mt-4">
            <FormControl
              type="text"
              placeholder="Search By City"
              value={search}
              onChange={(e) => updateMessage(e)}
              className="mr-lg-2"
            />
            <Button
              variant="outline-success"
              onClick={(e) => handleSearch(search, e)}
              id="search-bttn"
            >
              Search
            </Button>
          </Form>
        </div>
        {weatherData.length > 0 ? (
          <div id="centered" className="mt-5">
            <CardDeck>
              <Card className="weather-card">
                <Card.Body>
                  <Card.Title>
                    <Row>
                      <Col>
                        <Badge pill variant="success" id="city-badge">
                          Country
                        </Badge>
                        <p>{sys.country}</p>
                      </Col>
                      <Col>
                        <Badge pill variant="success" id="city-badge">
                          City
                        </Badge>
                        <p> {name}</p>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Text>
                    <Row>
                      <Col>
                        <Badge pill variant="success" id="city-badge">
                          Wind Degree
                        </Badge>
                        <p>{wind.deg}</p>
                      </Col>
                      <Col>
                        <Badge pill variant="success" id="city-badge">
                          Wind Speed
                        </Badge>
                        <p>{wind.speed}</p>
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="weather-card">
                <Card.Body>
                  <Card.Title>
                    {weatherData.map((x) => (
                      <Badge pill variant="success" id="city-badge">
                        {x.description}
                      </Badge>
                    ))}
                  </Card.Title>
                  <Card.Text>
                    <Row>
                      <Col>
                        <p>{main.temp}</p>
                      </Col>
                      <Col>
                        <Badge pill variant="success" id="city-badge">
                          Max Temp
                        </Badge>
                        <p>{main.temp_max}</p>
                        <Badge pill variant="success" id="city-badge">
                          Min Temp
                        </Badge>
                        <p>{main.temp_min}</p>
                        <Badge pill variant="success" id="city-badge">
                          Temp On Body
                        </Badge>
                        <p>{main.feels_like}</p>
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="weather-card">
                <Card.Body>
                  <Card.Title>How hot would you feel</Card.Title>
                  <Card.Text>
                    <Badge pill variant="success" id="city-badge">
                      Temp On Body
                    </Badge>
                    <p>{main.feels_like}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </div>
        ) : (
          <div
            className="d-flex justify-content-center mt-4"
            id="search-by-city"
          >
            SEARCH BY CITY
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
