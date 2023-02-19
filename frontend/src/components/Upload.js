import React from "react";
import { Modal, Button, Form, Input, Select, DatePicker } from "antd";
import{ uploadVideo } from './Search'

const UPload = (props) => {
  const [visible, setVisible] = React.useState(true);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  let videoDetail={VideoLink:"", ThumbnailLink:"", Title:"", Genre:"", ageGroup:"", releaseDate:""};

  

  const handleClick = () => {
    props.toggle();
   };

  const handleOk =async () => {
    
    setConfirmLoading(true);
    
    await uploadVideo(videoDetail);
    await props.updater();
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    
    setVisible(false);
    handleClick();

  };

  const genreChange=(value)=>{
    videoDetail.Genre=value;
  }

  const ageChange=(value)=>{
    videoDetail.ageGroup=value;
    console.log(videoDetail);
  }

  return (
    <>
     
      <Modal
        title="Upload Video"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        
        footer={[
          <Button key="cancel" visible={visible} onClick={handleCancel} id="upload-btn-cancel">
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk} id="upload-btn-submit">
            Submit
          </Button>
          
        ]}
        
      >
      
        <Form
        layout='vertical'
        onFinish={(value)=>{
          console.log(value);
        }}
        >
          <Form.Item
            label="Video Link"
            name="Video Link"
            rules={[{ required: true, message: "Please enter video link!" }]}
          >
            <Input onChange={(event)=>{
              videoDetail.VideoLink=event.target.value;
            }} 
            onPressEnter={(event)=>{
              videoDetail.VideoLink=event.target.value;
            }}/>
          </Form.Item>
          
          
          <Form.Item
            label="Thumbnail Image Link"
            name="Thumbnail Image Link"
            rules={[{ required: true, message: "Please enter Thumbnail Link!" }]}
          >
            <Input onChange={(event)=>{
              videoDetail.ThumbnailLink=event.target.value;
            }}
            onPressEnter={(event)=>{
              videoDetail.ThumbnailLink=event.target.value;
            }} />
          </Form.Item>
          <Form.Item
            label="Title"
            name="Title"
            rules={[{ required: true, message: "Please enter title!" }]}
          >
            <Input onChange={(event)=>{
              videoDetail.Title=event.target.value;
            }} 
            onPressEnter={(event)=>{
              videoDetail.Title=event.target.value;
            }} />
          </Form.Item>
          <Form.Item 
          label="Genre"
          required={true}
          >
          <Select onChange={genreChange}>
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="Education">Education</Select.Option>
            <Select.Option value="Sports">Sports</Select.Option>
            <Select.Option value="Comedy">Comedy</Select.Option>
            <Select.Option value="Lifestyle">Lifestyle</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item 
          label="Select age group for the clip"
          required={true}
          >
          <Select onChange={ageChange}>
            <Select.Option value="Allages">All ages</Select.Option>
            <Select.Option value="7+">7+</Select.Option>
            <Select.Option value="12+">12+</Select.Option>
            <Select.Option value="16+">16+</Select.Option>
            <Select.Option value="18+">18+</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Upload and Publish Date"
        required={true}
        >
          <DatePicker 
          onChange={(date, datestring)=>{
            videoDetail.releaseDate=datestring;
          }} />
        </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UPload;
