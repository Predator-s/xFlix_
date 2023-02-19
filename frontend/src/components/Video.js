import React from 'react';
import './Video.css'
import {upvote, downvote} from './Search'
import {
    Navbar,
    Col,
    Row

} from "react-bootstrap";
import { Button } from "antd";
import { VideoPreview } from './VideoPreview/VideoPreview'
import { Link } from 'react-router-dom'
import {getVideos} from './Search';
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)




export default class Video extends React.Component {

    constructor(props) {
        super(props)
        this.prod = this.props.location.state.prod;
        this.state = {products: [], prod:this.prod}
    }

    

    componentDidMount() {
        const { prod } = this.props.location.state
        console.log(prod.videoLink)
        this.getProducts(prod.genre);
        

    }

    componentDidUpdate(prevProps){
        console.log("faisal");
        // this.getProducts();
        const { prod } = this.props.location.state
        console.log(prod);
        const prod2=prevProps.location.state.prod;
        console.log(prod2)
        if (prod.videoLink !== prod2.videoLink ) {
            this.setState({prod:prod})
            this.getProducts(this.state.prod.genre);
          }
    }

    async getProducts(genre){
     
        let response=await getVideos(genre);
        console.log(response.videos);
        this.setState({products:[...response.videos]})
    }

    getproductElement(product) {
        return (
            <Col className='pl-2 pb-5 video-tile-link' sm={6} md={3} >
                {/* <VideoPreview product={product} /> */}
                <Link 
                className="video-tile"
                to={{
            
                    pathname: '/video',
                    state: {prod:product}
                }}
                >
                <VideoPreview product={product} />
                </Link>
                

            </Col>
        )

    }


    render() {
        return (
            <div>
                <Navbar
                    className="d-flex justify-content-between"
                    bg="dark"
                    variant="dark"
                >
                    <Navbar.Brand href="#home">
                        <span className="logox">X</span>
                        <span className="logoflix"> Flix</span>
                    </Navbar.Brand>
                </Navbar>

                <div className='d-flex flex-column align-items-center mt-4'>
                    <div className='row d-flex flex-column align-items-center video-tile1'>
                        <div className='iframe-parent'>
                            <iframe title={this.state.prod.title} className='iframe' src={`https://www.${this.state.prod.videoLink}`} allow="fullscreen" />
                        </div>


                        <div className='video-info d-flex justify-content-between'>
                            <div>
                                <div className='semi-bold show-max-two-lines'>{this.prod.title}</div>
                                <div className='video-preview-metadata-container'>
                                    <div><span>{`${this.state.prod.contentRating} • `}<ReactTimeAgo date={this.state.prod.releaseDate} locale="en-US" /> </span></div>
                                </div>
                            </div>
                            <div>
                                <Button className="upload" type="primary"  icon={<LikeFilled />} onClick= {() => {
                                    upvote(this.state.prod._id)
                                }}>
                            
                                </Button>
                                <Button className="upload" type="primary" icon={<DislikeFilled />} onClick={() => {
                                    downvote(this.state.prod._id)
                                }} >
                                    
                                </Button>
                            </div>

                        </div>
                    </div>
                    <hr />
                    <div className='search-container d-flex justify-content-center'>
                    <Row className='videotile' >
                        {this.state.products.length !== 0 ? (
                            (this.state.products.map((product) =>
                                this.getproductElement(product)))
                        ) : ''}


                    </Row>
                </div>



                </div>
            </div>
        )
    }


}