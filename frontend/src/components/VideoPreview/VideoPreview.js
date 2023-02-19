import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Image } from "semantic-ui-react";
import "./VideoPreview.css";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export class VideoPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state={product:this.props.product};
  }


  componentDidUpdate(prevProps){
      let prod1=this.props.product;
      let prod2=prevProps.product;
      if(prod1 !== prod2){
        this.setState({product:prod1})
      }
}

  render() {
    return (
        <div className="row d-flex flex-column video-tiley">
          <div className="col pb-0 image-container">
            <Image className="p-0" src={this.state.product.previewImage} />
          </div>

          <div className="col  video-info">
            <div className="semi-bold show-max-two-lines">
              {this.state.product.title}
            </div>
            <div className="video-preview-metadata-container">
              <div className="channel-title"></div>
              <div>
                <span>
                  <ReactTimeAgo
                    date={this.state.product.releaseDate}
                    locale="en-US"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
