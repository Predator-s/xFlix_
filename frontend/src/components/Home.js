import {
  Navbar,
  ToggleButtonGroup,
  Row,
  Col,
  ToggleButton,
} from "react-bootstrap";

import { Form as nForm } from "react-bootstrap";
import { Link } from "react-router-dom";
import { VideoPreview } from "./VideoPreview/VideoPreview";
import React from "react";
import { Modal, Button, Input, } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Home.css";

import { getAllVideos, uploadVideo } from "./Search";
import UPload from "./Upload";


const { Search } = Input;


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.products = [];
    this.title = "";
    this.sortBy = "releaseDate";
    this.genres = ["All"];
    this.contentRating = "Anyone";

    this.state = {
      filteredProducts: [],
      seen:false,
    };
  }

  onSearch = async (value) => {
    console.log(value)
    this.title = value;
    await this.getProducts();
  };

  onChangeSort(event) {
    this.setState({ sortBy: event.target.value });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
    this.setState({ loading: true });
    await uploadVideo(this.videoDetail);
    this.setState({ loading: false, visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
    Modal.confirm();
  };

  genreChange = (value) => {
    this.videoDetail.Genre = value;
  };

  ageChange = (value) => {
    this.videoDetail.ageGroup = value;
    console.log(this.videoDetail);
  };

  getProducts = async () => {
    let filterGenre = {
      title: this.title,
      sortBy: this.sortBy,
      genres: this.genres,
      contentRating: this.contentRating,
    };
    let response = await getAllVideos(filterGenre);
    this.products = response.videos;
    console.log(this.products);
    this.setState({ filteredProducts: [...this.products] });
    console.log(this.state.filteredProducts);
  };

  componentDidMount() {
    this.getProducts();
  }

  checkchange = async (value) => {
    this.genres = [...value];
    await this.getProducts();
  };

  radiochange = async (value) => {
    this.contentRating = value;
    await this.getProducts();
  };

  sortchange = async (event) => {
    console.log(event.target.value);
    this.sortBy = event.target.value;
    await this.getProducts();
  };

  getproductElement(product) {
    return (
      <Col className="pl-2 pb-5 video-tile-link" sm={6} md={3}>
        <Link
          className="video-tile"
          to={{
            pathname: "/video",
            state: { prod: product },
          }}
        >
          <VideoPreview product={product} />
        </Link>
      </Col>
    );
  }

  togglePop = () => {
    this.setState({
     seen: !this.state.seen
    });
   };

  render() {
    return (
      <div className="d-flex flex-column">
        <Navbar
          className="d-flex justify-content-between"
          bg="dark"
          variant="dark"
        >
          <Navbar.Brand href="#home">
            <span className="logox">X</span>
            <span className="logoflix"> Flix</span>
          </Navbar.Brand>

          <Search
            className="inputflix"
            placeholder="Search"
            onSearch={this.onSearch}
            enterButton
          />
          <Button
            className="upload"
            id="upload-btn"
            type="primary"
            icon={<UploadOutlined />}
            onClick={this.togglePop}
          >
            Upload
          </Button>
          {this.state.seen?<UPload toggle={this.togglePop} updater={this.getProducts} /> : null}
        </Navbar>

        <div className="rowcontainer p-3">
          <div className="container my-4">
            <div className="row con-genre pb-2">
              <div className="col-8">
                <ToggleButtonGroup
                  display="block"
                  type="checkbox"
                  defaultValue={["All"]}
                  variant="light"
                  size="sm"
                  className="d-flex justify-content-between my-2"
                  onChange={this.checkchange}
                >
                  <ToggleButton
                    checked="true"
                    variant="light"
                    className="genre-btn w-3"
                    value="All"
                  >
                    All Genre
                  </ToggleButton>
                  <ToggleButton
                    variant="light"
                    size="sm"
                    className="genre-btn"
                    value="Education"
                  >
                    Education
                  </ToggleButton>
                  <ToggleButton
                    variant="light"
                    className="genre-btn"
                    value="Sports"
                  >
                    Sports
                  </ToggleButton>
                  <ToggleButton
                    variant="light"
                    className="genre-btn"
                    value="Comedy"
                  >
                    Comedy
                  </ToggleButton>
                  <ToggleButton
                    variant="light"
                    className="genre-btn"
                    value="Lifestyle"
                  >
                    Lifestyle
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <div className="col-4">
                <nForm.Control
                  className="sort-select"
                  as="select"
                  custom
                  onChange={this.sortchange}
                  style={{ width: "140px" }}
                  defaultValue="releaseDate"
                >
                  <option id="release-date-option" value="releaseDate">
                    Release Date
                  </option>
                  <option id="view-count-option" value="viewCount">
                    View Count
                  </option>
                </nForm.Control>
              </div>
            </div>

            <div className="row pt-2">
              <div className="col-8">
                <ToggleButtonGroup
                  display="block"
                  type="radio"
                  defaultValue={"Anyone"}
                  name="options"
                  variant="light"
                  size="sm"
                  className="d-flex justify-content-between my-2"
                  onChange={this.radiochange}
                >
                  <ToggleButton
                    checked="true"
                    style={{ maxWidth: "100px", borderRadius: "5px" }}
                    variant="light"
                    className="content-rating-btn"
                    value="Anyone"
                  >
                    Any age group
                  </ToggleButton>
                  <ToggleButton
                    variant="light"
                    shape="round"
                    size="sm"
                    className="content-rating-btn"
                    value="7+"
                  >
                    7+
                  </ToggleButton>
                  <ToggleButton
                    variant="light"
                    className="content-rating-btn"
                    value="12+"
                  >
                    12+
                  </ToggleButton>
                  <ToggleButton
                    variant="light"
                    className="content-rating-btn"
                    value="16+"
                  >
                    16+
                  </ToggleButton>
                  <ToggleButton
                    variant="light"
                    className="content-rating-btn"
                    value="18+"
                  >
                    18+
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
          </div>
        </div>
        <div className="search-container d-flex justify-content-center">
          <Row className="videotile" id="">
            {this.products.length !== 0
              ? this.state.filteredProducts.map((product) =>{
                console.log(product);
                return this.getproductElement(product)
              }
                  
                )
              : ""}
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
